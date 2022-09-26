import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider, Text, Icon, Button, Card } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { classes } from '../../../utils/theme';
import { addDailyCheck } from '../../redux/crpActions';
import { connect, useSelector } from 'react-redux';

const RATINGS = [
    {
        id: 1,
        value: 1
    },
    {
        id: 2,
        value: 2
    },
    {
        id: 3,
        value: 3
    },
    {
        id: 4,
        value: 4
    },
    {
        id: 5,
        value: 5
    },
    {
        id: 6,
        value: 6
    },
    {
        id: 7,
        value: 7
    },
    {
        id: 8,
        value: 8
    },
    {
        id: 9,
        value: 9
    },
    {
        id: 10,
        value: 10
    },
]

const DailyCheck = ({ navigation, addDailyCheck }) => {
    const [rating, setRating] = useState(0);
    const { dailyChecks } = useSelector(state => state.crpReducer);

    const markDone = () => {
        const newRating = { rating, date: new Date() };
        const oldRatings = dailyChecks ? JSON.parse(JSON.stringify(dailyChecks)) : []
        addDailyCheck([...oldRatings, newRating]);
        if (rating >= 8) {
            navigation.navigate('TodaysFocus')
        } else if (rating < 8 && rating >= 6) {

        }
    }

    return (
        <View style={[styles.contentView]}>
            <Text style={{
                paddingBottom: 20,
                alignSelf: 'center',
                fontSize: 20,
                fontWeight: "bold",
                textAlign: 'center'
            }}>
                {"How are you feeling today? Rate yourself on a scale of 1-10 and see what we suggest you focus on today"}
            </Text>
            <View style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 30
            }}>
                {RATINGS.map(button => {
                    return (
                        <Button
                            key={button.id}
                            title={<Text style={{ fontSize: 30, color: rating === button.value ? "white" : 'black' }}>{button.value}</Text>}

                            buttonStyle={[classes.card, {
                                height: 80, width: 80, borderRadius: 50, margin: 12
                            }]}
                            onPress={() => setRating(button.value)}
                            color={rating === button.value ? "#2C69B7" : '#d5d5dd'}
                        />
                    )
                })}
            </View>
            <Button
                title={"Done"}
                type="solid"
                color={"#2C69B7"}
                buttonStyle={{ borderRadius: 50, marginTop: 10, width: 200, alignSelf: 'center' }}
                onPress={markDone}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        padding: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch'
    }
});

const mapActionsToProps = {
    addDailyCheck
}

export default connect(null, mapActionsToProps)(DailyCheck);