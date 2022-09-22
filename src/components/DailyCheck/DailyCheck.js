import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { addDailyCheck } from '../../redux/crpActions';
import { connect, useSelector } from 'react-redux';
import { classes, textColor, bgColor } from '../../../utils/theme';
import NeuMorph from '../NeuMorphComponents/NeuMorph';
import { outerShadow, textAnimation } from '../../../utils/globalAnimations';
import NeuMorphButton from '../NeuMorphComponents/NeuMorphButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BUTTONS = [
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
    }
]

const DailyCheck = ({ navigation, addDailyCheck }) => {
    const [rating, setRating] = useState(0);

    const markDone = () => {
        const dailyCheckObj = {
            date: new Date(),
            rating: rating
        };
        addDailyCheck(dailyCheckObj)
        if (rating >= 8) {
            navigation.navigate('TodaysFocus')
        } else if (rating < 8 && rating >= 6) {
            console.log("I'm sorry")
        }
    }

    return (
        <>
            <View style={[styles.contentView]}>
                <Animated.View style={{ opacity: outerShadow }}>
                    <Text style={[classes.headerText, { marginBottom: 20 }]}>
                        {"Daily Check"}
                    </Text>
                    <Text style={[classes.subText, { alignSelf: 'center', marginBottom: 20 }]}>
                        {"How are you doing today?"}
                    </Text>
                </Animated.View>

                <View style={[classes.dailyCheckButtonContainer, { marginBottom: 30 }]}>
                    {BUTTONS.map(button => {
                        return (
                            <NeuMorph height={80} width={80} key={button.id} value={button.value} containerStyle={{ margin: 12 }} pressed={rating === button.value} onPress={() => setRating(button.value)}>
                                <Animated.Text style={{ fontSize: 32, fontWeight: 'bold', color: rating === button.value ? bgColor : textColor }}>
                                    {button.value}
                                </Animated.Text>
                            </NeuMorph>
                        )
                    })}
                </View>

                <NeuMorphButton buttonText={"Done"} disabled={rating < 1} height={50} width={200} onPress={markDone} containerStyle={{ alignSelf: 'center' }} />

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    contentView: {
        padding: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
    }
});

const mapActionsToProps = {
    addDailyCheck
}

export default connect(null, mapActionsToProps)(DailyCheck);