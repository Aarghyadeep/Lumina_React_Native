import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from 'react';
import GlobalProvider from "../context/GlobalProvider";
import * as SplashScreen from 'expo-splash-screen';
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  
  useEffect(() => {
    if (fontError) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GlobalProvider>
    <Stack screenOptions={{
      presentation: 'transparentModal',
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{headerShown: false }} />
      <Stack.Screen name="search/[query]" options={{headerShown: false }} />
    </Stack>
    </GlobalProvider>
  )
}