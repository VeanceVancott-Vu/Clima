# 🌤️ Clima Weather App

**Clima** is a sleek, modern, cross-platform weather application built with **React Native** and **Expo**. It provides real-time weather updates either by searching for any city worldwide or by utilizing the device's GPS location.

---

## 📸 Overview

Clima features dynamic themes that respond to live weather conditions, elegant slide & fade animations, and accurate geocoding & weather data powered by Open-Meteo APIs.

---

## ✨ Features

- 📍 **GPS Location Weather**: Fetch real-time weather for your current physical location with a single tap.
- 🔍 **Global City Search**: Look up current weather for any city worldwide.
- 🎨 **Dynamic Weather Themes**: Context-aware background images and icons matching conditions (Clear, Clouds, Rain, Snow, Default).
- 🎬 **Smooth Animations**: Built-in React Native `Animated` API for smooth fade-in and slide-up transitions when weather updates.
- 📱 **Multi-Screen Navigation**: Navigation powered by Expo Router with an **About** details screen.
- 🌐 **Cross-Platform**: Fully compatible with Android, iOS, and Web.
- 🔑 **No API Key Required**: Powered by Open-Meteo open-source weather and geocoding services.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [React Native](https://reactnative.dev/) (v0.81.5) with [Expo](https://expo.dev/) (v54.0)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (v6.0)
- **Geolocation**: `expo-location`
- **Icons**: `@expo/vector-icons` (Feather icons)
- **APIs Used**:
  - [Open-Meteo Weather Forecast API](https://open-meteo.com/)
  - [Open-Meteo Geocoding API](https://geocoding-api.open-meteo.com/)
- **Language**: TypeScript

---

## 📂 Project Structure

```text
Clima/
├── app/                  # Expo Router file-based routes
│   ├── _layout.tsx       # Root layout & navigation stack
│   ├── index.tsx         # Main entry point (WeatherScreen)
│   └── about.tsx         # About / Info screen
├── screens/              # Screen components
│   ├── WeatherScreen.tsx # Main weather display & search UI
│   ├── InforScreen.tsx   # Detailed project & developer info
│   └── LoadingScreen.tsx # Custom loading spinner indicator
├── hooks/                # Custom React hooks
│   └── useWeather.ts     # Weather state management & location logic
├── services/             # API services
│   └── weatherApi.ts     # Open-Meteo fetch requests
├── assets/               # Local static assets (Images, Fonts, Icons)
│   └── images/           # Background weather images (clear, rain, etc.)
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Expo Go app on iOS/Android or an emulator (Android Studio / Xcode)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VeanceVancott-Vu/Clima.git
   cd Clima
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

### 📱 Running on Devices

- **Android**: Press `a` in the terminal or run `npm run android`
- **iOS**: Press `i` in the terminal or run `npm run ios`
- **Web**: Press `w` in the terminal or run `npm run web`

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).