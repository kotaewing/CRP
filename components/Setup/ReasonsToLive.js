import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Icon, Button, Card } from "@rneui/themed";
import { Input, Text, FormControl } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reasonsToLive } from "../../utils/crpSetupObjects";
import { classes } from "../../utils/theme";

const MINIMUM_NUMBER = 5;

const ReasonsToLive = ({ width, done }) => {
    const [reasons, setReasons] = useState([]);

    useEffect(() => {
        savedReasons();
    }, [])

    useEffect(() => {
        if (done) {
            saveReasonsToLive();
        }
    }, [done])

    const savedReasons = async () => {
        try {
            let savedRaw = await AsyncStorage.getItem("reasonsToLive")
            let saved = JSON.parse(savedRaw)
            if (saved) {
                if (saved.length < MINIMUM_NUMBER) {
                    while (saved.length < MINIMUM_NUMBER) {
                        saved.push(reasonsToLive());
                    }
                }
            } else {
                saved = [];
                while (saved.length < MINIMUM_NUMBER) {
                    saved.push(reasonsToLive());
                }
            }

            setReasons(saved);
        } catch (err) {
            console.log(err)
        }
    }

    const addReasonToLive = () => {
        const reason = reasonsToLive();
        setReasons([...reasons, reason]);
    }

    const saveReasonsToLive = async () => {
        await AsyncStorage.setItem("reasonsToLive", JSON.stringify(reasons))
    }

    const handleChange = (text, reasonId) => {
        let newReasons = [...reasons];
        let i = newReasons.findIndex(reason => reason.id === reasonId)
        newReasons[i].reason = text;
        setReasons(newReasons);
    }

    const deleteReasonToLive = (reasonId) => {
        let newReasons = [...reasons];
        let i = newReasons.findIndex(reason => reason.id === reasonId)
        newReasons.splice(i, 1)
        setReasons(newReasons);
    }

    return (
        <View width={width}>
            <Text style={{
                paddingTop: 20,
                paddingBottom: 20,
                alignSelf: 'center',
                fontSize: 26,
                color: "#2C69B7",
                fontWeight: "bold",
                textAlign: 'center',
                fontFamily: 'Rubik_600SemiBold'
            }}>
                {"Reasons To Live"}
            </Text>
            <ScrollView>
                <FormControl>
                    {reasons.map((reason, index) => {
                        return (
                            <Card key={reason.id} containerStyle={classes.card}>
                                <Input
                                    variant={'underlined'}
                                    placeholder="Reason to Live"
                                    size={'lg'}
                                    InputRightElement={
                                        index < MINIMUM_NUMBER ?
                                            ""
                                            :
                                            <Icon
                                                name='trash'
                                                type='font-awesome'
                                                color='red'
                                                onPress={() => deleteReasonToLive(reason.id)}
                                            />
                                    }
                                    value={reason.reason}
                                    onChangeText={(e) => handleChange(e, reason.id)}
                                />
                            </Card>
                        )
                    })}
                </FormControl>

                <Button title={'Add'} buttonStyle={{ margin: 20 }} onPress={addReasonToLive} />

            </ScrollView>
        </View>
    )
}

export default ReasonsToLive;