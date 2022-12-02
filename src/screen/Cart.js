import { RefreshControl, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCart, deleteCart } from '../store/features/cartReducer';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { en,de } from '../componant/localization/CartLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const Cart = () => {
  const { token, userId } = useSelector((state) => state.auth);
  const { loading, cartData } = useSelector((state) => state.cart);
  const [login, setLogin] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setLogin(true);
      setTimeout(()=>{
        dispatch(getCart({ userId }));
      },300)
    }
  }, [])

  const total = () => {
    let sum = 0;
    cartData.map(item => {
      sum = sum + item.price;
    })
    return sum;
  }

  const deleteSingleCart = (cartId) => {
    dispatch(deleteCart({ cartId }))
    setTimeout(() => {
      if (!loading) {
        dispatch(getCart({ userId }));
      }
    }, 300)
  }


  const onRefresh = React.useCallback(() => {
    dispatch(getCart({ userId }));
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background} >
        {
          login ?
            <>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={{
                  paddingHorizontal: 10,
                }}>
                {
                  cartData.length === 0 ?
                    <View style={styles.emptyCartWrapper}>
                      <MaterialCommunityIcons name="cart-heart" size={124} color="#fff" />
                      <Text style={styles.emptyCartTItle}>{i18n.t('cart_empty')}</Text>
                    </View> : <></>
                }

                {
                  cartData.map((item) =>
                    <View style={styles.mainCartWrapper}>
                      <Image source={{ uri: item.image }} style={styles.cartImage} />
                      <Text style={styles.cartTitle}>{item.title}</Text>
                      <View style={{
                        width: 70,
                        marginRight: 10,
                      }}>

                        <Text style={styles.cartPrice}>$ {item.price}</Text>
                      </View>
                      <TouchableOpacity onPress={() => deleteSingleCart(item._id)}>
                        <FontAwesome name="trash" size={15} color="#fff" style={styles.removeCartIcon} />
                      </TouchableOpacity>
                    </View>
                  )
                }
              </ScrollView>

              <View style={styles.totalWrapper}>
                {
                  cartData.length === 0 ?
                    <TouchableOpacity onPress={()=> navigation.navigate('HomeScreen') } >
                      <Text style={[styles.totalButton, { marginBottom: 15, }]}>{i18n.t('continue_button')}</Text>
                    </TouchableOpacity>
                    :
                    <>
                      <View style={styles.totalContainer}>
                        <Text style={styles.totalHeading}>{i18n.t('total_amount')} </Text>
                        <Text style={styles.totalHeading}>$ {total()}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={()=> navigation.navigate('Checkout',{amt:total(),userId:userId,item:cartData}) }
                        >
                        <Text style={styles.totalButton}>{i18n.t('choose_payment_method')} </Text>
                      </TouchableOpacity>
                    </>
                }
              </View>
 
            </>  
            :
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#fff", fontSize: 30 }}>{i18n.t('cart')}</Text>
              <Text style={{ color: "#fff", paddingHorizontal:30,textAlign:"center"}}>{i18n.t('login_message')} </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('Login') } >
                <Text style={styles.totalButton}>{i18n.t('login')} </Text> 
              </TouchableOpacity>
            </View>
        }

      </LinearGradient>
    </View>
  )
}

export default Cart;

const styles = StyleSheet.create({
  background: {
    paddingTop: 10,
    flex: 1,
    height: "100%"
  },
  totalWrapper: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopColor: "#000",
    borderTopWidth: 1,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1.2,
    borderColor: "#000",
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 6,
    borderRadius: 5,
  },
  totalHeading: {
    fontFamily: "ItimRegular",
    fontSize: 18
  },
  totalButton: {
    backgroundColor: "#0F286A",
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 18,
    marginTop: 10,
    borderRadius: 10,
  },
  cartTitle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 19,
    color: "#000",
    paddingLeft: 17,
    paddingRight: 17,
    fontFamily: "ItimRegular",
    marginTop: -3,
  },
  removeCartIcon: {
    backgroundColor: "red",
    borderWidth: 1.2,
    borderColor: "red",
    paddingTop: 10,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 8,
    borderRadius: 3,
  },
  emptyCartWrapper: {
    paddingTop: 120,
    alignItems: "center",
  },
  emptyCartTItle: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 30,
    color: "#fff"
  },
  mainCartWrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 19,
    flexWrap: "wrap",
    marginBottom: 22,
    borderRadius: 15,
  },
  cartPrice: {
    color: "#000",
    fontFamily: "ItimRegular",
    borderWidth: 1.2,
    borderRadius: 3,
    paddingTop: 8,
    paddingHorizontal: 10,
    minWidth: 70,
    borderColor: "#0F286A",
    height: 35,
  },
  cartImage: {
    width: 45,
    height: 45
  }
})