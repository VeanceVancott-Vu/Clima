export const fetchCoordsByCity = async (city: string) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=vi&format=json`;

  const res = await fetch(url);
  return res.json();
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;

  const res = await fetch(url);
  return res.json();
};