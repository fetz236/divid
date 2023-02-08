import { View, Text } from 'react-native'
import React from 'react'
import { no_login_style } from '../../styles/userDetail/NoLoginStyle'

//No login page to warn user that they need to login
export default function NoLogin() {
  return (
    <View style={no_login_style.header_container}>
      <Text style={no_login_style.title}>Please Login to view your bookings</Text>
    </View>
  )
}