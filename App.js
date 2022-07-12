import { useEffect, useState } from "react";
import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DailyCheck from './components/DailyCheck/DailyCheck';
import Home from "./components/Home/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonalWarnings from "./components/Setup/PersonalWarnings";
import { NativeBaseProvider } from 'native-base';
import SelfManagementStrategies from "./components/Setup/SelfManagementStrategies";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_300Light,
  Rubik_300Light_Italic,
  Rubik_400Regular_Italic,
  Rubik_500Medium,
  Rubik_500Medium_Italic,
  Rubik_600SemiBold,
  Rubik_600SemiBold_Italic,
  Rubik_700Bold,
  Rubik_700Bold_Italic,
  Rubik_800ExtraBold,
  Rubik_800ExtraBold_Italic,
  Rubik_900Black,
  Rubik_900Black_Italic
} from '@expo-google-fonts/rubik';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }
  }
})

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'transparent'
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
    Rubik_900Black,
    Rubik_300Light_Italic,
    Rubik_400Regular_Italic,
    Rubik_500Medium_Italic,
    Rubik_600SemiBold_Italic,
    Rubik_700Bold_Italic,
    Rubik_800ExtraBold_Italic,
    Rubik_900Black_Italic
  })

  const [personalWarningSigns, setPersonalWarningSigns] = useState("");

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then((statusObj) => {
      if (statusObj.status !== "granted") {
        return Permissions.askAsync(Permissions.NOTIFICATIONS)
      }
      return statusObj;
    }).then((statusObj) => {
      if (statusObj.status !== "granted") {
        return;
      }
    })
    getData()
  }, [])

  const triggerNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "How are you feeling today?",
        body: "Check in on the app to keep track"
      },
      trigger: { seconds: 2 }
    })
    await AsyncStorage.setItem("personalWarningSigns", "This is my warning")
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(new Date().toDateString());

      if (value !== null) {
        setPersonalWarningSigns(value)
      }
    } catch (err) {

    }
  }


  const HomeStack = createNativeStackNavigator();

  const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={Home}
        />
        <HomeStack
          name="Setup"
          component={PersonalWarnings}
        />
      </HomeStack.Navigator>
    )
  }

  return (
    <ImageBackground source={require('./assets/bg.png')} style={styles.image}>
      <NativeBaseProvider>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              header: () => null
            }}
          >
            <Stack.Screen
              name="Personal Warnings"
              component={PersonalWarnings}
            />
            <Stack.Screen
              name="Self Management Strategies"
              component={SelfManagementStrategies}
            />
            <Stack.Screen
              name="DailyCheck"
              component={DailyCheck}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ImageBackground>
  );

}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50
  }
})

