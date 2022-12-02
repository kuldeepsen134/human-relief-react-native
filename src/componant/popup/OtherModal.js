import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';

import { en,de } from '../localization/NavigationLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const OtherModal = ({modalState,manageOtherModal}) => {
  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  return (
    <View>
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalState}
      onPress={()=>manageOtherModal()}
      >
      <View style={styles.modalWrapper}>
        <View style={styles.modalView}>
          <TouchableOpacity 
            style={styles.othertList}
            onPress={()=>manageOtherModal()}>
            <View style={styles.otherIcon} ><MaterialCommunityIcons name="card-account-details" size={24} color="#0F286A" /></View>
            <Text style={styles.OtherListTitle}>{i18n.t('report')}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.othertList}
            onPress={()=>manageOtherModal()}>
            <View style={styles.otherIcon} ><FontAwesome name="handshake-o" size={24} color="#0F286A" /></View>
            <Text style={styles.OtherListTitle}>{i18n.t('help')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
  )
}

export default OtherModal;

const styles = StyleSheet.create({
    modalWrapper: {
      flex: 1,
      alignItems:"flex-start",
      marginTop: -30,
      backgroundColor:"transparent",
      right:-50,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width:187,
        margin: 100,
        backgroundColor: 'rgba(255,255,255,0.90)',
        borderRadius: 15,
        alignItems:"flex-start",
        shadowColor: '#000',
        shadowOffset: {
          width: 15,
          height: 15,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 0,
        paddingTop: 18,
        paddingRight:14,
        paddingLeft:14,
        paddingBottom:10,
    },
    othertList:{
      flexDirection:"row",
      paddingBottom:13,
    },
    otherIcon:{
      width:40,
      alignItems:"center"
    },
    OtherListTitle:{
      color:"#0F286A",
      fontSize:18,
    }
  });
  