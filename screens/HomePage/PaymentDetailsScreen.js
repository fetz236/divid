import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import PaymentDetails from '../../components/userDetail/PaymentDetails'

 
export default function PaymentDetailsScreen({route, navigation}) {
    return (
        <ScrollView style={{backgroundColor:'white'}}>
            <PaymentDetails/>
        </ScrollView>
    )
}
