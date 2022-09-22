import { View, TouchableWithoutFeedback, Pressable } from "react-native";
import { classes, textColor, bgColor, secondaryColor } from "../../../utils/theme";
import { NeomorphBox } from "react-native-neomorph-shadows";
import { useSelector } from "react-redux";
import { outerShadow, innerShadow } from "../../../utils/globalAnimations";
import { Animated } from "react-native";
import * as Haptics from 'expo-haptics';

const AnimationNeomorphBox = Animated.createAnimatedComponent(NeomorphBox);

const NeuMorphButton = ({ buttonText, width, height, style, onPress, containerStyle, disabled }) => {
    const { mainHue, mainSaturation, mainLightness, secondaryHue, secondarySaturation, secondaryLightness } = useSelector(state => state.app);
    const pressAnimation = new Animated.Value(0.01);
    const textAnimation = new Animated.Value(0.01)

    const textColorInterpolation = textAnimation.interpolate({
        inputRange: [0.01, 1],
        outputRange: [textColor, bgColor]
    })

    const handlePress = () => {
        if (!disabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onPress()
        }
    }

    const pressButton = (duration = 250) => {
        
        Animated.parallel([
            Animated.timing(pressAnimation, {
                toValue: 1,
                duration,
                useNativeDriver: false
            }),
            Animated.timing(textAnimation, {
                toValue: 1,
                duration,
                useNativeDriver: false
            })
        ]).start()
    }

    const releaseButton = () => {
        Animated.parallel([
            Animated.timing(pressAnimation, {
                toValue: 0.01,
                duration: 250,
                useNativeDriver: false
            }),
            Animated.timing(textAnimation, {
                toValue: 0.01,
                duration: 250,
                useNativeDriver: false
            })
        ]).start()
    }

    const handlePressIn = () => {
        if (!disabled) {
            pressButton();
        }
    }

    const handlePressOut = () => {
        if (onPress) {
            releaseButton();
        }
    }

    const colorInterpolation = pressAnimation.interpolate({
        inputRange: [0.01, 1],
        outputRange: [`hsla(${mainHue}, ${mainSaturation}%, ${mainLightness}%, 1)`, `hsla(${secondaryHue}, ${secondarySaturation}%, ${secondaryLightness}%, 1)`]
    })



    return (
        <Pressable onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <View>
                <AnimationNeomorphBox
                    darkShadowColor={`hsla(${mainHue}, ${mainSaturation}%, ${mainLightness - 20}%, 1)`}
                    lightShadowColor={`hsla(${mainHue}, ${mainSaturation}%, ${mainLightness + 8}%, 1)`}
                    style={[
                        {
                            shadowRadius: 4,
                            shadowOpacity: outerShadow,
                            shadowOffset: {
                                width: 4,
                                height: 4
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
                    <Animated.View
                        style={[
                            classes.pressedInner,
                            {
                                width: width - 5 || 40,
                                height: height - 5 || 40,
                                borderRadius: 12,
                                opacity: outerShadow,
                                backgroundColor: colorInterpolation
                            },
                            style
                        ]}
                    >
                        <Animated.Text style={[classes.subText, { color: disabled ? "transparent" : textColorInterpolation }]}>
                            {buttonText}
                        </Animated.Text>
                    </Animated.View>
                </AnimationNeomorphBox>
            </View>
        </Pressable>
    )
}
export default NeuMorphButton;
