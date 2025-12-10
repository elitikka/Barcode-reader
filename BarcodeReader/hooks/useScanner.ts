import { useCallback, useReducer } from 'react';
import type { ScannedBarcode, ScannerState, ScannerAction } from '../types/types';

const initialState: ScannerState = { // Alustus
    scanned: false,
    last: null,
}

function scannerReducer(
    state: ScannerState, action: ScannerAction): ScannerState {
  switch (action.type) {
    case "SCAN": {
      // Jos jo skannattu, ignooraa muut loput toimet
      if (state.scanned) return state;
      // Tallenna skannaus, aseta scanned=true (kunnes myöhemmin tulee reset)
      return { scanned: true, last: action.payload };
    }

    case "RESET": {
      return { scanned: false, last: null };
    }

    default:
      throw new Error("Unknown action");
  }
}

export function useScanner() {
  const [state, dispatch] = useReducer(scannerReducer, initialState);
  
  const onScanned = useCallback((result: any) => {
    const payload: ScannedBarcode = {
      data: result.data,
      type: result.type,
      bounds: result.bounds ?? null,
      cornerPoints: result.cornerPoints ?? null,
    };

    // reducer ignooraa jos on jo skannattu
    dispatch({ type: "SCAN", payload });
  }, []);

  // kameran resetti
  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return { state, onScanned, reset };
}