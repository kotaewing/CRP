import { useRef } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';

const useGlobalAnimation = () => {
    const mainAnimation = useSharedValue(0.01);
    const secondaryAnimation = useSharedValue(0.01);

    const revealItems = () => {
        mainAnimation.value = withTiming(1, {
            duration: 1000
        });
    }
    
    const removeItems = () => {
        mainAnimation.value = withTiming(0.01, {
            duration: 1000
        });
    }

    return { mainAnimation, secondaryAnimation, revealItems, removeItems };
}

export default useGlobalAnimation;