import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native'
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, FontAwesome  } from '@expo/vector-icons'; 
import {useSelector} from 'react-redux';

import { en,de } from '../componant/localization/SupportLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const Support = () => {

  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;


  return (
    <View style={{height:"100%"}}>
        <LinearGradient
            colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
            style={styles.background} >
          
          <View>
            <View style={styles.suportHeaderWrapper}>
              <Text style={styles.suportHeading}>{i18n.t('title')}</Text>
              <MaterialCommunityIcons name="handshake" size={24} color="#FFFFFF" />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.supportEmailLinkWrapper}
            onPress={() => Linking.openURL('mailto:info@humanrelief.com?subject=Support&body=body')}>
            <View style={styles.supportEmailWrapper}>
              <Text style={styles.supportEmail}>{i18n.t('email_title')}</Text>
              <FontAwesome name="envelope" size={24} color="#0F286A" />
            </View>
          </TouchableOpacity>

          <View style={styles.supportTextWrapper}>
            <Text style={styles.supportText}>{i18n.t('message')}</Text>
          </View>

        </LinearGradient>
    </View>
  )
}

export default Support;

const styles = StyleSheet.create({
  background:{
    paddingTop:10,
    flex:1,
    height:"100%"
  },
  suportHeaderWrapper:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    paddingTop:20,
  },
  suportHeading:{
    fontSize:22,
    lineHeight:25,
    color:"#fff",
    fontFamily:"ItimRegular",
    paddingRight:10,
  },
  supportEmailLinkWrapper:{
    alignItems:"center",
    justifyContent:"center",
    paddingTop:30,
  },
  supportEmailWrapper:{
    backgroundColor:"#fff",
    flexDirection:"row",
    paddingHorizontal:18,
    paddingVertical:8,
    borderRadius:15,
  },
  supportEmail:{
    fontSize:22,
    lineHeight:25,
    color:"#0F286A",
    fontFamily:"ItimRegular",
    marginRight:26,
  },
  supportText:{
    fontSize:16,
    lineHeight:20,
    color:"#fff",
    fontFamily:"NunitoSansRegular",
    width:"60%",
    textAlign:"center",
  },
  supportTextWrapper:{
    alignItems:"center",
    justifyContent:"center",
    paddingTop:33,
  }
})