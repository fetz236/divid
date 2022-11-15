import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';

import {worker_style, worker_schedule} from '../../styles/workers/ViewWorkerStyle'
import MapView, { Marker } from 'react-native-maps';

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
    }


    const categories = require('../../categories.json')

    const [skills, setSkills] = useState([])

    useEffect(() => {
        const getCategories = () => {
            let worker_skills = []

            for(let i=0; i<categories.length; i++){
                for(let j=0; j<worker.categories.length; j++){
                    if (categories[i].__id__ == worker.categories[j]){
                        worker_skills.push(categories[i])
                    }
                }
            }
            setSkills(worker_skills)
        }
    
        getCategories()
    }, [])
    
    return (
        <View>
            <View>
                <ScrollView>
                <WorkerImage photoURL={worker.photoURL} rating={worker.rating} reviews={worker.reviews}></WorkerImage>
                <WorkerDetails name = {worker.first_name+ " "+ worker.last_name} description={worker.description} ></WorkerDetails>
                <WorkerAbout skills={skills}></WorkerAbout>
                <WorkerLocations worker={worker}></WorkerLocations>
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
//Needs to account for private gym radius in the future radius or zones
const WorkerLocations = (props) => (
    <View style={worker_style.location_box}>
        <Text style={worker_style.worker_header}>My Gym Partner</Text>
        <MapView
            style={worker_style.map_location_box}
            showsUserLocation={true}
            region={{
            latitude: props.worker.location.latitude,
            longitude: props.worker.location.longitude,
            latitudeDelta: 0.0125,
            longitudeDelta: 0.0125,
            }}>
            <Marker coordinate={{
                latitude: props.worker.location.latitude,
                longitude: props.worker.location.longitude,
            }} />
            
        </MapView>
        
    </View>

);

const ViewWorkerSchedule = (props) => (
    <View style={
        worker_schedule.schedule_container
    }>
        <View style={
            worker_schedule.schedule_button_style
        }>
            <TouchableOpacity style={
                worker_schedule.touchable_opacity
            }>
                <Text style={
                    worker_schedule.button_text
                }> View Schedule </Text>
            </TouchableOpacity>
        </View>
    </View>
);
