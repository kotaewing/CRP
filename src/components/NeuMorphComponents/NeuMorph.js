import { View, Pressable } from "react-native";
import { classes, bgColor, secondaryColor } from "../../../utils/theme";
import { NeomorphBox } from "react-native-neomorph-shadows";
import { useSelector } from "react-redux";
import { outerShadow, innerShadow } from "../../../utils/globalAnimations";
import { Animated, Easing } from "react-native";
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from "react";

const AnimationNeomorphBox = Animated.createAnimatedComponent(NeomorphBox);

const NeuMorph = ({ children, width, height, style, onPress, containerStyle, shadowWidthRadius = 8, pressed }) => {
    const { mainHue, mainSaturation, mainLightness } = useSelector(state => state.app);

    const handlePress = () => {
        if (onPress) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPress()
        }
    }

    const radiusInterpolation = outerShadow.interpolate({
        inputRange: [0.01, 1],
        outputRange: [0, shadowWidthRadius]
    })


    return (
        <Pressable onPress={handlePress}>
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
                            backgroundColor: bgColor,
                            width: width,
                            height: height,
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        containerStyle
                    ]}
                >
                    <Animated.View
                        style={[
                            classes.pressedInner,
                            { width: width - 5 || 40, height: height - 5 || 40, borderRadius: 12, opacity: innerShadow, backgroundColor: pressed ? secondaryColor : bgColor },
                            style
                        ]}
                    >
                        {children}
                    </Animated.View>
                </AnimationNeomorphBox>
            </View>
        </Pressable>
    )
}
export default NeuMorph;
