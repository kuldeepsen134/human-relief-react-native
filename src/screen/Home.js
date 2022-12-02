import { StyleSheet, Text, View, Alert, Dimensions ,StatusBar,ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ListViewSliderVerticle from '../componant/ListItem/ListViewSliderVerticle';
import ListViewSliderHoriZontal from '../componant/ListItem/ListViewSliderHoriZontal';
import {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';

import { TopCompaignData } from '../componant/Data/TopCompaignData';
import { CategoryData } from '../componant/Data/CategoryData';
import { getCategory, getDonation, getDonationFilterByCategory } from '../store/features/donateReducer';
import { useDispatch,useSelector } from 'react-redux';
import HomePageSkeleton from '../componant/skeleton/HomePageSkeleton';
import ProcessIndecator from '../componant/ListItem/ProcessIndecator';

import { en,de } from '../componant/localization/HomeLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const {width} = Dimensions.get('screen');

const Home = () => {
  
  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  const navigation = useNavigation();
  const [activeCategory,setActiveCategory] = useState(1);  
  const [featuredSlider,setFeaturedSlider] = useState([]);
  const [homeCampaginData,setHomeCampaginData] = useState([]);
  const [isDataLoaded,setIsDataLoaded] = useState(true);
  const [allDonationList, setAllDonationList] = useState([]);
  const [indicator,setIndicator] = useState(false);

  const dispatch =  useDispatch();
  const{category} = useSelector((state)=> state.donate)
  const { userId } = useSelector((state)=>state.auth);
  useEffect(()=>{
    getAllDonationList();
    dispatch(getCategory());  
    console.log(category);
  },[]); 


  const getAllDonationList = () =>{
    fetch('https://human-relief-api.herokuapp.com/api/getDonation').then(res => res.json()).then((result)=>{
      setFeaturedSlider(result);
      setHomeCampaginData(result);
      setAllDonationList(result)
      setIsDataLoaded(false);  
      console.log(result); 
    }) 
  }
  

  const getFilterDonationList = (key) =>{
    fetch('https://human-relief-api.herokuapp.com/api/donationSearchByCategory/'+key).then(res => res.json()).then((result)=>{
      setHomeCampaginData(result); 
    }) 
  }


  const handleListClick = (ListItemId)=>{
    const id = {id:ListItemId};
    setTimeout(()=>{
      navigation.navigate('CampaignDetails',id); 
    },500)
  } 

  const categoryHandle =({id,title})=>{
    setActiveCategory(id);
    getFilterDonationList(title)
  }


  const removeFromWishilist =(data) =>{
    setIndicator(true);
    let pid = data._id;
    let wishlistData = data.wishlist.filter((item) => item.id != userId);
    UpdateWishlist({id:pid,wishlistData});
  }
  
  const addToWishilist =(data) =>{
    setIndicator(true);
    let pid = data._id;
    let wishlistData = data.wishlist;
    wishlistData.push({"id":userId});
    UpdateWishlist({id:pid,wishlistData});
  } 
  
  const UpdateWishlist = ({id,wishlistData}) =>{
    fetch('https://human-relief-api.herokuapp.com/api/wishlistHandle/'+id,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({ 
        "wishlist":wishlistData
      })
    }).then((response)=>response.json()).then((response)=>{
      if(response.modifiedCount === 1){
        getAllDonationList();
        setTimeout(()=>{
          setIndicator(false);
        },300)
      }
    })
  } 
  
  const loginAlert = (title, message) => {
      Alert.alert(
        "Login Alert", "Please login to add this item to wishlist",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Login", onPress: () => navigation.navigate('Login') }
        ]
      );
    }

  return ( 
    <View style={{height:"100%"}}>
      <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background} >
           { 
              isDataLoaded ? <HomePageSkeleton /> :
          <>
        <ScrollView > 
        <View style={styles.headingWrapper}>
          <Text style={styles.headingH1}>{i18n.t('title')}</Text>
        </View>

        <ScrollView horizontal={true} style={{paddingBottom:50}}>
          {
            featuredSlider.filter((filterItem)=>filterItem.isFeature === true).map((item,index)=> 
            <ListViewSliderVerticle 
                item={item} 
                local={local}
                index={index} 
                key={index}
                userId={userId}
                removeFromWishilist={removeFromWishilist}
                addToWishilist={addToWishilist}
                loginAlert={loginAlert}
                handleListClick={handleListClick}  />
            )
          }
        </ScrollView>

        <ScrollView horizontal={true} style={{paddingBottom:28}}>
          <TouchableOpacity onPress={()=> {
            setHomeCampaginData(allDonationList); 
            setActiveCategory(1);
          } }>
              <Text style={{
                fontSize:14,
                lineHeight:16,
                height:33,
                fontFamily:"NunitoSansRegular",
                color:1 === activeCategory ? "#000" : "#fff",
                paddingTop:10,
                paddingBottom:10,
                paddingLeft: 1 === activeCategory ? 23 : 8.5,
                paddingRight: 1 === activeCategory ? 23 : 8.5,
                marginRight: 1 === activeCategory ? 8.5 : 8.5,
                marginLeft:  30,
                backgroundColor: 1 === activeCategory ? "#fff" : "transparent",
                borderRadius:15,
              }}>
                {i18n.t('for_you')}
              </Text>
        </TouchableOpacity>  
        {
          category.map((item,index)=>
            <TouchableOpacity 
              key={index}
              onPress={()=>categoryHandle({id:item._id,title:item.title})}>
              <Text style={{
                fontSize:14,
                lineHeight:16,
                height:33,
                fontFamily:"NunitoSansRegular",
                color:item._id === activeCategory ? "#000" : "#fff",
                paddingTop:10,
                paddingBottom:10,
                paddingLeft:  8.5,
                paddingRight: 8.5,
                marginRight: item._id === activeCategory ? 8.5 : 0,
                marginLeft: 0,
                backgroundColor: item._id === activeCategory ? "#fff" : "transparent",
                borderRadius:15,
              }}>
                { local === "en" ? 
                  item.title_multi_lang[0].en
                :
                  local === "de" ?
                  item.title_multi_lang[0].de
                :
                undefined
                }
              </Text>
        </TouchableOpacity>  
          )
        }
        </ScrollView>

        <View style={{paddingHorizontal:30,}}>
        {
          homeCampaginData.map((item,index)=>
            <ListViewSliderHoriZontal  
              key={index}
              local={local}
              item={item} 
              userId={userId}
              removeFromWishilist={removeFromWishilist}
              addToWishilist={addToWishilist}
              loginAlert={loginAlert}
              handleListClick={handleListClick} 
            />)
        }
        </View>
   
        </ScrollView>
 
        <TouchableOpacity 
          onPress={()=> navigation.navigate('Campaign') }
        style={{
          position:"absolute",
          bottom:22,
          alignItems:"center",
          width:"100%"
        }}>
          <Text style={{
            backgroundColor:"#0F286A",
            paddingLeft:13,
            paddingRight:13,
            paddingTop:4,
            paddingBottom:7,
            color:"#fff",
            fontSize:22,
            lineHeight:26,
            fontFamily:"ItimRegular",
            width:150,
            textAlign:"center",
            borderRadius:13,
          }}>{i18n.t('button')}</Text>
          
        </TouchableOpacity>
       </>
         }
      </LinearGradient>
      <ProcessIndecator indicator={indicator} />
    </View>    
  )
} 

export default Home;

const styles = StyleSheet.create({
  background:{
    paddingTop:10,
    flex:1,
    height:"100%"
  },
  headingWrapper:{
    alignItems:"center",
  },
  headingH1:{
    color:"#fff",
    fontSize:22,
    fontFamily:"NunitoSansBold",
    paddingBottom:31,
    paddingTop:10,
    width:width,
    paddingHorizontal:35,
  },
})

