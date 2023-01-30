import { StripeProvider } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import CheckoutPage from '../../components/checkout/CheckoutPage'

export default function Checkout({route, navigation}) {
    const [publishableKey, setPublishableKey] = useState("pk_test_51M2bNQKcu8s2d1dKfVczSUAwyemIRKj28hvrYTGXlYnoVFJkQUCpZamB7znHUEl61XQvQUnr8sQxoKqUvONxak6R00nNz8L9hk")

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
