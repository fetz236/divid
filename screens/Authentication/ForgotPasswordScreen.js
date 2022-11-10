import React from 'react'
import { ScrollView } from 'react-native'
import ForgotPassword from '../../components/authentication/ForgotPassword'

export default function ForgotPasswordScreen({route, navigation}) {
    return (
        <ScrollView>
            <ForgotPassword route={route} navigation={navigation}/>
        </ScrollView>
    )
}
