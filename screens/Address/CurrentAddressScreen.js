import React from 'react'
import CurrentAddress from '../../components/address/CurrentAddress'
import { current_address_style } from '../../styles/address/CurrentAddressStyle'
import { ScrollView } from 'react-native-gesture-handler'

export default function CurrentAddressScreen({navigation, route}) {
  return (
    <ScrollView style={current_address_style.screen_container}>
      <CurrentAddress navigation={navigation} route={route}/>
    </ScrollView>
  )
}