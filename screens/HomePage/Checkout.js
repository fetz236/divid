import { StripeProvider } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { View, Text } from 'react-native'
import CheckoutPage from '../../components/checkout/CheckoutPage'

export default function Checkout({route, navigation}) {
    const [publishableKey, setPublishableKey] = useState("pk_test_51LuD3PIrAL49R4x55Eydaob8p1oJIHSO8C20xSX9xMVXX7URNA9AaWdGz6n5fN2LVNmAMDmwh8Q7K4JpYHNY0L5200B2LVsbdU")

    return (
        <StripeProvider
        publishableKey={publishableKey}
            //merchantIdentifier="merchant.identifier" // required for Apple Pay
            //urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            >
            <ScrollView>
                
                    <CheckoutPage navigation={navigation} route={route}></CheckoutPage>
            </ScrollView>
        </StripeProvider>
    )
}
