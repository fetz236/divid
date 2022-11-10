import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text } from 'react-native'
import TrainerSchedule from '../../components/trainers/TrainerSchedule'

export default function TrainerScheduleDetail({route, navigation}) {
    return (
        <ScrollView>
            <TrainerSchedule route={route} navigation={navigation}></TrainerSchedule>
        </ScrollView>
    )
}
