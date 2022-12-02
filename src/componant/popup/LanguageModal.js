import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';


const LanguageModal = ({modalState,manageModal,language}) => {

 const LanguageSwitcher = [
    {
        id:"de",
        lang:"German",
        language:"G",
    },
    {
        id:"en",
        lang:"English - EN",
        language:"E",
    },
    {
        id:"ar",
        lang:"Arabic",
        language:"A",
    },
    {
        id:"es-ES",
        lang:"Spanish",
        language:"S",
    },
    {
        id:'fr',
        lang:"French",
        language:"F",
    },
    {
        id:"bs",
        lang:"Bosnich",
        language:"B",
    },
    {
        id:"tr",
        lang:"Turkish",
        language:"T",
    },
    {
        id:"sq",
        lang:"Albanese",
        language:"A",
    }
 ]; 

 const openModal = (selectedLanguage) =>{
    setCurrentLanguage(selectedLanguage);
    const currentlangid = LanguageSwitcher.filter((item)=> item.id === selectedLanguage);
    language(currentlangid[0].language);
    console.log(currentlangid);
    setTimeout(()=>{
        manageModal();
    },500)
 }

 //const [modalVisible, setModalVisible] = useState(false);
 const [currentLanguage, setCurrentLanguage] = useState("en");
  return (
    <View>
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalState}
      >
      <View style={styles.modalWrapper}>
        <View style={styles.modalView}>
          {
            LanguageSwitcher.map((item)=>
                <TouchableOpacity onPress={()=> openModal(item.id)}>
                <View style={styles.languageList}>
                    <View style={styles.languageSelector}>
                        <View style={[styles.languageInnerCircle,{backgroundColor: currentLanguage === item.id ? "#0F286A" : "#fff",}]}></View>
                    </View>
                    <Text style={styles.languageTitle}>{item.lang}</Text>
                </View>
                </TouchableOpacity>
                )
          }
        </View>
      </View>
    </Modal>
  </View>
  )
}

export default LanguageModal;

const styles = StyleSheet.create({
    modalWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor:"transparent",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width:320,
        margin: 100,
        backgroundColor: 'rgba(255,255,255,0.90)',
        borderRadius: 20,
        paddingTop: 44,
        paddingLeft:63,
        paddingRight:63,
        paddingBottom:20,
        alignItems:"flex-start",
        shadowColor: '#000',
        shadowOffset: {
          width: 15,
          height: 15,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 0,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    languageTitle:{
        fontSize:20,
        lineHeight:26,
        fontFamily:"NunitoSansSemiBold",
        paddingLeft:12,
    },
    languageSelector:{
        position:"relative",
        borderWidth:2,
        borderColor:"#000",
        width:28,
        height:28,
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#fff"
    },
    languageInnerCircle:{
        width:12,
        height:12,
        borderRadius:12,
    },
    languageList:{
        flexDirection:"row",
        alignItems:"center",
        paddingBottom:15,
    }
  });
  