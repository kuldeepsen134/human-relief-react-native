import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../Data/API';
import { uniqueUser,signUpUser } from '../../store/features/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { en,de } from '../localization/AuthLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

//uniqueUser
const Register = () => {
  const dispatch = useDispatch();
  const { token, loading, isUniqueUser } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [progress, setProgress] = useState(false);

  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  const registerFunction = () => {

    let email_text = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email);

    if (firstName.length == 0) {
      Alert.alert(i18n.t('wrong_input'), i18n.t('first_name_error'), [
        { text: i18n.t('okay') }
      ]);

    } else if (lastName.length == 0) {
      Alert.alert(i18n.t('wrong_input'), i18n.t('last_name_error'), [
        { text: i18n.t('okay') }
      ]);
    } else if (email.length == 0) {
      Alert.alert(i18n.t('wrong_input'), i18n.t('email_error'), [
        { text: i18n.t('okay') }
      ]);
    } else if (email_text === false || email_text === "false") {
      Alert.alert(i18n.t('invalid_email_title'), i18n.t('invalid_email_description'), [
        { text: i18n.t('okay') }
      ]);
    } else if (password.length == 0) {
      Alert.alert(i18n.t('wrong_input'), i18n.t('password_error'), [
        { text: i18n.t('okay') }
      ]);
    } else {

      fetch(`${URL}/api/users/unique/${email}`).then(res => res.json()).then(resp => {
        setProgress(true);
        if (resp.Message === "User Exist") {
          Alert.alert(i18n.t('user_exist_title'), i18n.t('user_exist_description'), [
            { text: i18n.t('okay') }
          ]);
          setProgress(false);
        } else {
          setProgress(true);
          dispatch(uniqueUser(email));
        }
      })
    }

  }


  /*
  const signUpApi = () => {

    fetch(`${URL}/api/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
      })
    }).then(res => res.json()).then(resp => {
      if (resp.token) {
        AsyncStorage.setItem('token', resp.token).then(res => {
          AsyncStorage.setItem('userId', resp.data._id).then(res => {
            setProgress(false);
            navigation.navigate("Home");
          })
        })
        /*
        AsyncStorage.setItem('token',resp.token);
        setProgress(false)
        navigation.navigate("Home");
        *//*
      } else {
        Alert.alert('Login failed', resp.error, [
          { text: 'Okay' }
        ]);
      }
    })
    setProgress(false);
  }
  */


  useEffect(()=>{
    if(!loading) {
      setTimeout(()=>{
        if(isUniqueUser){
          dispatch(signUpUser({firstName,lastName,email,password}));
        }
        else{
          setProgress(false);
        }  
        
        if(token){
          setTimeout(()=>{
            setProgress(false);
           setFirstName("");
            setLastName("");
            setPassword("")
            setEmail("");
            navigation.navigate('Home');
          },300)
        }
      },300)    
    } 
    
  },[loading])

  if(token){
    navigation.navigate('Home');
  }
  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background}
      >
        <Text style={styles.heading}>{i18n.t('signUp_heading')}</Text>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/signUp.png')} />

        <View style={styles.formWrapper}>
          <View style={styles.inputField}>
            <TextInput placeholder={i18n.t('first_name')}
              style={styles.input}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              placeholderTextColor="rgba(15, 40, 106, 0.4)" />
            <FontAwesome name="user" size={20} style={styles.formIcon} />
          </View>

          <View style={styles.inputField}>
            <TextInput placeholder={i18n.t('last_name')}
              style={styles.input}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholderTextColor="rgba(15, 40, 106, 0.4)" />
            <FontAwesome name="user" size={20} style={styles.formIcon} />
          </View>
          <View style={styles.inputField}>
            <TextInput placeholder={i18n.t('email')}
              style={styles.input}
              value={email}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
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
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor="rgba(15, 40, 106, 0.4)" />

            {
              showPassword ? <FontAwesome name="eye"
                onPress={() => setShowPassword(false)}
                size={20}
                style={styles.formIcon} /> :
                <FontAwesome name="eye-slash"
                  onPress={() => setShowPassword(true)}
                  size={20}
                  color="red"
                  style={styles.formIcon} />
            }


          </View>

          <View style={[styles.buttonWrapper]}>
            <TouchableOpacity
              onPress={() => { registerFunction() }}
              style={styles.signUpFormButton}
            >
              <Text style={styles.formButton}>{i18n.t('sign_up_button')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.forgotLink}>{i18n.t('already_member')}</Text>
            </TouchableOpacity>
            {
              progress ? <ActivityIndicator style={{ bottom: -20 }} size="large" /> : <></>
            }
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  background: {
    paddingTop: 70,
    flex: 1,
    height: "100%"
  },
  logo: {
    height: 55,
    width: 55,
    alignSelf: 'center',
    marginBottom: -10,
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  formWrapper: {
    paddingVertical: 87,
    paddingHorizontal: 48,
  },
  input: {
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
  },
  inputField: {
    marginBottom: 29,
    position: "relative",
  },
  formIcon: {
    color: "rgba(99, 133, 221, 1)",
    position: "absolute",
    height: 46,
    top: 0,
    right: 0,
    width: 46,
    padding: 12,
  },
  signUpFormButton: {
    width: 280,
    color: "#fff",
    backgroundColor: "#0F286A",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    textTransform: "uppercase",
    fontFamily: "InriaSansBold",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: "center",
  },
  formButton: {
    color: "#fff",
    textTransform: "uppercase",
    fontFamily: "InriaSansBold",
    width: "100%",
    textAlign: "center"
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  forgotLink: {
    marginTop: 14,
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "InriaSansBold",
    textDecorationLine: "underline"
  },
  dividerText: {
    color: "#fff",
    fontSize: 19,
    lineHeight: 19,
    fontFamily: "InriaSansBold",
    textTransform: "uppercase",
    paddingHorizontal: 10
  },
  dividerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    paddingTop: 50,
  },
  dividerLine: {
    width: 97,
    height: 2,
    backgroundColor: "#fff"
  },
  socialButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 25,
    paddingBottom: 14,
  },
  socialIcon: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  skipLink: {
    marginTop: 14,
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "InriaSansBold",
    textDecorationLine: "underline",
    alignItems: "center",
    width: "100%",
  },
  heading: {
    fontSize: 26,
    lineHeight: 31,
    fontFamily: "InriaSansBold",
    width: "100%",
    color: "#fff",
    textAlign: "center",
    paddingBottom: 12,
  }
})