import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import AddAddress from '../../components/address/AddAddress'
import { add_address_style } from '../../styles/address/AddAddressStyle'

/**
 * This address screen is used as another stack in our app
 * It helps with calling this modal anywhere in the app to ease the utilisation of the app
 */
export default function AddAddressScreen({route, navigation}) {
  return (
    <ScrollView style={add_address_style.screen_container}>
        <AddAddress route={route} navigation={navigation}/>
    </ScrollView>
  )
}