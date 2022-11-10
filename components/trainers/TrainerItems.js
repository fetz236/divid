import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { db } from '../../firebase'
import { style_sheet } from '../../styles/trainers/TrainerItemsStyle'


export default function TrainerItems({ navigation, ...props }) {
    const dispatch = useDispatch();

    const select_item = (item) => dispatch({
        type: 'ADD_TO_CART',
        payload: item,
    });

    const [trainer_details, setTrainers] = useState([])
    const [loaded_trainers, setLoadedTrainers] = useState(false)

    useEffect( async() => {
        const loadData = async() => {
            let trainer_data = []
            db.collection('users').where("isTrainer", "==", true).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id
                    trainer_data.push(data)
                })
            }).then(function(){
                setTrainers(trainer_data)
                setLoadedTrainers(true)
            }
            ).catch(err => alert(err))
            
        }

        if (trainer_details.length == 0){
            await loadData()
        }
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <> 
                {loaded_trainers &&
                <>
                    {trainer_details.map((trainer, index) => (
                        <TouchableOpacity activeOpacity={1} style={{
                        }}
                            key={index}

                            onPress={() => navigation.navigate("TrainerDetail", {
                                first_name: trainer.first_name,
                                last_name: trainer.last_name,
                                id: trainer.id,
                                categories: trainer.categories,
                                mobile: trainer.mobile,
                                mobile_calling_code: trainer.mobile_calling_code,
                                description: trainer.description,
                                price: trainer.price,
                                location: trainer.location,
                                photoURL: trainer.photoURL,
                                rating: trainer.rating,
                                reviews: trainer.reviews,
                            }
                            )}>
                            <View style={{ marginBottom: 10 }}>
                                <View style={style_sheet.trainer_item_style}>
                                    <TrainerImage trainer_details={trainer} />
                                    <TrainerInfo trainer_details={trainer} />
                                </View>
                                <Divider width={0.5} orientation="vertical" style={{ marginTop: 5 }} />

                            </View>
                        </TouchableOpacity>
                    ))}
                </>
                }
            </>
        </ScrollView>
    )
}

const TrainerInfo = (props) => (
    <View style={style_sheet.trainer_info}>
        <Text style={style_sheet.trainer_title_style}>{props.trainer_details.first_name} {props.trainer_details.last_name}</Text>
        <Text>{props.trainer_details.description}</Text>
        <Text>£{(props.trainer_details.price / 100).toFixed(2)}</Text>

    </View>
)

const TrainerImage = (props) => (
    <View>
        <Image source={{uri:props.trainer_details.photoURL}} 
        style={style_sheet.trainer_profile_image} 
        />
    </View>
)