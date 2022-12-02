import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { DayLeft } from '../Utility/DayLeft';
import { useSelector } from 'react-redux';
import { en, de } from '../localization/CampaignLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const ListViewSliderHoriZontal = ({ item, handleListClick, userId, loginAlert, removeFromWishilist, addToWishilist }) => {
  const { local } = useSelector((state) => state.local);
  const i18n = new I18n({ en, de });
  i18n.enableFallback = true;
  i18n.locale = local;

  return (
    <TouchableOpacity onPress={() => handleListClick(item._id)}>
      <View style={{
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingHorizontal: 18,
        paddingVertical: 20,
        flexDirection: "row",
        marginBottom: 17,
        position: "relative"
      }}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 15,
          }}
          source={{ uri: item.image }}
        />

        <View style={{
          marginLeft: 22,
          paddingRight: 80,
          flexDirection: "column",
        }}>

          <Text style={{
            fontSize: 14,
            lineHeight: 26,
            paddingBottom: 10,
            color: "#0F286A",
            fontFamily: "NunitoSansRegular",
          }}>
            {
              local === 'en' ?
                item.category[1].title
                :
                local === 'de' ?
                  item.category[1].title_de
                  :
                  undefined
            }
          </Text>

          <Text style={{
            fontSize: 14,
            lineHeight: 20,
            color: "#000",
            fontFamily: "NunitoSansRegular",
            paddingRight: 20,
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

          <View style={{ flexDirection: "row" }}>
            <Text style={{
              fontSize: 14,
              lineHeight: 26,
              color: "#0F286A",
              fontFamily: "NunitoSansRegular",
              paddingRight: 10,
            }}>{DayLeft(item.donationDate)}</Text>

            <Text style={{
              fontSize: 14,
              lineHeight: 26,
              color: "#B7B2B2",
              fontFamily: "NunitoSansRegular",
            }}>{i18n.t('datLeft')}</Text></View>

          <View style={{
            position: "absolute",
            right: 100,
            top: -3,
          }}>
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
                            <AntDesign name="heart" size={22} color="#ddd" />
                          </TouchableOpacity>
                      )
                      :
                      <TouchableOpacity onPress={() => addToWishilist(item)}>
                        <AntDesign name="heart" size={22} color="#ddd" />
                      </TouchableOpacity>
                  }
                </>
                :
                <TouchableOpacity onPress={() => loginAlert()}>
                  <AntDesign name="heart" size={22} color="#ddd" />
                </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListViewSliderHoriZontal

const styles = StyleSheet.create({})