import { View, Pressable } from "react-native";
import { classes } from "../../../utils/theme";
import { NeomorphBox } from "react-native-neomorph-shadows";
import { useSelector } from "react-redux";
import { outerShadow, innerShadow } from "../../../utils/globalAnimations";
import { Animated, Easing } from "react-native";
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from "react";

const AnimationNeomorphBox = Animated.createAnimatedComponent(NeomorphBox);

const NeuMorph = ({ children, width, height, style, onPress, customPressAnimation = {}, containerStyle, shadowWidthRadius = 8, pressed, value }) => {
    const { mainHue, mainSaturation, mainLightness, secondaryHue, secondarySaturation, secondaryLightness } = useSelector(state => state.app);
    let pressAnimation = new Animated.Value(0.01);

    const handlePress = () => {
        if (onPress) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPress()
        }
    }

    useEffect(() => {
        if (pressed) {
            pressAnimation.setValue(1)
        }
        if (!pressed) {
            releaseButton();
        }
        
    }, [pressed])

    const pressButton = (duration = 250) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (customPressAnimation.exists) {
            Animated.parallel([
                Animated.timing(pressAnimation, {
                    toValue: 1,
                    duration,
                    useNativeDriver: false,
                    easing: Easing.inOut(Easing.cubic)
                }),
                Animated.timing(customPressAnimation.pressAnimation, {
                    toValue: 1,
                    duration,
                    useNativeDriver: false,
                    easing: Easing.inOut(Easing.cubic)
                })
            ]).start(() => {
                onPress(value)
            })
        } else {
            Animated.timing(pressAnimation, {
                toValue: 1,
                duration,
                useNativeDriver: false,
                easing: Easing.inOut(Easing.cubic)
            }).start()
        }
    }

    const releaseButton = () => {
        if (customPressAnimation.exists) {
            Animated.parallel([
                Animated.timing(pressAnimation, {
                    toValue: 0.01,
                    duration: 1000,
                    useNativeDriver: false,
                    easing: Easing.inOut(Easing.cubic)
                }),
                Animated.timing(customPressAnimation.pressAnimation, {
                    toValue: 0.01,
                    duration: 1000,
                    useNativeDriver: false,
                    easing: Easing.inOut(Easing.cubic)
                })
            ]).start()
        } else {
            Animated.timing(pressAnimation, {
                toValue: 0.01,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.inOut(Easing.cubic)
            }).start()
        }
    }

    const handlePressIn = () => {
        if (onPress) {
            setTimeout(() => {
                pressButton();
            }, 50)
        }
    }

    const handlePressOut = () => {
        if (onPress) {
            setTimeout(() => {
                releaseButton();
            }, 50)
        }
    }

    const colorInterpolation = pressAnimation.interpolate({
        inputRange: [0.01, 1],
        outputRange: [`hsla(${mainHue}, ${mainSaturation}%, ${mainLightness}%, 1)`, `hsla(${secondaryHue}, ${secondarySaturation}%, ${secondaryLightness}%, 1)`]
    })

    const radiusInterpolation = outerShadow.interpolate({
        inputRange: [0.01, 1],
        outputRange: [0, shadowWidthRadius]
    })

    const pressRadiusInterpolation = pressAnimation.interpolate({
        inputRange: [0.01, 1],
        outputRange: [0, shadowWidthRadius]
    })


    return (
        <Pressable onPress={handlePress} onPressIn={handlePressIn} onPressOut={() => handlePressOut()}>
            <View>
                <AnimationNeomorphBox
                    darkShadowColor={`hsla(${mainHue}, ${mainSaturation}%, ${mainLightness - 20}%, 1)`}
                    lightShadowColor={`hsla(${mainHue}, ${mainSaturation}%, ${mainLightness + 10}%, 1)`}
                    style={[
                        {
                            shadowRadius: radiusInterpolation,
                            shadowOpacity: 1,
                            shadowOffset: {
                                width: radiusInterpolation,
                                height: radiusInterpolation
                            },
                            borderRadius: 15,
                            backgroundColor: `hsla(${mainHue}, ${mainSaturation}%, ${mainLightness}%, 1)`,
                            width: width,
                            height: height,
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        containerStyle
                    ]}
                >
                    <AnimationNeomorphBox
                        inner
                        darkShadowColor={`hsla(${secondaryHue}, ${secondarySaturation}%, ${secondaryLightness - 12}%, 1)`}
                        lightShadowColor={`hsla(${secondaryHue}, ${secondarySaturation}%, ${secondaryLightness + 6}%, 1)`}
                        style={{
                            shadowRadius: pressRadiusInterpolation,
                            shadowOpacity: pressAnimation,
                            shadowOffset: {
                                width: pressRadiusInterpolation,
                                height: pressRadiusInterpolation
                            },
                            borderRadius: 15,
                            backgroundColor: colorInterpolation,
                            width: width - 6,
                            height: height - 6,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Animated.View
                            style={[
                                classes.pressedInner,
                                { width: width || 40, height: height || 40, borderRadius: 15, opacity: innerShadow },
                                style
                            ]}
                        >
                            {children}
                        </Animated.View>
                    </AnimationNeomorphBox>
                </AnimationNeomorphBox>
            </View>
        </Pressable>
    )
}
export default NeuMorph;
