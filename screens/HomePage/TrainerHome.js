import React from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import { View, Text } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import GeneralInfo from '../../components/home/GeneralInfo'
import SearchBar from '../../components/home/SearchBar'
import TrainerHeaderTabs from '../../components/trainers/TrainerHeaderTabs'
import TrainerItems from '../../components/trainers/TrainerItems'

export default function TrainerHome({route, navigation}) {
    return (
        <>
            <SafeAreaView style= {{ backgroundColor: "white", flex: 1}}>
                <View style={{backgroundColor: "white"}}>
                    <GeneralInfo navigation={navigation}></GeneralInfo>
                </View>
                <View style={{backgroundColor: "white", padding: 15}}>
                    <TrainerHeaderTabs
                        navigation = {navigation}
                    />
                    <SearchBar/>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TrainerItems
                        navigation = {navigation}
                    />
                </ScrollView>
                <Divider width={1}/>
            </SafeAreaView>

        </>
    )
}
