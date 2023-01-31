import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {worker_style, worker_schedule} from '../../styles/workers/ViewWorkerStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ViewWorker({ navigation, ...props }){

    const worker = {
        first_name: props.route.params.first_name,
        last_name: props.route.params.last_name,
        id: props.route.params.id,
        categories: props.route.params.categories,
        mobile: props.route.params.mobile,
        mobile_calling_code: props.route.params.mobile_calling_code,
        location: props.route.params.location,
        description: props.route.params.description,
        price: props.route.params.price,
        photoURL: props.route.params.photoURL,
        rating: props.route.params.rating,
        reviews: props.route.params.reviews,
        services: props.route.params.services,
    }


    const categories = require('../../categories.json')
    const services = require('../../services.json')

    const [skills, setSkills] = useState([])
    const [my_services, setMyServices] = useState([])
    
    useEffect(() => {
        const getCategories = () => {
            let worker_skills = []
            let worker_services = []

            //Get categories from json and match all necessary ones the individual provides
            // HIGHER LEVEL
            for(let i=0; i<categories.length; i++){
                for(let j=0; j<worker.categories.length; j++){
                    if (categories[i].__id__ == worker.categories[j]){
                        worker_skills.push(categories[i])
                    }
                }
            }

            //Get services from json and match all necessary ones the individual provides
            // LOWER LEVEL
            for(let i=0; i<services.length; i++){
                for(let j=0; j<worker.services.length; j++){
                    if (services[i].__id__ == worker.services[j]){
                        worker_services.push(services[i])
                    }
                }
            }
            setSkills(worker_skills)
            setMyServices(worker_services)
        }
        getCategories()
    }, [])

    return (
        <View>
            <View>
                <ScrollView>
                <WorkerImage photoURL={worker.photoURL} rating={worker.rating} reviews={worker.reviews}></WorkerImage>
                <WorkerDetails name = {worker.first_name+ " "+ worker.last_name} description={worker.description} ></WorkerDetails>
                <WorkerAbout skills={skills}/>
                <WorkerServices my_services={my_services}/>
                <View style={
                    worker_schedule.schedule_container
                }>
                    <View style={
                        worker_schedule.schedule_button_style
                    }>
                        <TouchableOpacity style={
                            worker_schedule.touchable_opacity
                        }
                        onPress={() => navigation.navigate("WorkerScheduleDetail", {
                            worker: worker,
                        }
                        )}>
                            <Text style={
                                worker_schedule.button_text
                            }> View Schedule </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </View>
        </View>
    )
}

const WorkerImage = (props) => (
    <>
    <Image style={
        worker_style.worker_image
    }source={{uri: props.photoURL}}></Image>
    <View style={
        worker_style.worker_rating
    }>
        <Rating type='custom' ratingCount={5} startingValue={props.rating} imageSize={25} tintColor='#f2f2f2' readonly
        style={{
            marginTop:"5%",
        }}> </Rating>
    </View>
    <View style={worker_style.worker_rating}>
        <Text style={worker_style.rating_body}> {props.reviews} Reviews</Text>
    </View>

    </>
);

const WorkerDetails = (props) => (
    <View>
        <Text style={worker_style.worker_header}>{props.name}</Text>
        <View style={worker_style.container_view}>
            <Text style={worker_style.worker_body}>{props.description}</Text>
        </View>
    </View>
);


const WorkerAbout = (props) => (
    <View>
        <Text style={worker_style.worker_header}>My Skills</Text>
        <View style={worker_style.text_view}>
            <View style={worker_style.text_sub_view}>
                <View style={worker_style.sub_view_item}>
                    {props.skills.map((skill,index) => (
                        <View style={worker_style.skill} key={index}>
                            <Text style={worker_style.about_text}>{skill.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    </View>
);

//View worker services
const WorkerServices = (props) => (
    <View>
        <Text style={worker_style.worker_header}>Available Services</Text>
        <View style={worker_style.text_view}>
            <View style={worker_style.text_sub_view}>
                <View style={worker_style.sub_view_item}>
                    {props.my_services.map((service,index) => (
                        <View style={worker_style.service} key={index}>
                            <MaterialCommunityIcons name={service.icon_name} size={20}/>
                            <Text style={worker_style.services_text}>{service.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    </View>
)