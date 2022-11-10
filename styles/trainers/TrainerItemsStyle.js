
import { StyleSheet } from 'react-native'

export const style_sheet = StyleSheet.create({
    trainer_item_style: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,
        marginLeft:20,
    },
    trainer_title_style:{
        fontSize:19,
        fontWeight:'600',    
    },
    trainer_profile_image:{
        width: 100, 
        height: 100, 
        borderRadius: 8, 
        marginRight: 20, 
        marginBottom: 5
    },
    trainer_info:{
        width: 240,
        justifyContent: "space-evenly",
    }
});

