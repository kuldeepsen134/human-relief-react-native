import React, { useState, useEffect } from 'react';
import { Image, Modal, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {URL} from '../Data/API'
import { useSelector } from 'react-redux';
import { en,de } from '../localization/SearchLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import {DayLeft} from '../Utility/DayLeft'

const Search = ({ modalState, manageSearchModal }) => {

  const [searchData, setSearchData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [displayData, setDisplayData] = useState(false);
  const [message,setMessage] = useState("");

  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  const filterData = () =>{
    fetch(`${URL}/api/searchDonation/${searchInput}`).
    then((response)=>response.json()).
    then((response)=>{
      if(response.status){
        setDisplayData(true);
        setMessage("");
      }else{
        setDisplayData(false);
        setMessage("Data not found");
      }
      setSearchData(response.data)
    })
  } 

  useEffect(()=>{
    filterData();
  },[searchInput])

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalState}
      onPress={() => manageSearchModal()}
    >
      <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background} >
        <View style={styles.modalWrapper}>

          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.cross}
              onPress={() => manageSearchModal()}>
              <View style={styles.firstCross}></View>
              <View style={styles.secondCross}></View>
            </TouchableOpacity>

            <View style={styles.searchField}>
              <TextInput placeholder={i18n.t('placeholder')}
                value={searchInput}
                onChangeText={(text)=>setSearchInput(text)}
                style={styles.input}
                //value={email}
                autoCapitalize="none"
                //onChangeText={(text)=>setEmail(text)}
                placeholderTextColor="rgba(15, 40, 106, 0.4)" />
              <TouchableOpacity 
                onPress={()=> setSearchInput("")}
                style={styles.icon}>
                {
                  searchInput.length === 0 ?
                  <Ionicons name="search-sharp" size={24} color="#000" />
                  :
                  <Entypo name="cross" size={24} color="#555" />
                }
                
              </TouchableOpacity>

            </View>

            <View style={styles.searchListWrapper}>
              <View style={styles.mainHeading}>
                <Text style={styles.topHeading}>{i18n.t('heading')}</Text>
                <TouchableOpacity><Text style={styles.topAllLink}>{i18n.t('view_all')}</Text></TouchableOpacity>
              </View>

              {
                displayData ? 
                <ScrollView showsVerticalScrollIndicator={false}>
                {
                  searchData.map((item, i) =>
                    <TouchableOpacity style={styles.stylesListItem}>
                      <Image source={{ uri: item.image }} style={styles.image} />
                      <Text style={styles.listTitle}>
                        {
                          local === 'en' ?
                          item.translation_title[0].de
                          : local === 'de' ? 
                          item.translation_title[0].de
                          : undefined
                        }
                        </Text>
                      <View style={styles.listFooter}>
                        <Text style={styles.hightlightText}>${item.targetAmmount} </Text>
                        <Text style={styles.plainText}>{i18n.t('found_collected')}</Text>
                        <Text style={[styles.plainText, {
                          transform: [{ translateY: -1 }],
                          marginHorizontal: 3
                        }]}>|</Text>
                        <Text style={styles.hightlightText}>{DayLeft(item.donationDate)}</Text>
                        <Text style={styles.plainText}>{i18n.t('day_left')}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
              </ScrollView>
                :
                <View>
                  <Text style={{
                    color:"#fff",
                    textAlign:"center",
                    fontSize:19,
                    marginTop:150,
                    fontWeight:"bold"
                  }}>{message}</Text>
                </View>
              }
              
            </View>
          </View>
        </View>

      </LinearGradient>

    </Modal>
  )
}

export default Search;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
    backgroundColor: 'rgb(255,255,255)',
  },
  cross: {
    position: "absolute",
    width: 50,
    height: 50,
    right: -3,
    top: 38,
  },
  firstCross: {
    width: 2,
    height: 30,
    backgroundColor: "#fff",
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    left: 0,
    top: 0,
  },
  secondCross: {
    width: 2,
    height: 30,
    backgroundColor: "#fff",
    transform: [{ rotate: "-45deg" }],
    position: "absolute",
  },
  searchField: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "70%",
    alignSelf: "center",
    borderRadius: 15,
    paddingHorizontal: 19,
    paddingVertical: 9,
    position: "relative",
    right: 20,
    top: 30,
  },
  icon: {
    position: "absolute",
    right: 0,
    height: 46,
    borderLeftWidth: 2,
    width: 46,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  searchListWrapper: {
    paddingTop: 35,
    paddingHorizontal: 32,
  },
  image: {
    height: 150,
    borderRadius: 15,
  },
  listTitle: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    fontFamily: "NunitoSansBold",
    marginTop: 12,
    marginBottom: 8,
  },
  listFooter: {
    flexDirection: "row",
    width:"100%",
    flexWrap:"wrap",
  },
  plainText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 25,
    fontFamily: "NunitoSansSemiBold",
    paddingRight: 3,
  },
  hightlightText: {
    color: "#0F286A",
    fontSize: 14,
    lineHeight: 25,
    fontFamily: "NunitoSansSemiBold",
    paddingRight: 3,
  },
  stylesListItem: {
    marginBottom: 50,
  },
  mainHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 30,
  },
  topHeading: {
    fontSize: 20,
    lineHeight: 25,
    color: "#fff",
    fontFamily: "NunitoSansBold",
  },
  topAllLink: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "NunitoSansSemiBold",
    textDecorationLine: "underline",
  }
});
