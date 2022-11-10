import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';

import {trainer_style, trainer_schedule} from '../../styles/trainers/ViewTrainerStyle'
import MapView, { Marker } from 'react-native-maps';

export default function ViewTrainer({ navigation, ...props }){

    const trainer = {
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

    useEffect(async() => {
        const getCategories = () => {
            let trainer_skills = []

            for(let i=0; i<categories.length; i++){
                for(let j=0; j<trainer.categories.length; j++){
                    if (categories[i].__id__ == trainer.categories[j]){
                        trainer_skills.push(categories[i])
                    }
                }
            }
            setSkills(trainer_skills)
        }
    
        if (skills.length == 0){
            await getCategories()
        }
    }, [])
    
    return (
        <View>
            <View>
                <ScrollView>
                <TrainerImage photoURL={trainer.photoURL} rating={trainer.rating} reviews={trainer.reviews}></TrainerImage>
                <TrainerDetails name = {trainer.first_name+ " "+ trainer.last_name} description={trainer.description} ></TrainerDetails>
                <TrainerAbout skills={skills}></TrainerAbout>
                <TrainerLocations trainer={trainer}></TrainerLocations>
                <View style={
                    trainer_schedule.schedule_container
                }>
                    <View style={
                        trainer_schedule.schedule_button_style
                    }>
                        <TouchableOpacity style={
                            trainer_schedule.touchable_opacity
                        }
                        onPress={() => navigation.navigate("TrainerScheduleDetail", {
                            trainer: trainer,
                        }
                        )}>
                            <Text style={
                                trainer_schedule.button_text
                            }> View Schedule </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </View>
        </View>
    )
}

const TrainerImage = (props) => (
    <>
    <Image style={
        trainer_style.trainer_image
    }source={{uri: props.photoURL}}></Image>
    <View style={
        trainer_style.trainer_rating
    }>
        <Rating type='custom' ratingCount={5} startingValue={props.rating} imageSize={25} tintColor='#f2f2f2' readonly
        style={{
            marginTop:"5%",
        }}> </Rating>
    </View>
    <View style={trainer_style.trainer_rating}>
        <Text style={trainer_style.rating_body}> {props.reviews} Reviews</Text>
    </View>

    </>
);

const TrainerDetails = (props) => (
    <View>
        <Text style={trainer_style.trainer_header}>{props.name}</Text>
        <View style={trainer_style.container_view}>
            <Text style={trainer_style.trainer_body}>{props.description}</Text>
        </View>
    </View>
);


const TrainerAbout = (props) => (
    <View>
        <Text style={trainer_style.trainer_header}>My Skills</Text>
        <View style={trainer_style.text_view}>
            <View style={trainer_style.text_sub_view}>
                <View style={trainer_style.sub_view_item}>
                    {props.skills.map((skill,index) => (
                        <View style={trainer_style.skill} key={index}>
                            <Text style={trainer_style.about_text}>{skill.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    </View>
);
//Needs to account for private gym radius in the future radius or zones
const TrainerLocations = (props) => (
    <View style={trainer_style.location_box}>
        <Text style={trainer_style.trainer_header}>My Gym Partner</Text>
        <MapView
            style={trainer_style.map_location_box}
            showsUserLocation={true}
            region={{
            latitude: props.trainer.location.latitude,
            longitude: props.trainer.location.longitude,
            latitudeDelta: 0.0125,
            longitudeDelta: 0.0125,
            }}>
            <Marker coordinate={{
                latitude: props.trainer.location.latitude,
                longitude: props.trainer.location.longitude,
            }} />
            
        </MapView>
        
    </View>

);

const ViewTrainerSchedule = (props) => (
    <View style={
        trainer_schedule.schedule_container
    }>
        <View style={
            trainer_schedule.schedule_button_style
        }>
            <TouchableOpacity style={
                trainer_schedule.touchable_opacity
            }>
                <Text style={
                    trainer_schedule.button_text
                }> View Schedule </Text>
            </TouchableOpacity>
        </View>
    </View>
);
