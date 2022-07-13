import PersonalWarnings from "./PersonalWarnings"
import SelfManagementStrategies from "./SelfManagementStrategies"
import { FlatList, useWindowDimensions, View, Animated, StyleSheet, Text } from "react-native"
import { Progress } from "native-base"
import { Button } from "@rneui/themed"
import { useRef, useState } from "react"

const slides = [{ page: 'personalWarnings', id: 1 }, { page: 'selfManagementStrategies', id: 2 }, { page: 'reasonsToLive', id: 3 }, { page: 'reasonsToLive', id: 4 }]

const SetupContainer = ({ item }) => {
    const { width } = useWindowDimensions();
    if (item.page === 'personalWarnings') {
        return <PersonalWarnings width={width} />
    } else if (item.page === 'selfManagementStrategies') {
        return <SelfManagementStrategies width={width} />
    }
    return <View></View>
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

                return <Animated.View style={[styles.dot, {width: 10, opacity, marginBottom: 0}]} key={i.toString()} />
            })}
        </View>
    )
}

const NextButton = ({ scrollTo }) => {
    const { width } = useWindowDimensions();
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2

    return (
        <View>
            <Button title={'Next'} buttonStyle={{ padding: 20, marginTop: 0, width: width - 50, borderRadius: 15 }} onPress={scrollTo}  />
        </View>
    )
}

const Setup = props => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const scrollTo = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            console.log('Last Time')
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
                />
            </View>

            <Paginator data={slides} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo}/>
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