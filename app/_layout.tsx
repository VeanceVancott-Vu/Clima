import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} 
      />

      <Stack.Screen
        name="about"
        options={{
          headerShown: true,
          title: "About",
          headerStyle: { backgroundColor: "#0f172a" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}