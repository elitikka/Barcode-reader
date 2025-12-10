import React from "react";
import { StyleSheet, View } from "react-native";
import { CameraView } from "expo-camera";

interface Props {
  onBarcodeScanned: (result: any) => void;
}

export default function Scanner({ onBarcodeScanned}: Props) {
  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        // callback kun kamera havaitsee viivakoodin
        onBarcodeScanned={onBarcodeScanned}
        // Rajoita skannaus EAN viivakoodeihin
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8"],
        }}
        // käytössä on takakamera
        facing="back"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // musta tausta ennen kuin kamera on alustettu ja valmiina näyttämään kuvaa
  },
});