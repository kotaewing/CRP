import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { classes } from "../../utils/theme";
import { Icon, Button, Card } from "@rneui/themed";


Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }
    }
})

export default function Home({ navigation }) {

    const [personalWarningSigns, setPersonalWarningSigns] = useState([]);
    const [selfManagement, setSelfManagement] = useState([]);
    const [reasonsToLive, setReasonsToLive] = useState([])

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
            const warnings = await AsyncStorage.getItem("warningSigns");
            const strategies = await AsyncStorage.getItem("selfManagementStrategies")
            const reasons = await AsyncStorage.getItem("reasonsToLive")
            console.log(reasons)
            setPersonalWarningSigns(JSON.parse(warnings))
            setSelfManagement(JSON.parse(strategies))
            setReasonsToLive(JSON.parse(reasons))
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
            <Text style={{
                paddingTop: 20,
                paddingBottom: 20,
                alignSelf: 'center',
                fontSize: 26,
                color: "#2C69B7",
                fontWeight: "bold",
                textAlign: 'center',
                fontFamily: 'Rubik_600SemiBold'
            }}>
                {"My CRP"}
            </Text>
            <Card containerStyle={classes.card}>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: 'center',
                    fontFamily: 'Rubik_600SemiBold',
                    marginBottom: 10
                }}>
                    {"Personal Warning Signs"}
                </Text>
                {personalWarningSigns.map(warning => {
                    return (
                        <Text key={warning.id}>{warning.warning}</Text>
                    )
                })}
            </Card>
            <Card containerStyle={classes.card}>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: 'center',
                    fontFamily: 'Rubik_600SemiBold',
                    marginBottom: 10
                }}>
                    {"Self-Management Strategies"}
                </Text>
                {selfManagement.map(strategy => {
                    return (
                        <Text key={strategy.id}>{strategy.strategy}</Text>
                    )
                })}
            </Card>
            <Card containerStyle={classes.card}>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: 'center',
                    fontFamily: 'Rubik_600SemiBold',
                    marginBottom: 10
                }}>
                    {"Reasons To Live"}
                </Text>
                {reasonsToLive.map(reason => {
                    return (
                        <Text key={reason.id}>{reason.reason ? reason.reason : ""}</Text>
                    )
                })}
            </Card>
            <Button onPress={triggerNotifications} title="Trigger Notification" color="#841584" accessibilityLabel="Trigger Notification" />
            <Button onPress={getData} title="Get Data" color="#841584" accessibilityLabel="Get Data" />
            <Button onPress={() => navigation.navigate("Setup")} title="Setup" color="#841584" accessibilityLabel="Get Data" />
        </View>
    );

}

