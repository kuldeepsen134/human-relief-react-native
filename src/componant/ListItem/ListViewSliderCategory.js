import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react';

const ListViewSliderCategory = ({item,activeCategory,categoryHandle}) => {
  return (
    <TouchableOpacity onPress={()=>categoryHandle(item.id)}>
      <Text style={{
      fontSize:14,
      lineHeight:16,
      height:35,
      fontFamily:"NunitoSansRegular",
      color:item.id === activeCategory ? "#000" : "#fff",
      paddingTop:10,
      paddingBottom:10,
      paddingLeft: item.id === 1 ? 23 : 8.5,
      paddingRight: item.id === 1 ? 23 : 8.5,
      marginRight: item.id === 1 ? 8.5 : 0,
      marginLeft: item.id === 1 ? 30 : 0,
      backgroundColor: item.id === activeCategory ? "#fff" : "transparent",
      borderRadius:15,
    }}>{item.title}</Text>
    </TouchableOpacity>
  )
}

export default ListViewSliderCategory;

const styles = StyleSheet.create({})