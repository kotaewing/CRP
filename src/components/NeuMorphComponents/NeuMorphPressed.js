import { View, TouchableWithoutFeedback, Animated } from "react-native";
import { classes } from "../../../utils/theme";
import { NeomorphBox } from "react-native-neomorph-shadows";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { animation, testing } from './../../../utils/globalAnimations';
import * as Haptics from 'expo-haptics';

const AnimationNeomorphBox = Animated.createAnimatedComponent(NeomorphBox);

const NeuMorphPressed = ({ children, width, height, style, onPress }) => {
    const { mainHue, mainSaturation, mainLightness, secondaryHue, secondarySaturation, secondaryLightness } = useSelector(state => state.app);

    const shadowAnim = new Animated.Value(0);

    const handlePress = () => {
        Animated.timing(shadowAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }


    return (
        <TouchableWithoutFeedback /*onPress={onPress}*/ onPress={handlePress} style={{ width: width || 40, height: height || 40 }}>
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
                        borderRadius: 15,
                        backgroundColor: `hsla(${mainHue}, ${mainSaturation}%, ${mainLightness}%, 1)`,
                        width: width || 40,
                        height: height || 40,
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
                            shadowOpacity: animation,
                            shadowOffset: {
                                width: 4,
                                height: 4
                            },
                            borderRadius: 15,
                            backgroundColor: `hsla(${secondaryHue}, ${secondarySaturation}%, ${secondaryLightness}%, 1)`,
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
export default NeuMorphPressed;
