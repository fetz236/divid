import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux'
import { db } from '../../firebase';
import { course_sheet } from '../../styles/fitnessDetail/CourseItemsStyle';
import { about_sheet } from '../../styles/fitnessDetail/AboutStyle';
import { SliderBox } from "react-native-image-slider-box";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CourseItems({navigation, ...props}) {
    

    const fitness = 
    {
        image : props.route.params.image,
        category: props.route.params.categories,
        name: props.route.params.name,
        reviews: props.route.params.reviews,
        rating: props.route.params.rating,
    }
    
    const [working_hours, setWorkingHours] = useState([])
    const [all_closed_days, setAllClosedDays] = useState([])
    const [alerted_closed_days, setAlertedDays] = useState([])

    const [loaded_schedule, setLoadedSchedule] = useState(false)
    const [datesClosed, setDatesClosed] = useState(false)

    const categories = require('../../categories.json')

    const [category_icons, setCategoryIcons] = useState([])

    const day_selector = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    useEffect(async() => {
        const loadSchedule = () => {
            let schedule_data = []
            let temp_closed_days = []
            let alerted_days = []

            db.collection('schedule').where("fc", "==", props.route.params.id).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id
                    if (data.day){
                        schedule_data.push(data)
                    }
                    else{
                        temp_closed_days.push(data)
                    }
                })
            }).then(function(){
                schedule_data.sort((a,b) => a.day-b.day)
                let today = new Date()

                for (let i =0; i<temp_closed_days.length; i++){
                    let toDate = new Date(temp_closed_days[i].date)
                    let diffDays = toDate.getDate()-today.getDate()
                    if (diffDays <=7 && diffDays >=0){
                        alerted_days.push(temp_closed_days[i])
                        setDatesClosed(true)
                    }
                }
                
            }).then(function(){
                setWorkingHours(schedule_data)
                setAllClosedDays(temp_closed_days)
                setAlertedDays(alerted_days)
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

    const fc = {
        id: props.route.params.id,
        name: props.route.params.name,
        image: props.route.params.image,
        reviews: props.route.params.reviews,
        rating: props.route.params.rating,
        location: props.route.params.location, 
        subscription: props.route.params.subscription,
        telephone_number: props.route.params.telephone_number,
        categories: props.route.params.categories,
    }

    const dispatch = useDispatch();
    
    const select_item = (item) => dispatch({
        type: 'ADD_TO_CART',
        payload: item,
    });

    const [classes, setClasses] = useState([])
    const [loaded_classes, setLoadedClasses] = useState(false)

    
    useEffect( async() => {
        const loadData = async() => {
            let class_data = []
            db.collection('classes').where("fc", "==", fc.id).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id
                    class_data.push(data)
                })
            }).then(function(){
                setClasses(class_data)
                setLoadedClasses(true)
            }
            ).catch(err => alert(err))
            
        }

        if (classes.length == 0){
            await loadData()
        }
    }, [])

    return (
        <> 
            { loaded_classes && 
                <>
                    <About fitness={fitness} category_icons={category_icons} loaded_schedule={loaded_schedule}
                        working_hours={working_hours} day_selector={day_selector} 
                        datesClosed={datesClosed} alerted_closed_days={alerted_closed_days}
                    />
                    <Divider width={1.8} style={{marginVertical:20}}/>
                    <MainComponent navigation={navigation} classes={classes} fc={fc}
                    all_closed_days={all_closed_days}
                    />
                </>
            }
        </>
    )
}

const About = (props) =>(
    <View>
        <View style={about_sheet.about_full_container}>
            <FitnessImage image={props.fitness.image}/>
            <FitnessTitle name={props.fitness.name} category_icons={props.category_icons}></FitnessTitle>
            {
                props.datesClosed && 
                <AlertClosedDays alerted_closed_days={props.alerted_closed_days}/>
            }
            { props.loaded_schedule &&
            <FitnessDescription description={props.fitness.description} working_hours={props.working_hours}
            day_selector={props.day_selector}></FitnessDescription>
            }
        </View> 
    </View>
)

const AlertClosedDays = (props) => (
    <View style={about_sheet.about_cd_backg}>
        <View style={about_sheet.about_alert_view}>
            <Text style={{color:'white'}}> The Gym is closed on these date(s): 
                {props.alerted_closed_days.map((cd, index) => (
                        <Text key={index}> {cd.date}</Text>
                ))}
            </Text>
        </View>
    </View>
)

const MainComponent = (props) => (
    <View style={{backgroundColor: 'white'}} showsVerticalScrollIndicator={false}>
        {props.classes.map((course, index) => (
            <TouchableOpacity activeOpacity={1} style={{
                }}
                key={index}
                onPress={() => props.navigation.navigate("ScheduleDetail", {
                    class: {
                        id: course.id,
                        name: course.name,
                        image: course.image,
                        price: course.price,
                        description: course.description,
                        curr_cap: course.curr_cap,
                        max_cap: course.max_cap,
                        categories: course.categories,
                        closed_days: props.all_closed_days
                    },
                    fc:props.fc,
                    navigation: props.navigation,
                }
            )}>
                <View style ={{marginBottom:10}}>
                    <View style={course_sheet.course_item}>
                        <CourseInfo course_details={course}/>
                        <CourseImage course_details={course}/>
                    </View>
                    <Divider width={0.5} orientation="vertical" style={{marginTop:5}}/>

                </View>
            </TouchableOpacity>
        ))}
    </View>
)


const CourseInfo = (props) => (
    <View style={{width:240, justifyContent:"space-evenly"}}>
        <Text style={course_sheet.course_title}>{props.course_details.name}</Text>
        <Text style={course_sheet.course_text}>{props.course_details.description}</Text>
        <Text style={course_sheet.course_text}>£{(props.course_details.price / 100).toFixed(2)}</Text>

    </View>
)

const CourseImage = (props) => (
    <View>
        <Image source={{ uri:props.course_details.image}} style={course_sheet.course_image}/>
    </View>
)


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