import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { URL } from '../componant/Data/API';
import CampaignListSkelton from '../componant/skeleton/CampaignListSkelton';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProcessIndecator from '../componant/ListItem/ProcessIndecator';

import { en, de } from '../componant/localization/CampaignLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';


const CampaignListScreen = ({ route, navigation }) => {
  const { catagoryId, catagoryName } = route.params;
  const [visible, setVisible] = useState(true);
  const [category, setCategory] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const [indicator, setIndicator] = useState(false);

  const { local } = useSelector((state) => state.local);
  const i18n = new I18n({ en, de });
  i18n.enableFallback = true;
  i18n.locale = local;

  useEffect(() => {
    fetchCategory();
  }, [])
  const fetchCategory = () => {
    fetch(`${URL}/api/donationSearchByCategory/${catagoryName}`).
      then((response) => response.json()).
      then((response) => {
        setCategory(response);
        setVisible(false);
      })
  }

  const removeFromWishilist = (data) => {
    setIndicator(true);
    let pid = data._id;
    let wishlistData = data.wishlist.filter((item) => item.id != userId);
    UpdateWishlist({ id: pid, wishlistData });
  }

  const addToWishilist = (data) => {
    setIndicator(true);
    let pid = data._id;
    let wishlistData = data.wishlist;
    wishlistData.push({ "id": userId });
    UpdateWishlist({ id: pid, wishlistData });
  }

  const UpdateWishlist = ({ id, wishlistData }) => {
    fetch('https://human-relief-api.herokuapp.com/api/wishlistHandle/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "wishlist": wishlistData
      })
    }).then((response) => response.json()).then((response) => {
      if (response.modifiedCount === 1) {
        fetchCategory();
        setTimeout(() => {
          setIndicator(false);
        }, 300)
      }
    })
  }

  const loginAlert = (title, message) => {
    Alert.alert(
      "Login Alert", "Please login to add this item to wishlist",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Login", onPress: () => navigation.navigate('Login') }
      ]
    );
  }

  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background} >
        {
          visible ?
            <CampaignListSkelton />
            :

            <FlatList
              style={{
                paddingVertical: 14,
                paddingHorizontal: 14,
              }}
              ListHeaderComponent={
                <Text style={{
                  color: "#fff",
                  fontSize: 20,
                  lineHeight: 26,
                  fontFamily: "NunitoSansBold",
                  paddingBottom: 17,
                }}>{catagoryName}</Text>
              }
              data={category}
              renderItem={({ item }) =>
                <View style={{
                  backgroundColor: "#fff",
                  marginBottom: 37,
                  borderRadius: 15,
                  overflow: "hidden"
                }}>
                  <TouchableOpacity onPress={() => navigation.navigate('CampaignDetails', { id: item._id })}>
                    <Image
                      style={{ height: 140 }}
                      source={{
                        uri: item.image,
                      }}
                    />
                  </TouchableOpacity>

                  <View style={{
                    paddingTop: 20,
                    paddingLeft: 14,
                    paddingRight: 14,
                    paddingBottom: 15,
                  }}>
                    <Text style={{
                      color: "#000000",
                      fontSize: 16,
                      lineHeight: 26,
                      fontFamily: "NunitoSansBold",

                    }}>
                      {
                        local === 'en' ?
                          item.translation_title[0].en
                          :
                          local === 'de' ?
                            item.translation_title[0].de
                            :
                            undefined
                      }
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        color: "#000000",
                        fontSize: 14,
                        lineHeight: 26,
                        fontFamily: "NunitoSansRegular",
                      }}
                    >
                      {
                        local === 'en' ?
                          item.translation_description[0].en
                          :
                          local === 'de' ?
                            item.translation_description[0].de
                            :
                            undefined
                      }
                    </Text>
                  </View>

                  <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#CFD2F1",
                    paddingHorizontal: 22,
                    paddingVertical: 11,
                    borderRadius: 15,
                  }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <TouchableOpacity>
                        <FontAwesome name="share-alt" size={25} color="#0F286A" />
                      </TouchableOpacity>
                      <Text style={{
                        paddingLeft: 14,
                        color: "#0F286A",
                        fontFamily: "NunitoSansBold"
                      }}>{i18n.t('share')}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      {
                        userId ?
                          <>
                            {
                              item.wishlist.length != 0 ?
                                item.wishlist.map((ci) =>
                                  ci.id === userId ?
                                    <TouchableOpacity onPress={() => removeFromWishilist(item)}>
                                      <AntDesign name="heart" size={22} color="red" />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => addToWishilist(item)}>
                                      <AntDesign name="heart" size={22} color="#FFFFFF" />
                                    </TouchableOpacity>
                                )
                                :
                                <TouchableOpacity onPress={() => addToWishilist(item)}>
                                  <AntDesign name="heart" size={22} color="#FFFFFF" />
                                </TouchableOpacity>
                            }
                          </>
                          :
                          <TouchableOpacity onPress={() => loginAlert()}>
                            <AntDesign name="heart" size={22} color="#FFFFFF" />
                          </TouchableOpacity>
                      }
                      <TouchableOpacity onPress={() => navigation.navigate('CampaignDetails', { id: item._id })}>
                        <Text style={{
                          color: "#0F286A",
                          fontSize: 14,
                          lineHeight: 26,
                          fontFamily: "NunitoSansBold",
                          borderColor: "#0F286A",
                          borderWidth: 1,
                          backgroundColor: "#fff",
                          paddingHorizontal: 14,
                          paddingVertical: 5,
                          borderRadius: 15,
                          marginLeft: 16,
                        }}>{i18n.t('button')}</Text>
                      </TouchableOpacity>
                    </View>



                  </View>
                </View>
              }
            />
        }

      </LinearGradient>
      <ProcessIndecator indicator={indicator} />
    </View>
  )
}

export default CampaignListScreen

const styles = StyleSheet.create({
  background: {
    paddingTop: 10,
    flex: 1,
    height: "100%"
  },
})