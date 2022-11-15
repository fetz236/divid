import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { user_search_bar_css } from '../../../styles/SearchHome/UserSearchBar/UserSearchBarStyle'
import { TextInput } from 'react-native';
import CategorySearch from './CategorySearch';
import { SectionList } from 'react-native';
import { db } from '../../../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Item = ({ title }) => (
    <View style={user_search_bar_css.flat_list}>
      <Text style={user_search_bar_css.flat_list_text}>{title}</Text>
    </View>
  );

const UserSearchBar = ({ navigation }) => {

    const [search_fc_data, setSearchFCData] = useState([])
    const [search_worker_data, setSearchWorkerData] = useState([])

    const [loadedSearchData, setLoadedSearchData] = useState(false)
    const [loadedWorkerData, setLoadedWorkerData] = useState(false)
    const [fully_loaded, setFullyLoaded] = useState(false)

    const [filteredData, setFilteredData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [search, setSearch] = useState(''); 
    const [categoryState, setCategoryState] = useState(true);

    useEffect(async() => {

        const loadMasterSearchData = () => {
            let fc_data = []
            db.collection('fitness_centres').get().then(
                snapshot => {
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        data.id = doc.id
                        
                        fc_data.push(data)
                    })
                }
            ).then(async function(){
                setSearchFCData(fc_data)
            })

            let tr_data = []
            db.collection('users').where('isWorker', '==', true).get().then(
                snapshot => {
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        data.id = doc.id
                        data.name = data.first_name + " " + data.last_name
                        tr_data.push(data)
                    })
                }
            ).then(async function(){
                setSearchWorkerData(tr_data)
            })

            setMasterData([{
                title: "Category",
                data: require('../../../categories.json'),
            },
            {
                title: "Fitness Centres",
                data: fc_data,
            },
            {
                title: "Workers",
                data: tr_data
            },
            ])
        }
        if (masterData.length==0){
            await loadMasterSearchData()
            setFullyLoaded(true)
        }

    }, [])
    
    
    const searchFilter = (text) => {
        if(text){
            setCategoryState(false);
            const new_data = masterData.reduce((result, masterData) =>{
                const {title, data} = masterData;
                
                const filter = data.filter(
                    element => element.name.includes(text)
                );
                
                if (filter.length !== 0){
                    result.push({
                        title,
                        data:filter
                    });
                }
                return result;
            }, [])
            /*
            const new_data = masterData.filter((item) => {
                const item_data = item.text ? item.data.toUpperCase() : ''.toUpperCase();
                const text_data = text.toUpperCase();
                return item_data.indexOf(text_data) > -1;
            });
            */
            setFilteredData(new_data);
            setSearch(text);
        }
        else{
            setCategoryState(true);
            setFilteredData('');
            setSearch(text);
        }
    };


    const checkNavigation = (title, item) =>{
        if (title == "Fitness Centres") {
            navigation.navigate("FitnessDetail", {
            id: item.id,
            name: item.name,
            image: item.images,
            reviews: item.reviews,
            rating: item.rating,
            location: item.location, 
            subscription: item.subscription,
            telephone_number: item.telephone_number,
            categories: item.categories,
        }
        )}
        else if (title == "Workers"){
            navigation.navigate("WorkerDetail", {
                first_name: item.first_name,
                last_name: item.last_name,
                id: item.id,
                categories: item.categories,
                mobile: item.mobile,
                location:item.location,
                description: item.description,
                price: item.price,
                photoURL: item.photoURL,
                rating: item.rating,
                reviews: item.reviews,
            }
            )
        }

        else if (title == "Category"){
            navigation.navigate("DisplayCategoriesScreen", item)
        }
    };


    return (
        <>
        { fully_loaded && 
            <>
            <View style={user_search_bar_css.main_container}>
                <View style={user_search_bar_css.search_bar_container}>
                    <Icon name="search" size={20} color="#d95a00" style={user_search_bar_css.search_icon}/>
                    <TextInput underlineColorAndroid="transparent" placeholder="Search"  placeholderTextColor="black"
                        style={user_search_bar_css.input_container} 
                        value={search}
                        onChangeText={(text) => searchFilter(text)}
                    />
                    
                </View>  
                
            </View>
            <View style={user_search_bar_css.flat_list_container}>
                <SectionList
                nestedScrollEnabled={false}
                sections={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ section: { title } , item }) => 
                    <TouchableOpacity onPress={() => checkNavigation(title,item)}>
                        <Item title={item.name} />
                    </TouchableOpacity>}
                renderSectionHeader={({ section: { title } }) => (
                <Text style={user_search_bar_css.flat_list_heading}>{title}</Text>
                )}
                />
            </View>
            <View>
                {categoryState && <CategorySearch navigation={navigation}/>}
            </View>
            </>
            }
        </>
                
    )
};

export default UserSearchBar;
