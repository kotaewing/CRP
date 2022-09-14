import { View, TouchableWithoutFeedback } from "react-native";
import { classes } from "../../../utils/theme";
import { NeomorphBox } from "react-native-neomorph-shadows";
import { useSelector } from "react-redux";
import { animation } from "../../../utils/globalAnimations";
import { Animated } from "react-native";
import * as Haptics from 'expo-haptics';

const AnimationNeomorphBox = Animated.createAnimatedComponent(NeomorphBox);

const NeuMorphTabButton = ({ children, width, height, style, onPress, customPressAnimation = {} }) => {
    const { mainHue, mainSaturation, mainLightness, secondaryHue, secondarySaturation, secondaryLightness } = useSelector(state => state.app);
    const pressAnimation = new Animated.Value(0.01);

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress()
    }

    const handlePressIn = () => {
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(pressAnimation, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: false
                }),
                Animated.timing(customPressAnimation.pressAnimation, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: false
                })
            ]).start()
        }, 50)
    }

    const handlePressOut = () => {
        Animated.parallel([
            Animated.timing(pressAnimation, {
                toValue: 0.01,
                duration: 250,
                useNativeDriver: false
            }),
            Animated.timing(customPressAnimation.pressAnimation, {
                toValue: 0.01,
                duration: 250,
                useNativeDriver: false
            })
        ]).start()
    }

    const colorInterpolation = pressAnimation.interpolate({
        inputRange: [0.01, 1],
        outputRange: [`hsla(${mainHue}, ${mainSaturation}%, ${mainLightness}%, 1)`, `hsla(${secondaryHue}, ${secondarySaturation}%, ${secondaryLightness}%, 1)`]
    })



    return (
        <TouchableWithoutFeedback onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <View>
                <AnimationNeomorphBox
                    darkShadowColor={`hsla(${mainHue}, ${mainSaturation}%, ${mainLightness - 20}%, 1)`}
                    lightShadowColor={`hsla(${mainHue}, ${mainSaturation}%, ${mainLightness + 8}%, 1)`}
                    style={{
                        shadowRadius: 4,
                        shadowOpacity: 1,
                        shadowOffset: {
                            width: 4,
                            height: 4
                        },
                        borderRadius: 50,
                        backgroundColor: `hsla(${mainHue}, ${mainSaturation}%, ${mainLightness}%, 1)`,
                        width: width,
                        height: height,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <AnimationNeomorphBox
                        inner
                        darkShadowColor={`hsla(${secondaryHue}, ${secondarySaturation}%, ${secondaryLightness - 12}%, 1)`}
                        lightShadowColor={`hsla(${secondaryHue}, ${secondarySaturation}%, ${secondaryLightness + 6}%, 1)`}
                        style={{
                            shadowRadius: 4,
                            shadowOpacity: pressAnimation,
                            shadowOffset: {
                                width: 4,
                                height: 4
                            },
                            borderRadius: 50,
                            backgroundColor: colorInterpolation,
                            width: width - 6,
                            height: height - 6,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={[
                                classes.pressedInner,
                                { width: width || 40, height: height || 40, borderRadius: 15 },
                                style
                            ]}
                        >
                            {children}
                        </View>
                    </AnimationNeomorphBox>
                </AnimationNeomorphBox>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default NeuMorphTabButton;
