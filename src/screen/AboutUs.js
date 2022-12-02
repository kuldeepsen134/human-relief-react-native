import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';


const AboutUs = () => {
  return (
    <View style={{height:"100%"}}>
        <LinearGradient
            colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
            style={styles.background} >
         <ScrollView>
          <View style={styles.container}>
            <View style={styles.logoWrapper}>
              <Image source={require('../../assets/images/temp/about-us.jpg')} style={styles.image} />
              <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            </View>

            <Text style={styles.text}>
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

export default AboutUs;

const styles = StyleSheet.create({
  background:{
    paddingTop:10,
    flex:1,
    height:"100%"
  },
  container:{
    paddingHorizontal:29,
    paddingVertical:20,
  },
  image:{
    width:172,
    height:152,
  },
  logo:{
    width:120,
    height:37,
    resizeMode: 'contain',
  }, 
  text:{
    color:"#fff",
    fontSize:15,
    lineHeight:20,
    fontFamily:"NunitoSansRegular"
  },
  logoWrapper:{
    flexDirection:"row",
    backgroundColor:"#fff",
    alignItems:"center",
    borderRadius:15,
    overflow:"hidden",
    marginBottom:26,
  }
})