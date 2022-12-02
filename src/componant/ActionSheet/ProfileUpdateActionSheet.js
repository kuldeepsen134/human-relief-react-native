import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import {useState, useEffect} from 'react';
import { SheetManager } from 'react-native-actions-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { en,de } from '../localization/MyAccountLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import {useSelector} from 'react-redux';


const ProfileUpdateActionSheet = ({actionData,URL,setIsDataUpdated,firstName,lastName,userID}) => {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [currentFirstName, setCurrentFirstName] = useState();
  const [currentLastName, setCurrentLastName] = useState();
  const [message, setMessage] = useState("");
  const [process, setProcess] = useState(false);
  //const [userID, setUserID] = useState(false);

  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  useEffect(()=>{
    getId();
    setCurrentFirstName(firstName);
    setCurrentLastName(lastName);
  },[])


  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem('userId')
      if(value !== null) {
        setUserID(value) 
      }
    } catch(e) {
      // error reading value
    }
  }

  const updateFirstName = () =>{
    if(currentFirstName == "" || currentFirstName == null){
      setMessage(i18n.t('first_name_validation'));
    }else{
      updateData({"firstName":currentFirstName})
    }
  }

  const updateLastName = () =>{
    if(currentLastName == "" || currentLastName == null){
      setMessage(i18n.t('last_name_validation'));
    }else{
      updateData({"lastName":currentLastName})
    }
  }

  const updateData = async (updateInput) =>{
    setProcess(true);
    setMessage('');
    fetch(`${URL}/api/users/update/${userID}`,{
      method:"PUT",
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(updateInput)
    }).then(res=>res.json()).then(resp=>{
      if(resp.modifiedCount === 1)
      {
        setIsDataUpdated(Math.random());
        setTimeout(()=>{
          setProcess(false);
          SheetManager.hide("editProfileActionSheet");
        },300)
      }
    });
  }

  const passwordChange = (updateInput) =>{
    setProcess(true);
    setMessage('');
    fetch(`${URL}/api/users/changePassword/${userID}`,{
      method:"PUT",
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(updateInput)
    }).then(res=>res.json()).then(resp=>{
      if(resp.modifiedCount === 1)
      {
        setIsDataUpdated(Math.random());
        setTimeout(()=>{
          setProcess(false);
          SheetManager.hide("editProfileActionSheet");
        },300)
      }
    });
  }

  const updateUserPassword = () =>{
    if(newPassword == "" || newPassword == null){
      setMessage(i18n.t('password_name_validation'));
    }else { 
      passwordChange({"password":newPassword})
    }
  }

  return (
    <>
    <View style={styles.editActiondWrapper}>
          {
            actionData === "firstname" ?
              <>
                <Text style={styles.title}>{i18n.t('update_profile')}</Text>
                <Text style={styles.inputFiledText2}>{i18n.t('first_name')}</Text>
                <TextInput
                  placeholder={i18n.t('first_name')}
                  style={styles.inputFiledInput2}
                  value={currentFirstName}
                  onChangeText={(text)=>setCurrentFirstName(text)}
                />
                <TouchableOpacity 
                  onPress={()=>updateFirstName()}
                >
                  <Text style={styles.button}>{i18n.t('update')}</Text>
                </TouchableOpacity>
              </>
              : actionData === "lastname" ? 
              <>
                <Text style={styles.title}>{i18n.t('update_profile')}</Text>
                <Text style={styles.inputFiledText2}>{i18n.t('last_name')}</Text>
                <TextInput
                  placeholder={i18n.t('last_name')}
                  style={styles.inputFiledInput2}
                  value={currentFirstName}
                  onChangeText={(text)=>setCurrentLastName(text)}
                />
                <TouchableOpacity 
                  onPress={()=>updateLastName()}
                >
                  <Text style={styles.button}>{i18n.t('update')}</Text>
                </TouchableOpacity>
              </>
              : actionData === "password" ? 
              <>
                <Text style={styles.title}>{i18n.t('update_profile')}</Text>
                <Text style={styles.inputFiledText2}>{i18n.t('password')}</Text>
                <TextInput

                  placeholder={i18n.t('password')}
                  style={styles.inputFiledInput2}
                  value={newPassword}
                  secureTextEntry={true}
                  onChangeText={(text)=>setNewPassword(text)}
                />
                <TouchableOpacity onPress={()=>updateUserPassword()}>
                  <Text style={styles.button}>{i18n.t('update')}</Text>
                </TouchableOpacity>

              </>
              :
              <></>
            }

        {
          message == "" ? <></> : <Text style={styles.error}>{message}</Text>
        }
        {
          process ? <ActivityIndicator style={{marginTop:5}} size="large" /> : <></>
        }
        </View>
        <TouchableOpacity
          onPress={() => SheetManager.hide("editProfileActionSheet")}
          style={styles.crossBar}>
          <View style={[styles.crossItem, { transform: [{ rotate: '45deg' }] }]}></View>
          <View style={[styles.crossItem, { transform: [{ rotate: '-45deg' }] }]}></View>
        </TouchableOpacity>
    </>
  )
}

export default ProfileUpdateActionSheet

const styles = StyleSheet.create({
  editActiondWrapper: {
    paddingTop: 15,
    paddingHorizontal: 30,
    paddingBottom: 40,
    position: "relative"
  },
  inputFiledText2: {
    fontSize: 18,
    lineHeight: 22,
    color: "#000",
    fontFamily: "InriaSansRegular",
    marginBottom: 10,
  },
  inputFiledInput2: {
    backgroundColor: "#fff",
    fontSize: 18,
    lineHeight: 22,
    color: "#0F286A",
    textDecorationColor: "transparent",
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 10,
    paddingLeft: 17,
    borderRadius: 15,
    fontFamily: "InriaSansBold",
    borderColor: "#000",
    borderWidth: 1,
  },
  button: {
    fontSize: 18,
    width: 280,
    color: "#fff",
    backgroundColor: "#0F286A",
    borderRadius: 15,
    textTransform: "uppercase",
    fontFamily: "InriaSansBold",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    textAlign: "center"
  },
  title: {
    fontSize: 24,
    lineHeight: 25,
    color: "#0F286A",
    fontFamily: "ItimRegular",
    marginBottom: 20,
  },
  crossBar: {
    position: "absolute",
    top: 31,
    right: 35,
    width: 25,
    height: 25,
  },
  crossItem: {
    width: 25,
    height: 2,
    backgroundColor: "#000",
    position: "absolute",
    left: 0,
    top: 10,
  },
  error:{
    textAlign:"center",
    padding:5,
    color: "red",
    borderWidth:1,
    marginTop:10,
    borderColor:"red",
    fontWeight:"bold",
    borderRadius:5,
  }
})