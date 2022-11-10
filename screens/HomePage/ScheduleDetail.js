import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text } from 'react-native'
import ViewSchedule from '../../components/scheduleDetail/ViewSchedule'

export default function ScheduleDetail({route, navigation}) {
    return (
        <ScrollView>
            <ViewSchedule route={route} navigation={navigation}></ViewSchedule>
        </ScrollView>
    )
}
