import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Icon } from "@rneui/themed";

import Home from "../Home/Home";
import DailyCheck from "../DailyCheck/DailyCheck";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                header: () => null,
                animation: 'none'
            }}
            tabBar={props => <MyTabBar {...props} />}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="DailyCheck" component={DailyCheck} />
        </Tab.Navigator>
    )
}


function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: '#2C69B7',
                height: 85,
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center'
            }}
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
                    if (label === "Home") {
                        return "home"
                    } else if (label === "DailyCheck") {
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
                                color={isFocused ? 'white' : "gray"}
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