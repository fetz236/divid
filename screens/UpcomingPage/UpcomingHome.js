import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import Upcoming from '../../components/upcoming/Upcoming'
import { auth } from '../../firebase'
import NoLogin from '../../components/userDetail/NoLogin'

export default function UpcomingHome({navigation}) {

    
    return(
        <ScrollView>
            <SafeAreaView>
                    <Upcoming navigation={navigation}/>
            </SafeAreaView>
        </ScrollView>
        
        )
    
}
