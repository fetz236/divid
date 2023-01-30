import React from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import { View } from 'react-native'
import GeneralInfo from '../../components/workers/GeneralInfo'
import WorkerItems from '../../components/workers/WorkerItems'

/*

This is the home page for all workers that will be present in the databse

*/
export default function WorkerHome({route, navigation}) {
    return (
        <>
            <SafeAreaView style= {{ backgroundColor: "white", flex: 1}}>
                <View style={{backgroundColor: "white"}}>
                    <GeneralInfo navigation={navigation}/>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <WorkerItems
                        navigation = {navigation}
                    />
                </ScrollView>
            </SafeAreaView>

        </>
    )
}
