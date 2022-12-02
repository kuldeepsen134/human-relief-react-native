import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native'
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NotificationData } from '../componant/Data/NotificationData';
import { Ionicons } from '@expo/vector-icons'; 

const Notification = () => {
  return (
    <View style={{height:"100%"}}>
        
    <LinearGradient
      colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
      style={styles.background} >
      <FlatList
        data={NotificationData}
        keyExtractor={item => item.id}
        renderItem={NotificationItem}
      />

    </LinearGradient>
    
    </View>
  )
}

export default Notification;

const styles = StyleSheet.create({
    background:{
        paddingTop:10,
        flex:1,
        height:"100%"
    },
})



const NotificationItem = ({item}) =>{
    return(
        <TouchableOpacity 
            style={{
                backgroundColor:"#fff",
                borderRadius:12,
                marginBottom:15,
                marginHorizontal:22,
                overflow:"hidden",
                flexDirection:"row",
                paddingTop:10,
                paddingLeft:10,
                paddingBottom:10,
                paddingRight:70,
            }}
        >
            
                <Image 
                    style={{
                        width:46,
                        height:46,
                        borderRadius:46,
                        marginRight:14,
                    }}
                    source={{uri:item.image}}/>
                <View >
                    <View style={{
                        flexDirection:"row",
                        justifyContent:"space-between",
                    }}>
                        <View style={{
                            flexDirection:"row",
                        }}>
                            <Text style={{
                                fontSize:14,
                                lineHeight:25,
                                color:"#3E3E3E",
                                fontFamily:"NunitoSansBold",
                            }}>
                            {item.title} 
                            
                            </Text>
                            <Ionicons name="checkmark-circle" size={13} color="#2196F3" style={{
                                marginLeft:5,
                                marginTop:6,
                            }}/>
                        </View>
                        

                        <Text style={{
                             fontSize:13,
                             lineHeight:26,
                             color:"#CACACA",
                             fontFamily:"NunitoSansRegular",
                        }}>{item.date}</Text>
                    </View>
                    <Text style={{
                        fontSize:14,
                        lineHeight:19,
                        color:"rgba(62, 62, 62, 0.4)",
                        fontFamily:"NunitoSansRegular",
                    }}>
                        {item.description}
                    </Text>
                </View>
           
        </TouchableOpacity>
    )
}