import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react';

const {width} = Dimensions.get('screen');

const CampaignSkelton = () => {
  return (
    <View style={styles.listInnerWrapper}>
      <View style={styles.item}>
        <View style={styles.circle}/>
        <View style={styles.line} />
      </View>
      <View style={styles.item}>
        <View style={styles.circle}/>
        <View style={styles.line} />
      </View>
      <View style={styles.item}>
        <View style={styles.circle}/>
        <View style={styles.line} />
      </View>
  </View>
  )
}

export default CampaignSkelton


const styles = StyleSheet.create({
  circle:{
    width:80,
    height:80,
    borderRadius:80,
    backgroundColor:"rgba(255,255,255,0.9)",
    marginBottom:15,
  },
  line:{
    height:8,
    width:60, 
    marginLeft:10,
    backgroundColor:"rgba(255,255,255,0.9)",
    borderRadius:10,
    marginBottom:10,
  },
  listInnerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    marginHorizontal: -29,
  },
  item:{
    marginHorizontal:29,
    width:50,
  }
})
