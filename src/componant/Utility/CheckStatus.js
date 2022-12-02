import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
export const isLogin= async ()=>{
  const [isLogin,setIsLogin] = useState(false);
  try {
    const value = await AsyncStorage.getItem('token')
    if(value !== null) {
      setIsLogin(true)
    }else{
      setIsLogin(false);
    }
  } catch(e) {
    // error reading value
  }

  return(isLogin);
}