
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
    },
    reload:{
        alignItems:'center',
        justifyContent:'center',
    },
    reload_button:{
        backgroundColor:'#d95a00',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
    },
    white_subheading:{
        color:'white',
        fontSize:16,
        fontWeight:'600',
        marginLeft:'3%',
        marginRight:'3%',
        marginTop:'1.5%',
        marginBottom:'1.5%',
    },
    item_container:{
        alignItems:'center',
        marginRight:20
    },
    image_def:{
        fontSize:30,
        color:'#d95a00',
    },
    text_def:{
        fontSize: 14,
        color:'#d95a00',
        fontWeight:"600"
    },
    search_bar_container: { 
        marginTop:'1%', 
        flexDirection: "row",
        width:'100%',
        backgroundColor: "white",
        borderWidth:1,
        borderColor:'#d95a00',
        borderRadius:50,
        flexDirection: "row",
        alignItems: "center",
        marginRight: '1%',
        color:'#d95a00',
        height:Dimensions.get('screen').height/18,
    },
    location_button:{
        marginLeft: 10,
    },
    textInputContainer:{
        width:'61%',
        flexDirection: "row",
        marginLeft:'2%'
    }, 
    textInput:{
        backgroundColor: "white",
        borderRadius:20,
        fontWeight: "700",
        color:'#d95a00',
    }, 
    change_address:{
        flexDirection: "row",
        backgroundColor: "#d95a00",
        padding: 9,
        borderRadius: 30,
        alignItems: "center",
    },
    
});

