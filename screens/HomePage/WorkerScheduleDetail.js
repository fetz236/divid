import React from 'react'
import { ScrollView } from 'react-native'
import WorkerSchedule from '../../components/workers/WorkerSchedule'

export default function WorkerScheduleDetail({route, navigation}) {
    return (
        <ScrollView>
            <WorkerSchedule route={route} navigation={navigation}></WorkerSchedule>
        </ScrollView>
    )
}
