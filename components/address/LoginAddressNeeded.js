import { View, Text } from 'react-native'
import React from 'react'
import { login_address_needed } from '../../styles/address/LoginAddressNeededStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function LoginAddressNeeded({navigation, ...props}) {
  return (
    <>
        <MaterialCommunityIcons name="close" color='#d95a00' size={50} style={login_address_needed.close_button} 
                onPress={()=> navigation.goBack()}
            /> 
        <View style={login_address_needed.main_container}>
            <Text style={login_address_needed.title}> Please login to view your current addresses</Text>
        </View>
    </>

  )
}