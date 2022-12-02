import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, FontAwesome  } from '@expo/vector-icons'; 
 
const AboutApp = () => {
  return (
    <View style={{height:"100%"}}>
        <LinearGradient
            colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
            style={styles.background} >
         <ScrollView>
          <View>
            <Text style={{
              paddingHorizontal:29,
              paddingVertical:20,
              color:"#fff",
              fontSize:15,
              lineHeight:20,
              fontFamily:"NunitoSansRegular"
            }}>
            {`Praesent facilisis nisl. Ut odio Donec est. tincidunt maximus lorem. Ut ac venenatis ex dignissim, ullamcorper Praesent venenatis porta enim. massa quam Donec
 
nulla, Vestibulum hendrerit Nunc nisl. vel nulla, eu placerat enim. turpis ac ex sed facilisis felis, convallis. vel nisl. non ac sollicitudin. nulla, ex in 
            
lobortis, Ut fringilla Nullam ex venenatis gravida facilisis ipsum amet, Sed risus odio tincidunt vel Ut urna. ac Praesent nisl. tincidunt faucibus nec quam 
            
Praesent facilisis nisl. Ut odio Donec est. tincidunt maximus lorem. Ut ac venenatis ex dignissim, ullamcorper Praesent venenatis porta enim. massa quam Donec 
            
nulla, Vestibulum hendrerit Nunc nisl. vel nulla, eu placerat enim. turpis ac ex sed facilisis felis, convallis. vel nisl. non ac sollicitudin. nulla, ex in 
            
lobortis, Ut fringilla Nullam ex venenatis gravida facilisis ipsum amet, Sed risus odio tincidunt vel Ut urna. ac Praesent nisl. tincidunt faucibus nec quam 

Praesent facilisis nisl. Ut odio Donec est. tincidunt maximus lorem. Ut ac venenatis ex dignissim, ullamcorper Praesent venenatis porta enim. massa quam Donec
 
nulla, Vestibulum hendrerit Nunc nisl. vel nulla, eu placerat enim. turpis ac ex sed facilisis felis, convallis. vel nisl. non ac sollicitudin. nulla, ex in 
            
lobortis, Ut fringilla Nullam ex venenatis gravida facilisis ipsum amet, Sed risus odio tincidunt vel Ut urna. ac Praesent nisl. tincidunt faucibus nec quam 
            
Praesent facilisis nisl. Ut odio Donec est. tincidunt maximus lorem. Ut ac venenatis ex dignissim, ullamcorper Praesent venenatis porta enim. massa quam Donec 
            
nulla, Vestibulum hendrerit Nunc nisl. vel nulla, eu placerat enim. turpis ac ex sed facilisis felis, convallis. vel nisl. non ac sollicitudin. nulla, ex in 
            
lobortis, Ut fringilla Nullam ex venenatis gravida facilisis ipsum amet, Sed risus odio tincidunt vel Ut urna. ac Praesent nisl. tincidunt faucibus nec quam 
            `}
            </Text>
          </View>
          </ScrollView> 

        </LinearGradient>
    </View>
  )
}

export default AboutApp;

const styles = StyleSheet.create({
  background:{
    paddingTop:10,
    flex:1,
    height:"100%"
  },
  suportHeaderWrapper:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    paddingTop:20,
  },
  suportHeading:{
    fontSize:22,
    lineHeight:25,
    color:"#fff",
    fontFamily:"ItimRegular",
    paddingRight:10,
  },
  supportEmailLinkWrapper:{
    alignItems:"center",
    justifyContent:"center",
    paddingTop:30,
  },
  supportEmailWrapper:{
    backgroundColor:"#fff",
    flexDirection:"row",
    paddingHorizontal:18,
    paddingVertical:8,
    borderRadius:15,
  },
  supportEmail:{
    fontSize:22,
    lineHeight:25,
    color:"#0F286A",
    fontFamily:"ItimRegular",
    marginRight:26,
  },
  supportText:{
    fontSize:16,
    lineHeight:20,
    color:"#fff",
    fontFamily:"NunitoSansRegular",
    width:"60%",
    textAlign:"center",
  },
  supportTextWrapper:{
    alignItems:"center",
    justifyContent:"center",
    paddingTop:33,
  }
})