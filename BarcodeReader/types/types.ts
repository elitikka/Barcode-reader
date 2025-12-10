export interface BarcodePoint 
{
  x: number;
  y: number;
}

export interface BarcodeSize 
{
  width: number;
  height: number;
}

export interface BarcodeBounds 
{
  origin: BarcodePoint;
  size: BarcodeSize;
}

export interface ScannedBarcode 
{
  data: string;           // EAN numerot
  type?: string;          // viivakoodin tyyppi
  bounds?: BarcodeBounds | null;   
  cornerPoints?: BarcodePoint[] | null;
}

export interface ScannerState 
{
  scanned: boolean; // Onko viivakoodi skannattu vai ei
  last: ScannedBarcode | null; // Viimeksi skannattu viivakoodi
}

export type ScannerAction = // ScannerAction voi olla joko SCAN tai RESET
  | { type: "SCAN"; payload: ScannedBarcode }
  | { type: "RESET" };