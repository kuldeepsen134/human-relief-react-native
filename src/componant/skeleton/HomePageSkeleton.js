import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react';

const {width} = Dimensions.get('screen');
const HomePageSkeleton = () => {

  return (
    <View style={{paddingHorizontal:30,}}>
      <View style={styles.singleLine} />
      <View style={styles.banner} />
      <View style={styles.category}>
        <View style={styles.categoryItem} />
        <View style={styles.categoryItem} />
        <View style={styles.categoryItem} />
      </View>
      <View style={styles.banner2} />
    </View>
  )
}

export default HomePageSkeleton

const styles = StyleSheet.create({
  singleLine:{
    height:30,
    width:width-60, 
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:10,
    marginBottom:30,
  },
  banner:{
    height:255,
    width:width-60, 
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:10,
  },
  category:{
    flexDirection:"row",
    paddingTop:40,
    paddingBottom:20,
  },
  categoryItem:{
    height:30,
    width:90, 
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:20,
    marginRight:10,
  },
  banner2:{
    height:110,
    width:width-60, 
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:10,
  }
})