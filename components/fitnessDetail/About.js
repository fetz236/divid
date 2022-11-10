import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { about_sheet } from '../../styles/fitnessDetail/AboutStyle';
import { SliderBox } from "react-native-image-slider-box";
import { db } from '../../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function About(props) {

    const fitness = 
    {
        image : props.route.params.image,
        category: props.route.params.categories,
        name: props.route.params.name,
        reviews: props.route.params.reviews,
        rating: props.route.params.rating,
    }
    
    const [working_hours, setWorkingHours] = useState([])
    const [all_dates, setAllDates] = useState([])

    const [loaded_schedule, setLoadedSchedule] = useState(false)
    
    const categories = require('../../categories.json')

    const [category_icons, setCategoryIcons] = useState([])

    const day_selector = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    useEffect(async() => {
        const loadSchedule = () => {
            let schedule_data = []
            let wo_data = []
            db.collection('schedule').where("fc", "==", props.route.params.id).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id
                    if (data.day){
                        schedule_data.push(data)
                    }
                    wo_data.push(data)
                })
            }).then(function(){
                schedule_data.sort((a,b) => a.day-b.day)
                setWorkingHours(schedule_data)
                setAllDates(all_dates)
            }
            ).catch(err => alert(err))
        }

        const getCategories = () => {
            let category_images = []

            for(let i=0; i<categories.length; i++){
                for(let j=0; j<fitness.category.length; j++){
                    if (categories[i].__id__ == fitness.category[j]){
                        category_images.push(categories[i])
                    }
                }
            }
            setCategoryIcons(category_images)
        }
        if (working_hours.length==0){
            await loadSchedule()
            await getCategories()
            setLoadedSchedule(true)

        }

    }, [])
    
    return (
        <View>
            <View style={about_sheet.about_full_container}>
                <FitnessImage image={fitness.image}/>
                <FitnessTitle name={fitness.name} category_icons={category_icons}></FitnessTitle>
                { loaded_schedule &&
                <FitnessDescription description={fitness.description} working_hours={working_hours}
                 day_selector={day_selector}></FitnessDescription>
                }
            </View> 
        </View>
    )
}

const FitnessImage = (props) =>(
    <SliderBox images={props.image} style={about_sheet.about_img}/>
)

const FitnessTitle = (props)=>(
    <View>
        <Text style={about_sheet.about_title}>{props.name}</Text> 
        <FitnessCategories category_icons={props.category_icons}/>
    </View>
    
)

//

const FitnessDescription = (props) => (
    <View style={{flexDirection:'row', flexWrap:'wrap', marginLeft:'3%',}}>
        {props.working_hours.map((wo, index)=> (
            <View key={index} style={about_sheet.opening_hours}>
                    <View style={about_sheet.wo_item}>
                        <Text style={about_sheet.wo_text}>{props.day_selector[wo.day]} </Text> 
                        <Text style={about_sheet.wo_text}>{wo.start_time[0]}{wo.start_time[1]}:{wo.start_time[2]}{wo.start_time[3]}
                        -{wo.end_time[0]}{wo.end_time[1]}:{wo.end_time[2]}{wo.end_time[3]}</Text>
                    </View>
            </View>
        ))}

    </View>
)
 
const FitnessCategories = (props) => (
    <View style={about_sheet.about_category}>
        {props.category_icons.map((cat, index) => (
            <View key={index} style={about_sheet.wo_item}>
                <MaterialCommunityIcons name={cat.icon_name} size={25} color={'#8d8d8d'}/>
            </View>
        ))}
    </View>
)