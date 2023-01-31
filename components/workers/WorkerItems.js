import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { auth, db } from '../../firebase'
import { worker_items_style } from '../../styles/workers/WorkerItemsStyle'


export default function WorkerItems({ navigation, ...props }) {

    const [worker_details, setWorkers] = useState([])
    const [loaded_worker_, setLoadedWorkers] = useState(false)

    const items = require('../../categories.json')

    const [sorted, setSorted] = useState([])
    const [loaded_sorted, setLoadedSorted] = useState(false)

    const [currentAddress, setCurrentAddress] = useState({
        address1: '30 Aldwych',
        address2:'',
        addressPostal: 'WC2B 4BG',
        
    })

    useEffect(() => {
        const loadData = async() => {
            let worker_data = []
            db.collection('workers').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id
                    worker_data.push(data)
                })
            }).then(function(){
                setWorkers(worker_data)
                setSorted(worker_data)
                setLoadedWorkers(true)
            }
            ).catch(err => alert(err))
        }

        loadData()
    }, [])


    //loads the relevant data depending on what category is selected
    const loadFitness = (selected_cat) => {
        const sorted_data = []
        for(let i=0; i<worker_details.length;i++){
            let f_cat = worker_details[i].categories
            for (let j=0; j<f_cat.length; j++){
                if (f_cat[j] ==selected_cat.__id__){
                    sorted_data.push(worker_details[i])
                }
            }
            
        }
        setSorted(sorted_data)
        setLoadedSorted(true)
    }
    
    //Loads all necessary sorted data
    const loadAll = () => {
        setSorted(worker_details)
        setLoadedSorted(false)
    }


    //Checks to see if the user is logged in for address authentication
    const checkAddress = () => {
        if (auth.currentUser) {
            navigation.navigate("CurrentAddressScreen", {
                navigation:navigation,
            })
        } else {
            navigation.navigate("LoginAddressNeededScreen", {
                navigation:navigation,
            })
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <> 
                {loaded_worker_ &&
                <>
                    {loaded_sorted &&<Reload loadAll={loadAll}/> }
                    <View style={{backgroundColor: "white", padding: 15}}>
                        <SearchBar checkAddress={checkAddress}/>
                    </View>
                    <Categories items={items} loadFitness={loadFitness}/>
                    {sorted.map((worker, index) => (
                        <TouchableOpacity activeOpacity={1} style={{
                        }}
                            key={index}

                            onPress={() => navigation.navigate("WorkerDetail", {
                                first_name: worker.first_name,
                                last_name: worker.last_name,
                                id: worker.id,
                                categories: worker.categories,
                                mobile: worker.mobile,
                                mobile_calling_code: worker.mobile_calling_code,
                                description: worker.description,
                                price: worker.price,
                                location: worker.location,
                                photoURL: worker.photoURL,
                                rating: worker.rating,
                                reviews: worker.reviews,
                                services: worker.services,
                            }
                            )}>
                            <View style={{ marginBottom: 10 }}>
                                <View style={worker_items_style.worker_item_style}>
                                    <WorkerImage worker_details={worker} />
                                    <WorkerInfo worker_details={worker} />
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

//Utilised to show a reload button in charge of refreshing the main section to the tailored requirements of the user
const Reload = (props) => (
    <View style={worker_items_style.reload}>
        <TouchableOpacity style={worker_items_style.reload_button} onPress={()=>props.loadAll(false)}>
            <Text style={worker_items_style.white_subheading}>SHOW ALL</Text>
        </TouchableOpacity>
    </View>
)

//Loads the horizontal search bar
const Categories = (props) => (
    <View style={worker_items_style.categories_container}>
        {   props.items &&
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {props.items.map((item,index) =>(
                    <TouchableOpacity key={index} onPress={()=>props.loadFitness(item)}>
                        <View key={index} style={worker_items_style.item_container}>
                            <MaterialCommunityIcons name={item.icon_name} 
                            style={worker_items_style.image_def}/>
                            <Text style={worker_items_style.text_def}>{item.name}</Text>
                        </View>  
                    </TouchableOpacity>
                ))}           
            </ScrollView>
        }
    </View>
)

const WorkerInfo = (props) => (
    <View style={worker_items_style.worker_info}>
        <Text style={worker_items_style.worker_title_style}>Cleaner</Text>
        <Text>{props.worker_details.first_name} {props.worker_details.last_name}</Text>
        <Text>🌟 {props.worker_details.rating}</Text>
        <Text>£{(props.worker_details.price / 100).toFixed(2)} per hour</Text>
    </View>
)

const WorkerImage = (props) => (
    <View>
        <Image source={{uri:props.worker_details.photoURL}} 
        style={worker_items_style.worker_profile_image} 
        />
    </View>
)

const SearchBar = (props) => (
    <View style={worker_items_style.search_bar_container }>
        <View style={worker_items_style.location_button}>
            <Icon name="location-outline" size= {24} color='#d95a00'></Icon>
        </View>
        <View style={worker_items_style.textInputContainer}>
            <Text style={worker_items_style.textInput}>30 Aldwych, London WC2B 4BG</Text>
        </View>
        <TouchableOpacity style={worker_items_style.change_address}
        onPress={() => props.checkAddress()}>
                <Icon name="time-outline" size={14} color='white'></Icon>
                <Text style={{color:'white'}}> Change </Text>
        </TouchableOpacity>
    </View>
)