import { View, Text } from 'react-native'
import React from 'react'
import LoginAddressNeeded from '../../components/address/LoginAddressNeeded'

export default function LoginAddressNeededScreen({navigation, route}) {
  return (
    <View>
        <LoginAddressNeeded navigation={navigation}/>
    </View>
  )
}