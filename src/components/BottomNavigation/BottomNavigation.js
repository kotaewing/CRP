import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Icon } from "@rneui/themed";
import { classes } from "../../../utils/theme";

import Home from "../Home/Home";
import DailyCheck from "../DailyCheck/DailyCheck";
import TodaysFocus from "../DailyCheck/TodaysFocus";
import Setup from "../Setup/Setup";

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
                header: () => null,
                animation: 'none'
            }}
        >
            <HomeStack.Screen
                name="Home"
                component={Home}
            />
            <HomeStack.Screen
                name="Setup"
                component={Setup}
            />
        </HomeStack.Navigator>
    )
}

const DailyCheckStack = createNativeStackNavigator();

const DailyCheckScreen = () => {
    return (
        <DailyCheckStack.Navigator
            screenOptions={{
                headerShown: false,
                header: () => null,
                animation: 'none'
            }}
        >
            <DailyCheckStack.Screen name="Daily Check" component={DailyCheck} />
            <DailyCheckStack.Screen name="TodaysFocus" component={TodaysFocus} />
        </DailyCheckStack.Navigator>
    )
}

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                header: () => null
            }}
            tabBar={props => <MyTabBar {...props} />}
        >
            <Tab.Screen name="HomeStack" component={HomeStackScreen} />
            <Tab.Screen name="DailyCheckStack" component={DailyCheckScreen} />
        </Tab.Navigator>
    )
}


function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View
            style={classes.bottomNavigation}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const icon = () => {
                    if (label === "HomeStack") {
                        return "home"
                    } else if (label === "DailyCheckStack") {
                        return "smile"
                    }
                }

                return (
                    <>
                        <Button
                            type="clear"
                            color={isFocused ? "error" : "success"}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            <Icon
                                name={icon()}
                                type='feather'
                                color={isFocused ? '#2C69B7' : "gray"}
                                size={40}
                            />
                        </Button>
                    </>
                );
            })}
        </View>
    );
}
export default BottomNavigation;