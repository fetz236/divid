import { View, Text } from 'react-native'
import React from 'react'
import CurrentAddress from '../../components/address/CurrentAddress'

export default function CurrentAddressScreen({navigation, route}) {
  return (
    <View>
      <CurrentAddress navigation={navigation} route={route}/>
    </View>
  )
}