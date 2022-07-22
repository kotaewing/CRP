import { useEffect } from "react";
import { ScrollView } from "react-native";
import { Icon, Button, Card } from "@rneui/themed";
import { Input, Text, FormControl } from "native-base";
import { selfManagement } from "../../../utils/crpSetupObjects";
import { classes } from "../../../utils/theme";
import { connect, useSelector } from "react-redux";
import { setStrategies } from "../../redux/crpActions";

const SelfManagementStrategies = ({ setStrategies, width, done }) => {
    const { strategies } = useSelector(state => state.crpReducer);

    useEffect(() => {
        savedStrategies();
    }, [])

    useEffect(() => {
        
    }, [done])

    const savedStrategies = async () => {
        let saved = JSON.parse(JSON.stringify(strategies))
        if (saved) {
            if (saved.length < 3) {
                while (saved.length < 3) {
                    saved.push(selfManagement());
                }
            }
        } else {
            saved = [];
            while (saved.length < 3) {
                saved.push(selfManagement());
            }
        }

        setStrategies(saved);
    }

    const addStrategy = () => {
        const strategy = selfManagement();
        setStrategies([...strategies, strategy]);
    }

    const handleChange = (text, strategyId) => {
        let newStrategies = [...strategies];
        let i = newStrategies.findIndex(strategy => strategy.id === strategyId)
        newStrategies[i].strategy = text;
        setStrategies(newStrategies);
    }

    const deleteStrategy = (strategyId) => {
        let newStrategies = [...strategies];
        let i = newStrategies.findIndex(strategy => strategy.id === strategyId)
        newStrategies.splice(i, 1)
        setStrategies(newStrategies);
    }

    return (

        <ScrollView style={{ width }}>
            <Text style={{
                paddingTop: 20,
                paddingBottom: 20,
                alignSelf: 'center',
                fontSize: 26,
                color: "#2C69B7",
                fontWeight: "bold",
                textAlign: 'center'
            }}>
                {"Self Management Strategies"}
            </Text>
            <FormControl>

                {strategies.map((strategy, index) => {
                    return (

                        <Card key={strategy.id} containerStyle={classes.card}>
                            <Input
                                variant='underlined '
                                placeholder="Strategy"
                                size={'lg'}
                                InputRightElement={
                                    index < 3 ?
                                        ""
                                        :
                                        <Icon
                                            name='trash'
                                            type='font-awesome'
                                            color='red'
                                            onPress={() => deleteStrategy(strategy.id)}
                                        />
                                }
                                value={strategy.strategy}
                                onChangeText={(e) => handleChange(e, strategy.id)}
                            />
                        </Card>
                    )
                })}
            </FormControl>

            <Button title={'Add'} buttonStyle={{ margin: 20 }} onPress={addStrategy} />

        </ScrollView>
    )
}

const mapActionsToProps = {
    setStrategies
}

export default connect(null, mapActionsToProps)(SelfManagementStrategies);