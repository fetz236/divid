import React from 'react'
import { View, Text} from 'react-native'
import ViewTrainer from '../../components/trainers/ViewTrainer'

 
export default function TrainerDetail({route, navigation}) {
    return (
        <View>
            <ViewTrainer route={route} navigation={navigation}/>
        </View>
    )
}
