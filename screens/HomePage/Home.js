import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import GeneralInfo from '../../components/home/GeneralInfo'
import HeaderTabs from '../../components/home/HeaderTabs'
import MainSection from '../../components/home/MainSection'
import SearchBar from '../../components/home/SearchBar'


export default function Home({ navigation }) {

    return (
        <>
            <SafeAreaView style= {{ backgroundColor: "white", flex: 1}}>
                <View style={{backgroundColor: "white"}}>
                    <GeneralInfo navigation={navigation}></GeneralInfo>
                </View>
                <View style={{backgroundColor: "white", padding: 15}}>
                    <HeaderTabs
                        navigation = {navigation}
                    />
                    <SearchBar />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MainSection navigation={navigation}/>
                </ScrollView>
                
            </SafeAreaView>
        </>
    )
}