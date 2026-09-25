import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { fetchCoordsByCity, fetchWeatherByCoords } from "../services/weatherApi";
import { weatherCodeMap } from "../constants/weatherCodes";

export const useWeather = () => {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [displayCity, setDisplayCity] = useState("");
  const [temperature, setTemperature] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [condition, setCondition] = useState<string | null>(null);

  useEffect(() => {
    getWeatherFromLocation();
  }, []);

  const getWeatherFromLocation = async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("No permission to access location.");
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      await fetchWeather(latitude, longitude, "Current Location");
    } catch (err) {
      setErrorMsg("Unable to get location.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (lat: number, lon: number, cityName: string) => {
  const data = await fetchWeatherByCoords(lat, lon);

  if (data.current_weather) {
    setTemperature(Math.round(data.current_weather.temperature));
    setDescription(`Wind ${data.current_weather.windspeed} km/h`);
    setCondition(
      weatherCodeMap[data.current_weather.weathercode] || "Unknown"
    );
    setDisplayCity(cityName);
  } else {
    setErrorMsg("No weather data available.");
  }
};


  const getWeatherFromCity = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      const geo = await fetchCoordsByCity(city);

      if (!geo.results || geo.results.length === 0) {
        setErrorMsg("City not found.");
        return;
      }

      const { latitude, longitude, name } = geo.results[0];

      await fetchWeather(latitude, longitude, name);
      setCity("");
    } catch (err) {
      setErrorMsg("Error while fetching city weather.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    city,
    setCity,
    displayCity,
    temperature,
    description,
    condition,
    errorMsg,
    getWeatherFromLocation,
    getWeatherFromCity,
  };
};
