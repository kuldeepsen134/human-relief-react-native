import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { URL } from '../componant/Data/API';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { useNavigation } from '@react-navigation/native';
import ProfileUpdateActionSheet from '../componant/ActionSheet/ProfileUpdateActionSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

import { en,de } from '../componant/localization/MyAccountLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const MyAccount = () => {
  const {userId} = useSelector((state)=>state.auth);

  const [firstName, setFirstName] = useState('Loading....');
  const [lastName, setLastName] = useState('Loading....');
  const [email, setEmail] = useState('Loading....');
  const [password, setPassword] = useState();
  const [actionData, setActionData] = useState();
  const navigation = useNavigation();
  const [isDataUpdated,setIsDataUpdated] = useState();
  const [isDataload,setIsDataload] = useState(false);
  //const [userId,setUserid] = useState();

  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    showCloseButton: true,
    height: 700,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    closeIconStyle: {
      backgroundColor: "#000",
      color: "red"
    },
    barStyle: {
      backgroundColor: "#ddd"
    },
 
    closeOnTouchOutside: true
  });

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const ID = "62e13c5a5ea8ce643288d833"
 
  
  
  useEffect(() => {
    getId();
    loadingProfileData();
  },[isDataUpdated]);

  const loadingProfileData = () =>{
    fetch(`${URL}/api/users/profile/${userId}`).then(res => res.json()).then(resp => {
      setFirstName(resp[0].firstName);
      setLastName(resp[0].lastName);
      setEmail(resp[0].email);
      setPassword(resp[0].password);
      console.log(resp[0])
      setIsDataload(true);
      setTimeout(()=>{
        setIsDataload(false);
      },300)
    })
  }

  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      
      const loginToken = JSON.parse(value);
 
      if(loginToken !== null) {
        setUserid(loginToken.userId) 
      }
    } catch(e) {
      // error reading value
    }
  }

  const manageEdit = (editData) => {
    setActionData(editData);
    SheetManager.show("editProfileActionSheet");
  }

  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background} >
        <ScrollView style={styles.MyAccountWrapper}>
          <Image source={{ uri: 'https://socialit.in/jewellery/images/home/team/1.png' }} style={styles.profileImage} />

          <TouchableOpacity
            onPress={() => manageEdit('firstname')}
            style={styles.inputFiledWrapper}>
            <Text style={styles.inputFiledText}>{firstName} </Text>
            <Text style={styles.inputFiledEdit}>{i18n.t('edit')} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => manageEdit('lastname')}
            style={styles.inputFiledWrapper}>
            <Text style={styles.inputFiledText}>{lastName} </Text>
            <Text style={styles.inputFiledEdit}>{i18n.t('edit')} </Text>
          </TouchableOpacity>

          <View
            style={styles.inputFiledWrapper}>
            <Text style={styles.inputFiledText}>{email} </Text>
          </View>

          <TouchableOpacity
            onPress={() => manageEdit('password')}
            style={styles.inputFiledWrapper}>
            <Text style={styles.inputFiledText}>******* </Text>
            <Text style={styles.inputFiledEdit}>{i18n.t('edit')} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.inputFiledWrapper}>
            <Text style={styles.inputFiledText}>*******560 </Text>
            <Text style={styles.inputFiledEdit}>{i18n.t('edit')} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.inputFiledWrapper}
            onPress={() => navigation.navigate('Notification')}
          >
            <Text style={styles.inputFiledText}>{i18n.t('notification')} </Text>
          </TouchableOpacity>

        </ScrollView>
      </LinearGradient>

      <ActionSheet
        id="editProfileActionSheet"
        headerAlwaysVisible={true}
        animated={true}
        gestureEnabled={true}
        closable={true}
      >
        <ProfileUpdateActionSheet 
          setIsDataUpdated={setIsDataUpdated} 
          actionData={actionData} 
          userId={userId} 
          URL={URL} 
          firstName={firstName}
          lastName={lastName}
          password={password}
          />
      </ActionSheet>
    </View>
  )
}

export default MyAccount;

const styles = StyleSheet.create({
  background: {
    paddingTop: 10,
    flex: 1,
    height: "100%"
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 47,
    marginTop: 20,
    alignSelf: "center",
  },
  MyAccountWrapper: {
    paddingHorizontal: 12,
  },
  inputFiledText: {
    fontSize: 18,
    lineHeight: 22,
    color: "#000",
    fontFamily: "InriaSansRegular",
  },
  inputFiledEdit: {
    textDecorationLine: "underline",
    fontSize: 12,
    lineHeight: 13,
    color: "#000",
    fontFamily: "InriaSansRegular",
  },
  inputFiledWrapper: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  
})