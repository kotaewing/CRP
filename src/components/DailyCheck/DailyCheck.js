import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider, Text, Icon, Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DailyCheck = ({ navigation }) => {
    const [rating, setRating] = useState(0);

    const markDone = async () => {
        await AsyncStorage.setItem(new Date().toDateString(), rating.toString())
        if (rating >= 8) {
            navigation.navigate('Home')
        } else if (rating < 8 && rating >= 6) {

        }
    }

    return (
        <>
            <View style={[styles.contentView]}>
                <Text style={{
                    paddingBottom: 20,
                    alignSelf: 'center',
                    fontSize: 26,
                    color: "#2C69B7",
                    fontWeight: "bold",
                    textAlign: 'center'
                }}>
                    {"On a scale of 1-10, how would you rate yourself today?"}
                </Text>
                <Text style={{
                    paddingBottom: 20,
                    alignSelf: 'center',
                    fontSize: 30,
                    color: "#2C69B7",
                    fontWeight: "bold"
                }}
                >
                    {rating}
                </Text>
                <Slider
                    value={rating}
                    onValueChange={setRating}
                    maximumValue={10}
                    minimumValue={1}
                    step={1}
                    allowTouchTrack
                    trackStyle={{ height: 10, borderRadius: 20, backgroundColor: "#2C69B7" }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: 'red' }}
                    thumbProps={{
                        children: (
                            <Icon
                                size={30}
                                reverse
                                containerStyle={{ bottom: 30, right: 30 }}
                                color={"#2C69B7"}
                            />
                        ),
                    }}
                />
                <Button
                    title={"Done"}
                    type="solid"
                    color={"#2C69B7"}
                    buttonStyle={{ borderRadius: 50, marginTop: 50 }}
                    onPress={markDone}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    contentView: {
        padding: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch'
    }
});

export default DailyCheck;