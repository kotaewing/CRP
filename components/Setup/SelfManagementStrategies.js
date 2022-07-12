import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Icon, Button, Card } from "@rneui/themed";
import { Input, Text, FormControl } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selfManagement } from "../../utils/crpSetupObjects";


const SelfManagementStrategies = () => {
    const [strategies, setStrategies] = useState([]);

    useEffect(() => {
        savedStrategies();
    }, [])

    const savedStrategies = async () => {
        let savedRaw = await AsyncStorage.getItem("selfManagementStrategies")
        let saved = JSON.parse(savedRaw)
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

    const saveStrategies = async () => {
        await AsyncStorage.setItem("selfManagementStrategies", JSON.stringify(strategies))
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
                {"Self Management Strategies"}
            </Text>
            <FormControl>

                {strategies.map((strategy, index) => {
                    return (
                        <Card key={strategy.id} containerStyle={{ borderRadius: 15, borderColor: 'transparent'}}>
                            <Input
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
            <Button title={'Done'} buttonStyle={{ margin: 20 }} onPress={saveStrategies} />
        </ScrollView>
    )
}

export default SelfManagementStrategies;