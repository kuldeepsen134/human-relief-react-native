import { StyleSheet, Text, View, Switch } from 'react-native'
import React,{useEffect, useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import BellIcon from '../componant/svg/BellIcon';
import FingerPrintIcon from '../componant/svg/FingerPrintIcon';
import HalfMoonIcon from '../componant/svg/HalfMoonIcon';
import LanguageIcon from '../componant/svg/LanguageIcon';
import LockIcon from '../componant/svg/LockIcon';

import { Setting } from '../componant/Data/Setting';

const SettingScreen = () => {

  const [setting,setSetting] = useState([])
 
  useEffect(()=>{
    setSetting(Setting);
  },[]);

  const toggleSwitch = (settingItem) =>{
    let updatedSwitch = setting.filter((item)=>{
      if(item.id == settingItem){
        if(item.status){
          item.status=false;
        }else{
          item.status=true;
        }
        
        return item;
      }else{
        return item
      }
    })
    setSetting(updatedSwitch);
  }

  return (
    <View style={{height:"100%"}}>
       <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background} >

        <View style={styles.wrapper}>
          {
            setting.map((item)=>
              <View style={styles.settingList} key={item.id}>
                <View style={styles.icon}>
                  {
                    item.icon === "lang" ? 
                      <LanguageIcon /> : 
                    item.icon === "bell" ? 
                      <BellIcon /> :
                    item.icon === "fingerprint" ? 
                      <FingerPrintIcon /> :
                    item.icon === "lock" ? 
                      <LockIcon /> :
                      <HalfMoonIcon />
                  }
                </View>
                <Text style={styles.heading}>{item.title}</Text>
                <View style={styles.status}>
                  <Switch 
                  value={item.status}
                  thumbColor={item.status ? 'rgba(15, 40, 106, 1)' : '#777'}
                  trackColor={{true: 'rgba(15, 40, 106, 0.5)', false: '#eee'}}
                  
                  onValueChange={()=>toggleSwitch(item.id)}
   
                  />
                </View>
              </View>
            )
          }
        </View>
        
      </LinearGradient>
    </View>
  )
}

export default SettingScreen;

const styles = StyleSheet.create({
  background:{
    paddingTop:10,
    flex:1,
    height:"100%"
  },
  wrapper:{
    paddingLeft:23,
    paddingRight:23,
    paddingTop:99,
  },
  settingList:{
    backgroundColor:"#fff",
    marginBottom:30,
    paddingHorizontal:11,
    borderRadius:15,
    flexDirection:"row",
    alignItems:"center"
  },
  heading:{
    fontSize:16,
    lineHeight:19,
    color:"#0F286A",
    fontFamily:"ItimRegular",
    flex:1,
    paddingLeft:20,
  },
  icon:{
    width:30,
    paddingLeft:10,
    alignItems:"center",
    justifyContent:"center"
  },
  status:{
    width:30,
  }
})