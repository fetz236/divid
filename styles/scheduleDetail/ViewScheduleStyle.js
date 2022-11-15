import { StyleSheet } from 'react-native'

export const schedule_info = StyleSheet.create({
    time_row_container:{
        backgroundColor: '#d95a00',
    },
    time_info_container:{
        marginLeft: 10,
        flexDirection: 'row',
        marginTop: 10,
    },
    time_container:{
        marginLeft:"10%"
    },
    name_container:{
        marginLeft:"15%",
    },
    text_info:{
        color:'white',
        fontSize: 16
    },
    divider:{
        marginTop:'2%',
    },

});
export const worker_schedule = StyleSheet.create({
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