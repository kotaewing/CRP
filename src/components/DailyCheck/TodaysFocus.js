import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider, Text, Icon, Button, Card } from '@rneui/themed';
import { addDailyCheck } from '../../redux/crpActions';
import { connect, useSelector } from 'react-redux';
import { classes } from '../../../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RATING_TEXT_DICT = {
    1: {
        mainText: ""
    },
    2: {
        mainText: ""
    },
    3: {
        mainText: ""
    },
    4: {
        mainText: ""
    },
    5: {
        mainText: ""
    },
    6: {
        mainText: ""
    },
    7: {
        mainText: ""
    },
    8: {
        mainText: "It seems like maybe today was a little hard, remember that these are some things that can help you out!",
        element: "strategies",
        header: "Slef Management Strategies"
    },
    9: {
        mainText: "",
        element: "warnings",
        header: "Personal Warning Signs"
    },
    10: {
        mainText: "Glad to see things are going good! Just be on the lookout for any of these warning signs so we can make sure we keep you feeling your best",
        element: "warnings",
        header: "Personal Warning Signs"
    },
}

const TodaysFocus = ({ navigation, addDailyCheck, resetState }) => {
    const [rating, setRating] = useState(0);
    const [todaysFocus, setTodaysFocus] = useState(null);
    const { dailyChecks, warnings, strategies } = useSelector(state => state.crpReducer)

    useEffect(() => {
        const lookupElement = {
            warnings,
            strategies
        }

        // const todaysRating = dailyChecks.find(check => new Date(check.date).toLocaleDateString() === new Date().toLocaleDateString());
        const todaysRating = dailyChecks[dailyChecks.length - 1];
        setTodaysFocus({
            message: RATING_TEXT_DICT[todaysRating.rating],
            element: lookupElement[RATING_TEXT_DICT[todaysRating.rating].element]
        })
    }, [])

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
                    paddingTop: 50,
                    paddingBottom: 20,
                    alignSelf: 'center',
                    fontSize: 20,
                    fontWeight: "bold"
                }}
                >
                    {todaysFocus ? todaysFocus.message.mainText : ""}
                </Text>
                <Card containerStyle={[classes.card, { backgroundColor: "#2C69B7" }]}>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: 'center',
                        fontFamily: 'Rubik_600SemiBold',
                        marginBottom: 10,
                        color: 'white'
                    }}>
                        {todaysFocus && todaysFocus.message.header}
                    </Text>
                    {todaysFocus && todaysFocus.element.map(element => {
                        return (
                            <Text key={element.id} style={{ color: 'white' }} >{element.text}</Text>
                        )
                    })}
                </Card>
                <Button
                    title={"Done"}
                    type="solid"
                    color={"#2C69B7"}
                    buttonStyle={{ borderRadius: 50, marginTop: 50 }}
                    onPress={resetState}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    contentView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingHorizontal: 10
    }
});

const mapActionsToProps = {
    addDailyCheck
}

export default connect(null, mapActionsToProps)(TodaysFocus);