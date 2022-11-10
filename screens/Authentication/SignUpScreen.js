import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text } from 'react-native'
import SignUp from '../../components/authentication/SignUp'

export default function SignUpScreen({route, navigation}) {
    return (
        <ScrollView>
            <SignUp route={route} navigation={navigation}/>
        </ScrollView>
    )
}
