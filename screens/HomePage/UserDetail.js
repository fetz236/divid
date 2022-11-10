import React from 'react'
import { View, Text } from 'react-native'
import UserInfo from '../../components/userDetail/UserInfo'

export default function UserDetail({route, navigation}) {
    return (
        <View>
            <UserInfo navigation={navigation} route={route}></UserInfo>
        </View>
    )
}
