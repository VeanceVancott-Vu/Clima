import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InfoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Clima App</Text>
        <Text style={styles.text}>
          React Native app displaying weather from Open Meteo.
        </Text>
        <Text style={styles.text}>
          • Search by city name or current location.{"\n"}
          • Practice API calls, location handling, and dynamic UI design.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", justifyContent: "center" },
  box: {
    marginHorizontal: 24,
    backgroundColor: "#020617",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    color: "#e5e7eb",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});
