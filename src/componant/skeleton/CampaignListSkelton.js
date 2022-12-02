import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react';

const {width} = Dimensions.get('screen');

const CampaignListSkelton = () => {
  return (
    <View style={styles.listInnerWrapper}>
      <View style={styles.line} />
      <View style={styles.item}>
        <View style={styles.image} />
        <View style={styles.contentWrapper}>
          <View style={styles.line2} />
          <View style={styles.line3} />
          <View style={styles.line4} />
        </View>
        <View style={styles.footer}/>
      </View>
  </View>
  )
}

export default CampaignListSkelton;

const styles = StyleSheet.create({
  circle:{
    width:80,
    height:80,
    borderRadius:80,
    backgroundColor:"rgba(255,255,255,0.9)",
    marginBottom:15,
  },
  line:{
    height:15,
    width:80, 
    marginLeft:10,
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:10,
    marginBottom:10,
  },
  line2:{
    height:15,
    width:150, 
    marginLeft:10,
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:10,
    marginBottom:10,
  },

  line3:{
    height:9,
    width:"93%", 
    marginLeft:10,
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:10,
    marginBottom:10,
  },

  line4:{
    height:9,
    width:"83%", 
    marginLeft:10,
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:10,
    marginBottom:10,
  },
  footer:{
    height:40,
    marginTop:15,
    width:"100%", 
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:10,
    borderRadius:15,
  },
  listInnerWrapper: {
    paddingVertical:14,
    paddingHorizontal:14,
  },
  item:{
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:15,
    overflow:"hidden",
    marginTop:10,
  },
  image:{
    height:140,backgroundColor:"rgba(255,255,255,0.9)",
  },
  contentWrapper:{
    paddingTop:25,
  }
})
