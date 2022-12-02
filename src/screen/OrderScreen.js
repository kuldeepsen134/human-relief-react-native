import { StyleSheet, Text, View, Image, TouchableOpacity,BackHandler } from 'react-native'
import React,{useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


import { en,de } from '../componant/localization/NavigationLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Cart');
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background} >
        <View style={styles.innerWrapper}>
          <Image source={require('../../assets/images/success.png')} style={styles.image} />
          <Text style={styles.title}>{i18n.t('order_success_label')}</Text>

          <View>
          <TouchableOpacity>
              <Text style={styles.button}>{i18n.t('view_order')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('HomeScreen') } >
              <Text style={styles.button}>{i18n.t('goto_home')}</Text>
            </TouchableOpacity>

          </View>
        </View>

      </LinearGradient>
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  background: {
    paddingTop: 10,
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    color: "#000",
    fontSize: 35,
    marginTop: 40,
    lineHeight: 35,
    fontFamily: "ItimRegular",
    marginBottom:15
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  innerWrapper: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
    borderRadius: 25,
    marginBottom: 50,
    elevation: 20,
  },
  button: {
    textAlign: "center",
    backgroundColor: "#0F286A",
    width:230,
    borderRadius:15,
    marginTop:15,
    color:"#fff",
    fontFamily:"NunitoSansSemiBold",
    fontSize:17,
    padding:7,
  }
})