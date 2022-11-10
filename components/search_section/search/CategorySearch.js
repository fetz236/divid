import { getBlob, getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import { View, Text } from 'react-native'
import { db, storage } from '../../../firebase';
import { category_search_bar_css } from '../../../styles/SearchHome/UserSearchBar/CategorySearch';



export default function CategorySearch({navigation}) {

    const [loaded_categories, setLoadedCategories] = useState(false)
    const category_data = require('../../../categories.json')

    const [selected_data, setSelectedData] = useState([])

    /*

    useEffect(() => {

        setSelectedData(category_data)
        const loadCategoryImages = async() => {
            console.log("1")
            for (let i=0; i<selected_data.length;i++){
                const category_image_ref = ref(storage, `gs://divid-edf5d3.appspot.com/category_images/${selected_data[i].image_name}.jpg`);
                
                await getDownloadURL(category_image_ref).then(
                    (x) => {
                        db.collection('categories').doc(selected_data[i].__id__).update({
                            image_name:selected_data[i].image_name,
                            image_url: x
                        })
                    }
                )
                
                setLoadedCategories(true)
                console.log("lol")
            }   
        }
    
        if (loaded_categories == false){
            loadCategoryImages()
            setLoadedCategories(true)

        }
    }, [])
    

    const getCategoryImage = async() =>{
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(await getBlob(category_image_ref)).then(
            (x) => {
                
                fileReaderInstance.onload = () => {
                    base64data = fileReaderInstance.result;                
                    setUrl(base64data);
                }
            }
        )
    };
    
    */
    return (
        <View style={category_search_bar_css.main_container}>
            <View style={category_search_bar_css.item_container}>
                
            {
                
                category_data.map((item, index) =>{
                    if (index %3 ==0 && index+1 < category_data.length){
                        index += 1;
                        return (
                            <View key={index} style={{flexDirection:'row' , marginTop:'3%' , marginBottom:'3%', marginLeft: '3%', marginRight:'3%'}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("DisplayCategoriesScreen", item)}
                                    style= {{marginRight:'3%'}}
                                >
                                    <View key={index} style = {category_search_bar_css.row_container}>
                                        <ImageBackground imageStyle={{opacity:0.3, borderRadius:20,}} style={category_search_bar_css.category_image} source={{uri:item.image_url}}>
                                        <Text style={category_search_bar_css.category_text}> {item.name.toUpperCase()}</Text>
                                        </ImageBackground>
    
                                    </View>   
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("DisplayCategoriesScreen", category_data[index])}
                                >
                                    <View key={index+1} style = {category_search_bar_css.row_container}>
                                        <ImageBackground imageStyle={{opacity:0.3, borderRadius:20,}} style={category_search_bar_css.category_image_portrait} source={{uri:category_data[index].image_url}}>
                                        <Text style={category_search_bar_css.category_text_portrait}> {category_data[index].name.toUpperCase()}</Text>
                                        </ImageBackground>
    
                                    </View>   
                                </TouchableOpacity>
                            </View>
                        );
                    }
                    
                    else if (index%3 ==2){
                        return (
                            <View key={index} style={{flexDirection:'row' , marginLeft: '3%', marginRight:'3%'}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("DisplayCategoriesScreen", item)}
                                    >
                                    <View key={index} style = {category_search_bar_css.row_container_landscape}>
                                        <ImageBackground imageStyle={{opacity:0.3, borderRadius:20,}} style={category_search_bar_css.category_image_landscape} source={{uri:item.image_url}}>
                                        <Text style={category_search_bar_css.category_text_landscape}> {item.name.toUpperCase()}</Text>
                                        </ImageBackground>
    
                                    </View>   
                                </TouchableOpacity>
                            </View>
                        );
                    }
                    else if (index %3 ==0 && index+1 >= category_data.length){
                        return (
                            <View key={index} style={{flexDirection:'row' , marginTop:'3%' , marginBottom:'3%',marginLeft: '3%', marginRight:'3%'}}>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate("DisplayCategoriesScreen", item)}
                                    style= {{marginRight:'3%'}}
                                >
                                    <View key={index} style = {category_search_bar_css.row_container}>
                                        <ImageBackground imageStyle={{opacity:0.3, borderRadius:20,}} style={category_search_bar_css.category_image} source={{uri:item.image_url}}>
                                        <Text style={category_search_bar_css.category_text}> {item.name.toUpperCase()}</Text>
                                        </ImageBackground>

                                    </View>   
                                </TouchableOpacity>
                            </View>
                        )
                        
                    }
                    
                }
            )}
            </View> 
        </View>
        
    )
}
