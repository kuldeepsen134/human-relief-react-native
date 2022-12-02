import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import {useState, useEffect} from 'react';
import { SheetManager } from 'react-native-actions-sheet';
import { DonateData } from '../Data/DonateData';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/features/cartReducer';
import { useNavigation } from '@react-navigation/native';

import { en,de } from '../../componant/localization/CampaignLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';


const AddToCartSctionSheet = ({id, title, image}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [activeAmmount, setActiveAmmount] = useState();
  const [otherAmmount, setOtherAmmount] = useState();
  const [donateAmmount, setDonateAmmount] = useState();
  const { userId } = useSelector((state)=> state.auth);
  const { loading } = useSelector((state)=> state.cart)

  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;
  
  useEffect(()=>{
    setDonateAmmount(50);
  },[])

  useEffect(()=>{
    setDonateAmmount(otherAmmount);
  },[otherAmmount])


  const selectDonate = ({id,ammount}) =>{
    setActiveAmmount(id);
    setDonateAmmount(ammount);
  }

 const addToCartDonation = () =>{
    dispatch(addToCart({
        title,
        image,
        productId:id,
        userId,
        price:donateAmmount }));
    setTimeout(()=>{
        if(!loading){
            setTimeout(()=>{
                navigation.navigate('Cart');
            },300)
        }
    },300)
    //SheetManager.hide("addToCartSheet");
 }

  return (
    <View style={{
        paddingTop:3,
        paddingHorizontal:15,
    }}>
        <Text style={{
            fontSize:16,
            lineHeight:26,
            textAlign:"center",
            color:"#3E3E3E",
        }}>{i18n.t('addToCartHeading')}</Text>


        <View style={{
            flexDirection:"row",
            flexWrap:"wrap",
            marginHorizontal:-19,
            alignContent:"center",
            justifyContent:"center",
            paddingTop:25,
        }}>
            {
                DonateData.map((item)=>
                    <TouchableOpacity key={item.id}
                        onPress={ ()=> selectDonate({id:item.id,ammount:item.ammout}) }
                        style={{
                            width:135,
                            borderColor:activeAmmount == item.id ? "#209FA6" :"rgba(202, 202, 202, 0.2)",
                            borderWidth:1,
                            borderRadius:15,
                            padding:20,
                            marginHorizontal:10,
                            marginBottom:15,
                            backgroundColor:activeAmmount == item.id ? "rgba(32, 159, 166, 0.2)" : "#fff"
                        }}
                    >
                        <Text style={{
                            fontSize:16,
                            lineHeight:25,
                            textAlign:"center",
                            color:"#0F286A",
                            fontFamily:"NunitoSansBold"
                        }}>${item.ammout}</Text>
                    </TouchableOpacity>
                )
            }
        </View>

        <Text style={{
            fontSize:13,
            lineHeight:23,
            color:"#3E3E3E",
            textAlign:"center",
            fontFamily:"NunitoSansSemiBold",
            paddingVertical:15,
        }}>{i18n.t('or')}</Text>

        <TextInput placeholder={i18n.t('placeholder')} 
        style={{
            backgroundColor:"#F5F5F5",
            padding:12,
            textAlign:"center",
            borderRadius:15,
            fontSize:16,
            lineHeight:25,
            fontFamily:"NunitoSansSemiBold",
        }}
        value={otherAmmount}
        keyboardType='numeric'
        autoCapitalize="none"
        
        onChangeText={(text)=>setOtherAmmount(text)}
        placeholderTextColor="rgba(15, 40, 106, 0.4)" />


        <TouchableOpacity 
            onPress={() => addToCartDonation() }
            style={{
                justifyContent:"center",
                alignItems:"center",
                paddingTop:25,
                paddingBottom:20,
            }}
            >
                <Text style={{
                    fontSize:20,
                    lineHeight:25,
                    fontFamily:"NunitoSansBold",
                    color:"#fff",
                    backgroundColor:"#0F286A",
                    padding:12,
                    borderRadius:15,
                    width:308,
                    textAlign:"center",
                }}>{i18n.t('addToCartButton')} </Text>
        </TouchableOpacity>

    </View>
  )
}

export default AddToCartSctionSheet;

const styles = StyleSheet.create({})