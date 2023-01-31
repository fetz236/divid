
import { StyleSheet } from 'react-native'

export const worker_items_style = StyleSheet.create({
    worker_item_style: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,
        marginLeft:20,
    },
    worker_title_style:{
        fontSize:19,
        fontWeight:'600',    
    },
    worker_profile_image:{
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        marginRight: 20, 
        marginBottom: 5
    },
    worker_info:{
        width: 240,
        justifyContent: "space-evenly",
    }
});

