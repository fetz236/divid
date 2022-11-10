import React from 'react'
import DisplayCategories from '../../components/search_section/displayCategories/DisplayCategories'
import { ScrollView } from 'react-native-gesture-handler'

export default function DisplayCategoriesScreen({route, navigation}) {
  return (
    <ScrollView>
        <DisplayCategories route={route} navigation={navigation}/>
    </ScrollView>
  )
}