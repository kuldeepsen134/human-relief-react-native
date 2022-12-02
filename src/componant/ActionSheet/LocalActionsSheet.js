import { StyleSheet, Text, View,TouchableOpacity, ActivityIndicator } from 'react-native'
import React,{useState, useEffect} from 'react';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { setLocal } from '../../store/features/localReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Language } from '../localization/Language';
const LocalActionsSheet = () => {
  
  const dispatch = useDispatch();
  const { localLoading,local } = useSelector((state)=>state.local);

 const [currentLanguage, setCurrentLanguage] = useState("en");

 const openModal = (langId) =>{
  setCurrentLanguage(langId);
  dispatch(setLocal(langId));
  SheetManager.hide('localActionSheet');
  }

  useEffect(()=>{
    setCurrentLanguage(local);
  },[])

  useEffect(()=>{
    setTimeout(()=>{
      if(!localLoading){
        const currentlangid = Language.filter((item)=> item.id === currentLanguage);
      }
    },300)
  },[localLoading])
  return (
    <View>
      <View style={styles.modalView}>
          <Text style={styles.mainHeading}>
            Language 
            { localLoading ? <ActivityIndicator style={styles.activityStyle}/> : undefined}
            
          </Text>
          <View style={styles.divider}/>
          {
            Language.map((item)=>
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
  )
}

export default LocalActionsSheet

const styles = StyleSheet.create({
  modalView: {
      backgroundColor: 'rgba(255,255,255,0.90)',
      borderRadius: 20,
      paddingTop: 24,
      paddingLeft:30,
      paddingRight:30,
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
      fontSize:17,
      lineHeight:24,
      fontFamily:"NunitoSansSemiBold",
      paddingLeft:10,
  },
  languageSelector:{
      position:"relative",
      borderWidth:2,
      borderColor:"#000",
      width:20,
      height:20,
      borderRadius:50,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"#fff"
  },
  languageInnerCircle:{
      width:8,
      height:8,
      borderRadius:12,
  },
  languageList:{
      flexDirection:"row",
      alignItems:"center",
      paddingBottom:15,
  },
  mainHeading:{
      fontSize:24,
      lineHeight:24,
      fontFamily:"NunitoSansSemiBold",
      paddingLeft:0,
      paddingBottom:10,
  },
  activityStyle:{
    transform: [{ translateY: 3 },{ translateX: 10 }]
  },
  divider:{
    width:"100%",
    height:3,
    backgroundColor:"#eee",
    marginBottom:20,
  }
});
