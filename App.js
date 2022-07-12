import { useEffect, useState } from "react";
import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DailyCheck from './components/DailyCheck/DailyCheck';
import Home from "./components/Home/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonalWarnings from "./components/Setup/PersonalWarnings";
import { NativeBaseProvider } from 'native-base';
import SelfManagementStrategies from "./components/Setup/SelfManagementStrategies";

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

export default function App() {

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
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
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
  );

}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center'
  }
})

