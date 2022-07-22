import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Icon, Button, Card } from "@rneui/themed";
import { Input, Text, FormControl } from "native-base";
import { personalWarnings } from "../../../utils/crpSetupObjects";
import { classes } from "../../../utils/theme";
import { useSelector, connect } from "react-redux";
import { setWarnings } from "../../redux/crpActions";

const MINIMUM_NUMBER = 5;

const PersonalWarnings = ({ setWarnings, width, done }) => {
    const { warnings } = useSelector(state => state.crpReducer)

    useEffect(() => {
        savedWarnings();
    }, [])

    useEffect(() => {

    }, [done])

    const savedWarnings = async () => {
        try {
            let saved = JSON.parse(JSON.stringify(warnings))
            if (saved) {
                if (saved.length < MINIMUM_NUMBER) {
                    while (saved.length < MINIMUM_NUMBER) {
                        saved.push(personalWarnings());
                    }
                }
            } else {
                saved = [];
                while (saved.length < MINIMUM_NUMBER) {
                    saved.push(personalWarnings());
                }
            }

            setWarnings(saved);
        } catch (err) {
            console.log(err)
        }
    }

    const addWarningSign = () => {
        const warning = personalWarnings();
        setWarnings([...warnings, warning]);
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
                {"Personal Warning Signs"}
            </Text>
            <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true}>
                <FormControl>
                    {warnings.map((warning, index) => {
                        return (
                            <Card key={warning.id} containerStyle={classes.card}>
                                <Input
                                    variant={'underlined'}
                                    placeholder="Warning Sign"
                                    size={'lg'}
                                    InputRightElement={
                                        index < MINIMUM_NUMBER ?
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

            </ScrollView>
        </View>
    )
}

const mapActionsToProps = {
    setWarnings
}

export default connect(null, mapActionsToProps)(PersonalWarnings);