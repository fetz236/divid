import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { fitness_schedule } from '../../styles/fitnessDetail/ViewFitnessScheduleStyle'

export default function ViewCart() {
    return (
        <View style={fitness_schedule.button_container}>
            <View style={{
                flexDirection:'row',
                justifyContent: 'center',
                width: "100%",
            }}>
                <TouchableOpacity style={fitness_schedule.button_main}>
                    <Text style={fitness_schedule.button_text}> View Schedule </Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}
