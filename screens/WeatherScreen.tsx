import React, { useMemo, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Animated,
} from "react-native";
import { useWeather } from "../hooks/useWeather";
import LoadingScreen from "./LoadingScreen";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

const weatherThemes: Record<
  string,
  { icon: FeatherIconName; background: any }
> = {
  Clear: {
    icon: "sun",
    background: require("../assets/images/clear.jpg"),
  },
  Clouds: {
    icon: "cloud",
    background: require("../assets/images/cloud.jpg"),
  },
  Rain: {
    icon: "cloud-rain",
    background: require("../assets/images/rain.jpg"),
  },
  Snow: {
    icon: "cloud-snow",
    background: require("../assets/images/snow.jpg"),
  },
  Default: {
    icon: "cloud",
    background: require("../assets/images/clear.jpg"),
  },
};

export default function WeatherScreen() {
  const {
    loading,
    city,
    setCity,
    displayCity,
    temperature,
    description,
    condition,
    errorMsg,
    getWeatherFromCity,
    getWeatherFromLocation,
  } = useWeather();

  const navigation = useNavigation();

  const normalizeCondition = (c: string): keyof typeof weatherThemes => {
    console.log("Normalizing condition:", c);
    if (c.includes("Rain")) return "Rain";
    if (c.includes("Snow")) return "Snow";
    if (c.includes("Cloud")) return "Clouds";
    if (c.includes("Clear")) return "Clear";
    return "Default";
  };

    const { iconName, bgImage } = useMemo(() => {
    const key = condition ? normalizeCondition(condition) : "Default";
    return {
        iconName: weatherThemes[key].icon,
        bgImage: weatherThemes[key].background,
    };
  }, [condition]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    translateAnim.setValue(20);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [temperature, description, condition]);

  if (loading) {
    return <LoadingScreen message="Fetching location and weather..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={bgImage}
        style={styles.background}
        imageStyle={{ opacity: 0.85 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.inner}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>CLIMA</Text>

              <TouchableOpacity
                style={styles.infoBtn}
                onPress={() => router.push("./about")}
            >
                <Feather name="info" size={20} color="#e5e7eb" />
            </TouchableOpacity>
            </View>

            <Animated.View
              style={[
                styles.weatherBox,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: translateAnim }],
                },
              ]}
            >
              {temperature !== null ? (
                <>
                  <Feather name={iconName} size={64} color="#facc15" />
                  <Text style={styles.temp}>{temperature}°C</Text>
                  <Text style={styles.city}>{displayCity}</Text>
                  <Text style={styles.desc}>{description}</Text>
                </>
              ) : (
                <Text style={styles.desc}>No data available</Text>
              )}
            </Animated.View>

            {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="Enter city name..."
                placeholderTextColor="#e5e7eba0"
                value={city}
                onChangeText={setCity}
              />
              <TouchableOpacity style={styles.btn} onPress={getWeatherFromCity}>
                <Text style={styles.btnText}>SEARCH</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.locationBtn}
              onPress={getWeatherFromLocation}
            >
              <Feather name="navigation" size={16} color="#e5e7eb" />
              <Text style={styles.locationText}>  Use current location</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  background: { flex: 1 },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#f3f4f6",
  },
  infoBtn: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "#0f172ab0",
  },
  weatherBox: {
    backgroundColor: "#020617cc",
    borderRadius: 20,
    paddingVertical: 26,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  temp: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#f9fafb",
    marginTop: 8,
  },
  city: {
    fontSize: 22,
    color: "#e5e7eb",
    marginTop: 4,
  },
  desc: {
    color: "#cbd5f5",
    marginTop: 4,
    textTransform: "capitalize",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    marginTop: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#020617cc",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#f9fafb",
    marginRight: 8,
  },
  btn: {
    backgroundColor: "#f97373",
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  btnText: { color: "white", fontWeight: "bold" },
  locationBtn: {
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e7eb80",
    backgroundColor: "#020617b0",
  },
  locationText: { color: "#e5e7eb", fontSize: 14 },
  error: {
    color: "#fee2e2",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "500",
  },
});
