import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, SafeAreaView, Animated, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon } from "@rneui/themed";
import { classes } from "../../../utils/theme";
import { EvilIcons, Feather } from '@expo/vector-icons';
import { revealItems, removeItems } from "../../../utils/globalAnimations";

import Home from "../Home/Home";
import DailyCheck from "../DailyCheck/DailyCheck";
import Setup from "../Setup/Setup";
import TodaysFocus from "../TodaysFocus/TodaysFocus";
import NeuMorphPressed from "../NeuMorphComponents/NeuMorphPressed";
import NeuMorph from "../NeuMorphComponents/NeuMorph";
import { useSelector } from "react-redux";
import { TouchableHighlight } from "react-native-web";
import NeuMorphTabButton from "../NeuMorphComponents/NeuMorphTabButton";

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const DailyCheckStack = createNativeStackNavigator();

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

const DailyCheckStackScreen = () => {
    return (
        <DailyCheckStack.Navigator
            screenOptions={{
                headerShown: false,
                header: () => null,
                animation: 'none'
            }}
        >
            <DailyCheckStack.Screen name="DailyCheck" component={DailyCheck} />
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
            screenListeners={({ navigation, route }) => ({
                tabPress: (e) => {
                    e.preventDefault();
                    removeItems(() => navigation.navigate(route.name));
                },
                focus: (e) => {
                    setTimeout(() => {
                        revealItems();
                    }, 250)
                }
            })}
        >
            <Tab.Screen name="HomeContainer" component={HomeStackScreen} />
            <Tab.Screen name="DailyCheckContainer" component={DailyCheckStackScreen} />
        </Tab.Navigator>
    )
}


function MyTabBar({ state, descriptors, navigation }) {
    const pressAnimation = new Animated.Value(0.01);
    const AnimationIcon = Animated.createAnimatedComponent(Feather);
    const { mainHue, mainSaturation, mainLightness } = useSelector(state => state.app);

    return (
        <SafeAreaView
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

                const textColorInterpolation = pressAnimation.interpolate({
                    inputRange: [0.01, 1],
                    outputRange: [`gray`, `hsla(${mainHue}, ${mainSaturation}%, ${mainLightness}%, 1)`]
                })

                const icon = () => {
                    if (label === "HomeContainer") {
                        return "home"
                    } else if (label === "DailyCheckContainer") {
                        return "check-circle"
                    }
                }

                return (
                    <View style={{ justifyContent: 'space-around' }} key={index}>
                        {isFocused ?
                            <NeuMorphPressed height={60} width={60}>
                                <Icon
                                    name={icon()}
                                    type='feather'
                                    color={`hsla(${mainHue}, ${mainSaturation}%, ${mainLightness}%, 1)`}
                                    size={40}
                                />

                            </NeuMorphPressed>
                            :
                            <NeuMorphTabButton
                                onPress={onPress}
                                customPressAnimation={{ pressAnimation, exists: true }}
                                height={60}
                                width={60}
                            >
                                <AnimationIcon
                                    name={icon()}
                                    style={{ color: textColorInterpolation }}
                                    size={40}
                                />
                            </NeuMorphTabButton>
                        }
                    </View>
                );
            })}
        </SafeAreaView>
    );
}
export default BottomNavigation;