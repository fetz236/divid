import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '../../../firebase'
import { fi_items_css } from '../../../styles/home/FitnessItemsStyle'
import { display_categories_style } from '../../../styles/SearchHome/DisplayCategories/DisplayCategoriesStyle'

export default function DisplayCategories({navigation, ...props}) {



  const [fitness, setFitness] = useState([])
  const [loaded_fitness, setLoadedFitness] = useState(false)


  useEffect( async() => {

      //Load all fitness data
      const loadData = async() => {
          let fit_data = []
          db.collection('fitness_centres').where('categories','array-contains',props.route.params.__id__).get()
          .then(snapshot => {
              snapshot.forEach(doc => {
                  const data = doc.data();
                  data.id = doc.id
                  fit_data.push(data)
              })
          }).then( async function(){
              await setFitness(fit_data)
              await setLoadedFitness(true)
          }
          ).catch(err => alert(err))
          
      }


      if (fitness.length == 0){
          await loadData()
      }
      
  }, [])    
  
    return (
      <SafeAreaView>  
        { 
            loaded_fitness && fitness.length>0 && 
            <FitnessItems fitness={fitness} navigation={navigation}/>
        }

        { 
            loaded_fitness && fitness.length==0 && 
            <View style={display_categories_style.header_container}>
              <Text style={display_categories_style.title}>Currently we do not have any partners under this category ;( </Text>
              <Text style={display_categories_style.title_2}>Stay tuned!</Text>
            </View>
        }
        </SafeAreaView>
    )
  
}

const FitnessItems = (props) => (
  <>
      {props.fitness.map((fit, index) => (
          <TouchableOpacity activeOpacity={1} style={{
          }}
          key={index}
          onPress={() => props.navigation.navigate("FitnessDetail", {
              id: fit.id,
              name: fit.name,
              image: fit.images,
              reviews: fit.reviews,
              rating: fit.rating,
              location: fit.location, 
              subscription: fit.subscription,
              telephone_number: fit.telephone_number,
              categories: fit.categories,
          }
          )}
          >
          <View key={index}>
              <View style={fi_items_css.main_container}>
                  <GymImage image={fit.images} fit={fit} index={index} addFavourites={props.addFavourites}/>
                  <GymInfo name={fit.name} rating={fit.rating}/>
              </View> 
          </View>
      </TouchableOpacity>

      ))}
  </>
)

const GymImage = (props) => (
  <View style={fi_items_css.gym_image_container}>
      <Image source={{uri:props.image[0]}} style={fi_items_css.image_def}/>
      { /*
      <TouchableOpacity style={fi_items_css.icon_container} onPress={() => props.addFavourites(props.fit, props.index)}>
          <MaterialCommunityIcons name={props.fit.isFavourite?'heart':'heart-outline'} 
          size={25} color='white'></MaterialCommunityIcons>
      </TouchableOpacity>
      */
      }
  </View>
)

const GymInfo = (props) => (
  <View style={fi_items_css.gym_info_container}>
          <View>
              <Text style={fi_items_css.headline_1}>{props.name}</Text>
          </View>
      <View style={fi_items_css.description_container}>
          <Text style={{color:'white'}}>{props.rating}</Text>
      </View>
  </View>
)