import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { DonationHistoryData } from '../componant/Data/DonationHistoryData';
import { FlatList } from 'react-native-gesture-handler';


const DonationHistory = () => {
  return (
    <View style={{height:"100%"}}>
        <LinearGradient
            colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
            style={styles.background} >
            <FlatList
              style={styles.MyAccountWrapper}
              data={DonationHistoryData}
              renderItem={DonationHistoryItem}
              keyExtractor={item => item.id}
            />
        </LinearGradient>
    </View>
  )
}

export default DonationHistory;

const DonationHistoryItem=({item})=>{
  return(
    <TouchableOpacity style={styles.listWrapper}>
      <Image source={{uri:item.image}} style={styles.listImage} />
      <View style={styles.listContent}>
        <Text style={styles.listDate}>{item.date}</Text>
        <Text style={styles.listTiTle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  background:{
    paddingTop:10,
    flex:1,
    height:"100%"
  },
  listImage:{
    width:80,
    height:80,
    borderRadius:16,
  },
  listWrapper:{
    flexDirection:"row",
    marginHorizontal:12,
    backgroundColor:"#fff",
    marginBottom:15,
    borderRadius:20,
    paddingVertical:10,
    paddingLeft:10,
    paddingRight:100,
  },
  listContent:{
    paddingLeft:15,
  },
  listDate:{
    fontSize:13,
    lineHeight:25,
    color:"#0F286A",
    fontFamily:"NunitoSansBold",
  },
  listTiTle:{
    fontSize:14,
    lineHeight:25,
    color:"#3E3E3E",
    fontFamily:"NunitoSansBold",
  },
  inputFiledWrapper:{
    backgroundColor:"#fff",
    borderRadius:15,
    paddingHorizontal:15,
    paddingVertical:11,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:14,
  }
})