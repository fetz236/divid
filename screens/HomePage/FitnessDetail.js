import React from 'react'
import { ScrollView } from 'react-native'
import CourseItems from '../../components/fitnessDetail/CourseItems'

 
export default function FitnessDetail({route, navigation}) {
    return (
        <ScrollView style={{backgroundColor:'white'}}>
            <CourseItems navigation={navigation} route = {route}></CourseItems>
        </ScrollView>
    )
}
