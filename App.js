import { useEffect, useState } from "react";
import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeBaseProvider } from 'native-base';
import { classes } from "./utils/theme";
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
import SplashScreen from './src/components/SplashScreen/SplashScreen'
import Setup from './src/components/Setup/Setup';
import { Provider } from 'react-redux';
import { Store, persistor } from './src/redux/store';
import { PersistGate } from "redux-persist/integration/react";
import BottomNavigation from "./src/components/BottomNavigation/BottomNavigation";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'transparent'
  },
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState([])

  // Check what we can do to make this work
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

  useEffect(() => {
    if (!fontsLoaded) {
      setLoading(true)
      console.log('hits')
    } else {
      setLoading(false)
    }
  }, [fontsLoaded])

  useEffect(() => {
    loadApp();
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
  }, [])


  const loadApp = async () => {
    setLoading(true)
    const warnings = await AsyncStorage.getItem('warnings');
    const strategies = await AsyncStorage.getItem('strategies');
    const reasons = await AsyncStorage.getItem('reasons');
    const social = await AsyncStorage.getItem('social');
    const professional = await AsyncStorage.getItem('professional');

    setPlanData([warnings, strategies, reasons, social, professional])
  }


  return (
    <View style={classes.background}>
      <NativeBaseProvider>
        <Provider store={Store}>
          {loading ?
            <SplashScreen />
            :
            <NavigationContainer theme={MyTheme}>
              <BottomNavigation />
            </NavigationContainer>
          }
        </Provider>
      </NativeBaseProvider>
    </View>
  );

}

export default App;


