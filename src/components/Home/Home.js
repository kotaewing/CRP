import { useEffect } from "react";
import { View, Text, useWindowDimensions, Animated } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { classes } from "../../../utils/theme";
import { Button, Card } from "@rneui/themed";
import { useSelector } from 'react-redux';
import { ScrollView } from "native-base";
import NeuMorph from "../NeuMorphComponents/NeuMorph";
import { outerShadow } from "../../../utils/globalAnimations";

// Use this for notification config -- figure out where to put once cron is setup
Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }
    }
})

const Home = ({ navigation }) => {
    const { warnings, strategies, reasons, social, professional } = useSelector(state => state.crp);

    const screen = useWindowDimensions();

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

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <Animated.Text style={[
                classes.headerText,
                {
                    paddingTop: 20,
                    paddingBottom: 20,
                    alignSelf: 'center',
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: 'center',
                    fontFamily: 'Rubik_600SemiBold',
                    opacity: outerShadow
                }
            ]}>
                {"My CRP"}
            </Animated.Text>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <NeuMorph width={screen.width - 40} height={100} style={{ paddingTop: 1 }}>
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
                    {warnings.map(warning => {
                        return (
                            <Text key={warning.id} style={{ alignSelf: 'flex-start', marginLeft: 20 }}>{warning.warning}</Text>
                        )
                    })}
                </NeuMorph>
                {/* <Card containerStyle={classes.card}>
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
                    {strategies.map(strategy => {
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
                    {reasons.map(reason => {
                        return (
                            <Text key={reason.id}>{reason.reason ? reason.reason : ""}</Text>
                        )
                    })}
                </Card>
                <Button onPress={triggerNotifications} title="Trigger Notification" color="#841584" accessibilityLabel="Trigger Notification" />
                <Button type="outline" buttonStyle={{ padding: 10, width: "50%", borderRadius: 15 }} onPress={() => navigation.navigate("Setup")} title="Edit CRP" color="#2C69B7" accessibilityLabel="Get Data" /> */}
            </ScrollView>
        </View>
    );

}

export default Home;

