import React from 'react'
import { Modal, ScrollView } from 'react-native'
import Login from '../../components/authentication/Login'

export default function LoginScreen({route, navigation}) {
    return (
        <ScrollView>
            <Login route={route} navigation={navigation}/>
        </ScrollView>
        
    )
}
