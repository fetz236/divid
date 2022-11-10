import { StyleSheet } from 'react-native'


export const trainer_style = StyleSheet.create({
    trainer_header: {
        fontWeight: "bold",
        marginTop:"4%",
        marginLeft:"4%",
        fontSize: 20,
        marginBottom:"4%",
        color: '#d95a00'
    },
    trainer_sub_header: {
        color:'#d95a00',
        fontWeight: "600",
        fontSize: 16,
        marginLeft:"2%",
        marginTop:"2%",
    },
    trainer_body: {
        fontWeight:"200",
        marginTop:"2%",
        marginLeft:"2%",
        fontSize:16
    },
    container_view: {
        marginTop:"2%",
        marginLeft:'10%',
    },
    text_view: {
        marginLeft:"auto",
        marginRight:"auto",
        width: 350,
        height: 150,
    },
    rating_body: {
        fontWeight:"200",
        marginTop:"3%", 
        marginLeft:"2%",
        fontSize:16
    },
    text_sub_view: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft:"5%",
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    sub_view_item: {
        marginTop:"4%",
        flex: 1,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start'
    },
    skill:{
        width:'46%',
        borderRadius:50,
        borderWidth:2,
        borderColor: '#d95a00',
        marginTop:'5%',
        backgroundColor: '#d95a00',
        marginLeft:'2%',
        alignItems:'center',
    },
    divider: {
        marginTop:"4%",
        borderBottomWidth:5,
    },
    about_text:{
        color: 'white',
        fontSize:14,
        fontWeight:'400',
        marginLeft:"10%",
        marginTop:"2%",
        marginRight:'10%',
    },
    location_box:{
        marginTop:'30%',
        marginLeft:'5%',
    },
    map_location_box:{
        marginTop:'5%',
        width:'90%',
        height:350,     
    },
    trainer_image: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        borderWidth: 3,
        borderColor: '#d95a00',
        overflow: "hidden",
        alignSelf: "center",       
        marginTop: "10%", 
    },
    
    trainer_rating:{
        alignContent:'space-around',
        justifyContent:'center',
        flexDirection:'row',
    }
});

export const trainer_schedule = StyleSheet.create({
    schedule_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 999,
        marginBottom: "10%",
    },
    schedule_button_style: {
        flexDirection:'row',
        justifyContent: 'center',
        width: "100%",
    },
    touchable_opacity: {
        marginTop: '10%',
        backgroundColor: "#d95a00",
        alignItems: 'center',
        padding: 14,
        borderRadius: 30,
        width: 350,
        position: "relative",
    },
    button_text: {
        color: "white",
        fontSize: 17,
    },
});