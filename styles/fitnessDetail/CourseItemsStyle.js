
import { StyleSheet } from 'react-native'

export const course_sheet = StyleSheet.create({
    course_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:20,
        backgroundColor: "white",
    },
    course_title:{
        fontSize:19,
        color:'#d95a00',
        fontWeight:'600',    
    },
    course_image:{
        width:100, 
        height:100, 
        borderRadius:8, 
        marginRight:20, 
        marginBottom:5
    },
    course_text:{
        color:'#8d8d8d',
    }
});


