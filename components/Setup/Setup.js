import PersonalWarnings from "./PersonalWarnings"
import SelfManagementStrategies from "./SelfManagementStrategies"
import ReasonsToLive from "./ReasonsToLive"
import { FlatList, useWindowDimensions, View, Animated, StyleSheet, Text } from "react-native"
import { Button } from "@rneui/themed"
import { useRef, useState } from "react"

const slides = [
    {
        page: 'personalWarnings',
        id: 1,
        done: false
    },
    {
        page: 'selfManagementStrategies',
        id: 2,
        done: false
    },
    {
        page: 'reasonsToLive',
        id: 3,
        done: false
    }
]

const SetupContainer = ({ item }) => {
    const { width } = useWindowDimensions();
    if (item.page === 'personalWarnings') {
        return <PersonalWarnings width={width} done={item.done} />
    } else if (item.page === 'selfManagementStrategies') {
        return <SelfManagementStrategies width={width} done={item.done} />
    } else if (item.page === 'reasonsToLive') {
        return <ReasonsToLive width={width} done={item.done} />
    }
    return <View>
        <Text style={{ width }}>Hello world</Text>
    </View>
}

const Paginator = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={{ flexDirection: 'row', height: 64 }}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })

                return <Animated.View style={[styles.dot, { width: 10, opacity, marginBottom: 0 }]} key={i.toString()} />
            })}
        </View>
    )
}

const NextButton = ({ scrollTo, scrollBack, disabled }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={{ flexDirection: 'row', marginBottom: 40}}>
            <Button title={'Back'} type={'outline'} buttonStyle={{ padding: 20, width: (width - 50) / 2, borderRadius: 15 }} onPress={scrollBack} disabled={disabled} />
            <Button title={'Next'} buttonStyle={{ padding: 20, marginLeft: 20, width: (width - 50) / 2, borderRadius: 15 }} onPress={scrollTo} />
        </View>
    )
}

const Setup = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const scrollTo = () => {
        if (currentIndex < slides.length - 1) {
            slides[currentIndex].done = true;
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            slides[currentIndex].done = true;
            navigation.navigate("Home")
        }
    }

    const scrollBack = () => {
        if (currentIndex) {
            slides[currentIndex - 1].done = false;
            slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
        } 
    }

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <SetupContainer item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    keyExtractor={item => item.id}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                    scrollEnabled={false}
                />
            </View>

            <Paginator data={slides} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo} scrollBack={scrollBack} disabled={!currentIndex} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#2C69B7',
        marginHorizontal: 8,
    }
})

export default Setup;