import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';


Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }
    }
})

export default function Home() {

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

    return (
        <View
            style={{
                flex: 1,
                paddingTop: 50
            }}
        >
            <Text>{personalWarningSigns}</Text>
            <Button onPress={triggerNotifications} title="Trigger Notification" color="#841584" accessibilityLabel="Trigger Notification" />
            <Button onPress={getData} title="Get Data" color="#841584" accessibilityLabel="Get Data" />
        </View>
    );

}

