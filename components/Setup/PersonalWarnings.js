import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Icon, Button, Card } from "@rneui/themed";
import { Input, Text, FormControl } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { personalWarnings } from "../../utils/crpSetupObjects";


const PersonalWarnings = ({ navigation }) => {
    const [warnings, setWarnings] = useState([]);

    useEffect(() => {
        savedWarnings();
    }, [])

    const savedWarnings = async () => {
        let savedRaw = await AsyncStorage.getItem("warningSigns")
        let saved = JSON.parse(savedRaw)
        if (saved) {
            if (saved.length < 5) {
                while (saved.length < 5) {
                    saved.push(personalWarnings());
                }
            }
        } else {
            saved = [];
            while (saved.length < 5) {
                saved.push(personalWarnings());
            }
        }

        setWarnings(saved);
    }

    const addWarningSign = () => {
        const warning = personalWarnings();
        setWarnings([...warnings, warning]);
    }

    const saveWarningSigns = async () => {
        await AsyncStorage.setItem("warningSigns", JSON.stringify(warnings))
        navigation.navigate('Self Management Strategies')
    }

    const handleChange = (text, warningId) => {
        let newWarnings = [...warnings];
        let i = newWarnings.findIndex(warning => warning.id === warningId)
        newWarnings[i].warning = text;
        setWarnings(newWarnings);
    }

    const deleteWarningSign = (warningId) => {
        let newWarnings = [...warnings];
        let i = newWarnings.findIndex(warning => warning.id === warningId)
        newWarnings.splice(i, 1)
        setWarnings(newWarnings);
    }

    return (
        <ScrollView>
            <Text style={{
                paddingTop: 20,
                paddingBottom: 20,
                alignSelf: 'center',
                fontSize: 26,
                color: "#2C69B7",
                fontWeight: "bold",
                textAlign: 'center'
            }}>
                {"Personal Warning Signs"}
            </Text>
            <FormControl>

                {warnings.map((warning, index) => {
                    return (
                        <Card key={warning.id} containerStyle={{ borderRadius: 15, borderColor: 'transparent'}}>
                            <Input
                                placeholder="Warning Sign"
                                size={'lg'}
                                InputRightElement={
                                    index < 5 ?
                                        ""
                                        :
                                        <Icon
                                            name='trash'
                                            type='font-awesome'
                                            color='red'
                                            onPress={() => deleteWarningSign(warning.id)}
                                        />
                                }
                                value={warning.warning}
                                onChangeText={(e) => handleChange(e, warning.id)}
                            />
                        </Card>
                    )
                })}
            </FormControl>

            <Button title={'Add'} buttonStyle={{ margin: 20 }} onPress={addWarningSign} />
            <Button title={'Done'} buttonStyle={{ margin: 20 }} onPress={saveWarningSigns} />
        </ScrollView>
    )
}

export default PersonalWarnings;