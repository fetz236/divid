import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { db } from '../../firebase'
import { categories_css } from '../../styles/home/CategoriesStyle'
import { style_sheet } from '../../styles/workers/WorkerItemsStyle'


export default function WorkerItems({ navigation, ...props }) {

    const [worker_details, setWorkers] = useState([])
    const [loaded_worker_, setLoadedWorkers] = useState(false)

    const items = require('../../categories.json')

    const [sorted, setSorted] = useState([])
    const [loaded_sorted, setLoadedSorted] = useState(false)


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
    
    const loadAll = () => {
        setSorted(worker_details)
        setLoadedSorted(false)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <> 
                {loaded_worker_ &&
                <>
                    {loaded_sorted &&<Reload loadAll={loadAll}/> }
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
                            }
                            )}>
                            <View style={{ marginBottom: 10 }}>
                                <View style={style_sheet.worker_item_style}>
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
    <View style={categories_css.reload}>
        <TouchableOpacity style={categories_css.reload_button} onPress={()=>props.loadAll(false)}>
            <Text style={categories_css.white_subheading}>SHOW ALL</Text>
        </TouchableOpacity>
    </View>
)

//Loads the horizontal search bar
const Categories = (props) => (
    <View style={categories_css.categories_container}>
        {   props.items &&
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {props.items.map((item,index) =>(
                    <TouchableOpacity key={index} onPress={()=>props.loadFitness(item)}>
                        <View key={index} style={categories_css.item_container}>
                            <MaterialCommunityIcons name={item.icon_name} 
                            style={categories_css.image_def}/>
                            <Text style={categories_css.text_def}>{item.name}</Text>
                        </View>  
                    </TouchableOpacity>
                ))}           
            </ScrollView>
        }
    </View>
)

const WorkerInfo = (props) => (
    <View style={style_sheet.worker_info}>
        <Text style={style_sheet.worker_title_style}>{props.worker_details.first_name} {props.worker_details.last_name}</Text>
        <Text>{props.worker_details.description}</Text>
        <Text>£{(props.worker_details.price / 100).toFixed(2)}</Text>

    </View>
)

const WorkerImage = (props) => (
    <View>
        <Image source={{uri:props.worker_details.photoURL}} 
        style={style_sheet.worker_profile_image} 
        />
    </View>
)