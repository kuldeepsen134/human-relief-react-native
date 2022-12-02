import { StyleSheet, Text, View, TextInput, TouchableOpacity,ActivityIndicator, Image, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons'; 
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../Data/API';
import { useSelector,useDispatch } from 'react-redux';
import { signinUser, userLogout } from '../../store/features/authReducer';

import { en,de } from '../localization/AuthLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const Login = () => {
  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  const dispatch = useDispatch();
  const {token,loading} = useSelector((state)=>state.auth);

  const [showPassword,setShowPassword] = useState(true);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigation = useNavigation();
  const [progress,setProgress] = useState(false);
 
  const loginFunction=()=>{
    if(email.length == 0){
      Alert.alert(i18n.t('wrong_input'), i18n.t('email_error'), [
        {text: 'Okay'}
      ]);
    }else if(password.length == 0){
      Alert.alert(i18n.t('wrong_input'),  i18n.t('password_error'), [
        {text: 'Okay'} 
      ]);
    }else{
      signInApi();
    }
  }

  const signInApi = () =>{ 
    setProgress(true);
    dispatch(signinUser({email,password})); 
    /*
    setProgress(true);
    fetch(`${URL}/api/login`,{
      method:"POST", 
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        "email":email,
        "password":password
      })
    }).then(res=>res.json()).then(resp=>{
      console.log(resp);
      if(resp.token){
        AsyncStorage.setItem('token',resp.token).then(res=>{
          AsyncStorage.setItem('userId',resp.data._id).then(res=>{
            setProgress(false);
            setEmail("");
            setPassword("");
            navigation.navigate("Home");
          })
        })
      }else{
        if(resp.Message === "User Not Exist"){
          Alert.alert('Login Failed', 'Email Address is not registered', [
            {text: 'Okay'} 
          ]);
        }else if(resp.Message === "Password Incorrect"){
          Alert.alert('Login Failed', 'Incorrect Password', [
            {text: 'Okay'} 
          ]);
        }
        setProgress(false);
      }
      
    })
    */
  }

  useEffect(()=>{
    if(token)
    {
      setProgress(false);
      setEmail("");
      setPassword("");
      navigation.navigate("Home");
    }

    if(!loading){
      setProgress(false);
    }

  },[loading]);

  if(token){
    navigation.navigate("Home");
  }
  
  return (
    <View style={{height:"100%"}}>
      
      <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background} 
      >
        <ScrollView>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/logo.png')} />
        
      <View style={styles.formWrapper}>
        <View style={styles.inputField}>
          <TextInput placeholder={i18n.t('email')} 
            style={styles.input}
            value={email}
            autoCapitalize="none"
            onChangeText={(text)=>setEmail(text)}
            placeholderTextColor="rgba(15, 40, 106, 0.4)" />
            <FontAwesome name="envelope" size={20} style={styles.formIcon} />
        </View>

        <View style={styles.inputField}>
          <TextInput 
            secureTextEntry={showPassword}
            placeholder={i18n.t('password')}
            style={styles.input}
            value={password}
            autoCapitalize="none"
            onChangeText={(text)=>setPassword(text)}
            placeholderTextColor="rgba(15, 40, 106, 0.4)" />
            
            {
              showPassword ? <FontAwesome name="eye" 
                onPress={()=>setShowPassword(false)}  
                size={20} 
                style={styles.formIcon}  /> :
              <FontAwesome name="eye-slash" 
                onPress={()=>setShowPassword(true)} 
                size={20} 
                color="red" 
                style={styles.formIcon}  />
            }
            
            
        </View>

        <View style={[styles.buttonWrapper]}>
          <TouchableOpacity 
            onPress={()=>{loginFunction()}}
            style={{width:120, textAlign:"center"}}>
            <Text style={styles.formButton}>{i18n.t('login_button')}</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotLink}>{i18n.t('forgot_password')}</Text>
          </TouchableOpacity>

          {
            progress ? <ActivityIndicator style={{bottom:-30,position:"absolute"}}  /> : undefined
          }
          
        </View>

        <View style={styles.dividerWrapper}>
          <View style={styles.dividerLine}></View>
          <Text style={styles.dividerText}>{i18n.t('or')}</Text>
          <View style={styles.dividerLine}></View>
        </View>

        <View style={[styles.buttonWrapper,{marginTop:28}]}>
          <TouchableOpacity>
            <Text style={styles.formButton}>{i18n.t('sign_up_with')}</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.socialButton}>
          <TouchableOpacity style={styles.socialIcon}>
            <FontAwesome name="google" size={20} color="#0F286A"  />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialIcon}>
            <FontAwesome name="facebook-square" size={20} color="#0F286A"  />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate("Register")}  style={styles.socialIcon}>
            <FontAwesome name="envelope" size={20} color="#0F286A"  />
          </TouchableOpacity>
        </View>

        {/* 
        <View style={{alignItems:"center",width:"100%"}}>
          <TouchableOpacity onPress={()=>navigation.navigate("Home")} >
            <Text style={styles.skipLink}>SKIP</Text>
          </TouchableOpacity>
        </View>
          */}


        
        <View style={[styles.buttonWrapper,{marginTop:18}]}>
          <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
            <Text style={styles.formButton}>{i18n.t('skip')}</Text>
          </TouchableOpacity>
        </View>
        



      </View>
        </ScrollView>

      </LinearGradient>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  background:{
    paddingTop:70,
    flex:1,
    height:"100%"
  },
  logo:{
    height:78,
    width:211,
    alignSelf: 'center',
    marginBottom:-30,
  },
  logoWrapper:{
    alignItems:"center",
    justifyContent:"center",
  },
  formWrapper:{
    paddingVertical:87,
    paddingHorizontal:48,
  },
  input:{
    backgroundColor:"#fff",
    fontSize:18,
    lineHeight:22,
    color:"#0F286A",
    textDecorationColor:"transparent",
    paddingTop:8,
    paddingRight:12,
    paddingBottom:10,
    paddingLeft:17,
    borderRadius:15,
    fontFamily:"InriaSansBold",
  },
  inputField:{
    marginBottom:29,
    position:"relative",
  },
  formIcon:{
    color:"rgba(99, 133, 221, 1)",
    position:"absolute",
    height:46,
    top:0,
    right:0,
    width:46,
    padding:12,
  },
  formButton:{
    color:"rgba(15, 40, 106, 1)",
    backgroundColor:"#fff",
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:15,
    textTransform:"uppercase",
    fontFamily:"InriaSansBold",
    textAlign:"center"
  },
  buttonWrapper:{
    alignItems:"center",
    justifyContent:"center",
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  forgotLink:{
    marginTop:14,
    color:"#fff",
    fontSize:16,
    lineHeight:19,
    fontFamily:"InriaSansBold",
    textDecorationLine:"underline"
  },
  dividerText:{
    color:"#fff",
    fontSize:19,
    lineHeight:19,
    fontFamily:"InriaSansBold",
    textTransform:"uppercase",
    paddingHorizontal:10
  },
  dividerWrapper:{
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    width:"100%",
    paddingTop:50,
  },
  dividerLine:{
    width:97,
    height:2,
    backgroundColor:"#fff"
  },
  socialButton:{
    flexDirection:"row",
    justifyContent:"center",
    paddingTop:25,
    paddingBottom:14,
  },
  socialIcon:{
    marginHorizontal:10,
    width:40,
    height:40,
    backgroundColor:"#fff",
    borderRadius:100,
    alignItems:"center",
    justifyContent:"center"
  },
  skipLink:{
    marginTop:14,
    color:"#fff",
    fontSize:16,
    lineHeight:19,
    fontFamily:"InriaSansBold",
    textDecorationLine:"underline",
    alignItems:"center",
    width:"100%",
  },
})