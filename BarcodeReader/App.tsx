import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useCameraPermissions } from "expo-camera";

import Scanner from "./components/Scanner";
import { useScanner } from "./hooks/useScanner";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const { state: scannerState, onScanned, reset } = useScanner();

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>Camera permission required.</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

    return (
    <View style={styles.container}>
      <View style={styles.cameraArea}>
        <Scanner onBarcodeScanned={scannerState.scanned ? (() => {}) : onScanned}/>
      </View>


      <View style={styles.bottomPanel}>
        {!scannerState.scanned && (
          <Text style={styles.infoText}>Scan a barcode</Text>
        )}


        {scannerState.scanned && scannerState.last && (
          <>
            <Text style={styles.infoText}>Barcode: {scannerState.last.data}</Text>
            <Button title="SCAN AGAIN" onPress={reset}/>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000" 
  },

  cameraArea: { 
    flex: 1 
  },

  bottomPanel: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 16,
    textAlign: "center",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  permissionText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
});