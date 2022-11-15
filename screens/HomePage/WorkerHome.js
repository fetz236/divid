import React from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import { View } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import SearchBar from '../../components/workers/SearchBar'
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
                    <GeneralInfo navigation={navigation}></GeneralInfo>
                </View>
                <View style={{backgroundColor: "white", padding: 15}}>
                    <SearchBar/>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <WorkerItems
                        navigation = {navigation}
                    />
                </ScrollView>
                <Divider width={1}/>
            </SafeAreaView>

        </>
    )
}
