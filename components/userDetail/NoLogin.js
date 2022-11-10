import { View, Text } from 'react-native'
import React from 'react'
import { no_login_style } from '../../styles/upcoming/NoLoginStyle'

export default function NoLogin() {
  return (
    <View style={no_login_style.header_container}>
      <Text style={no_login_style.title}>Please Login to view your bookings</Text>
    </View>
  )
}