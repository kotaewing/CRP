import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider, Text, Icon, Button } from '@rneui/themed';
import { addDailyCheck } from '../../redux/crpActions';
import { connect, useSelector } from 'react-redux';

const TodaysFocus = ({ navigation, addDailyCheck }) => {
    const [rating, setRating] = useState(0);
    const { dailyChecks } = useSelector(state => state.crp)

    // useEffect(() => {
        
    //     if (dailyChecks.date.toLocaleDateString() === new Date.toLocaleDateString()) {
    //         navigation.navigate("DailyCheck")
    //     }
    // }, [])

    const markDone = () => {
        const dailyCheckObj = {
            date: new Date(),
            rating: rating
        };
        addDailyCheck(dailyCheckObj)
        if (rating >= 8) {
            navigation.navigate('Home')
        } else if (rating < 8 && rating >= 6) {
            alert("I'm sorry")
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
                    {"Today's Focus"}
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

const mapActionsToProps = {
    addDailyCheck
}

export default connect(null, mapActionsToProps)(TodaysFocus);