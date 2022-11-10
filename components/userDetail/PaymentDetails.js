import { View, Text } from 'react-native'
import React from 'react'
import { payment_details_style } from '../../styles/userDetail/PaymentDetailsStyle'

export default function PaymentDetails() {
  return (
    <View style={payment_details_style.main_container}>
      <Text style={payment_details_style.title}>Add a New Payment Method</Text>
    </View>
  )
}