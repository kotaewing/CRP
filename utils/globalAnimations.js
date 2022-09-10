import { Animated } from "react-native";

export const outerShadow = new Animated.Value(0.01);
export const innerShadow = new Animated.Value(0);
export const textAnimation = new Animated.Value(0.01);

export const revealItems = (nextTask) => {
        Animated.timing(outerShadow, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start(() => {
            Animated.timing(innerShadow, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false
            }).start(nextTask);
        })
}

export const removeItems = (nextTask) => {
    Animated.parallel([
        Animated.timing(outerShadow, {
            toValue: 0.01,
            duration: 1000,
            useNativeDriver: false
        }),
        Animated.timing(innerShadow, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        })
    ]).start(nextTask);
}