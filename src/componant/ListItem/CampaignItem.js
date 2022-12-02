import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const CampaignItem = ({ item ,local}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CampaignListScreen', { catagoryId: item._id, catagoryName: item.title })}
      style={{
        width: 80,
        marginRight: 0,
        alignItems: "center",
        paddingBottom: 22,
        marginHorizontal: 29,
      }}>

      <Image
        source={{ uri: item.image, }}
        style={{ width: 80, height: 80, borderRadius: 100, }}
      />
      <Text style={{ color: "#fff", textAlign: "center", fontFamily: "NunitoSansRegular", paddingTop: 10 }}>
        {local === "en" ?
          item.title_multi_lang[0].en
          :
          local === "de" ?
            item.title_multi_lang[0].de
            :
            undefined
        }
      </Text>

    </TouchableOpacity>
  )
}

export default CampaignItem

const styles = StyleSheet.create({})