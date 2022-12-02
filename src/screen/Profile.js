import { StyleSheet, Text, View , ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import {useState, useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { URL } from '../componant/Data/API';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../store/features/authReducer';

import { en,de } from '../componant/localization/MyAccountLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const Profile = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation(); 
  const [firstName, setFirstName] = useState('Loadding...');
  const [email, setEmail] = useState('Loadding...');
  const [isVisibledata,setIsVisibledata] = useState(false)

  const { token, loading, userId } = useSelector((state) => state.auth);

  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;
   
  useEffect(()=>{
    if(token){
      loadingProfileData();
      setIsVisibledata(true);
    }else{
      navigation.navigate('Login');
    }
  },[])

  const loadingProfileData = () =>{
    fetch(`${URL}/api/users/profile/${userId}`).then(res => res.json()).then(resp => {
      setFirstName(resp[0].firstName);
      setEmail(resp[0].email);
    })
  }


  const ProfileData = [
    {
      id:1,
      title:i18n.t('my_account'),
      icon:<FontAwesome name="user" size={25} color="#0F286A" />,
      link:"MyAccount"
    },
    {
      id:2, 
      title:i18n.t('support'),
      icon:<FontAwesome5 name="headset" size={25} color="#0F286A" />,
      link:"Support"
    },
    {
      id:3,
      title:i18n.t('donation_history'),
      icon:<FontAwesome5 name="hand-holding-usd" size={25} color="#0F286A" />,
      link:"DonationHistory"
    },
    {
      id:4,
      title:i18n.t('logout'),
      icon:<AntDesign name="logout" size={25} color="#0F286A" />,
      link:"Logout" 
    }
  ]

  
  const ProfileButtonAction = (ScreenName) =>{
    
    if(ScreenName != ""){
      if(ScreenName === "Logout"){
        userLogouts();
      }else{
        navigation.navigate(ScreenName);
      }
      
    }
    
  }

  const userLogouts = () =>{ 
    dispatch(userLogout());
    setTimeout(()=>{
      navigation.navigate('Login');
    },300)
  }
 
  return (
    <View style={{height:"100%"}}>
       <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background} >
        {
          isVisibledata ? 
        <ScrollView>
          <View style={styles.profileHeader}>
            <Image 
              style={styles.profileImage}
              source={{uri:'https://socialit.in/jewellery/images/home/team/1.png'}}/>
              <Text style={styles.profileName}>{firstName}</Text>
              <Text style={styles.profileEmail}>{email}</Text>
              <TouchableOpacity>
                <Text style={styles.profileEdit}>{i18n.t('edit_profile')}</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.profileDataListWrapper}>
            {
              ProfileData.map((item)=>
                <TouchableOpacity 
                  onPress={()=>ProfileButtonAction(item.link)}  
                  key={item.id} 
                  style={styles.profileDataListItem} >
                  <View style={styles.profileIocnText}>
                    <View style={styles.profileIcon}>{item.icon}</View>
                    <Text style={styles.profileTitle}>{item.title}</Text>
                  </View>
                  <FontAwesome name="chevron-right" size={24} color="#0F286A" />
                </TouchableOpacity>
                )
            }
          </View>
        </ScrollView>
        : <></>
        }
      </LinearGradient>
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  background:{
    paddingTop:10,
    flex:1,
    height:"100%"
  },
  profileImage:{
    width:90,
    height:90,
    borderRadius:45,
  },
  profileHeader:{
    alignItems:"center",
    paddingTop:30,
  },
  profileName:{
    fontSize:22,
    lineHeight:25,
    color:"#fff",
    fontFamily:"ItimRegular",
    paddingTop:10,
  },
  profileEmail:{
    fontSize:19,
    lineHeight:19,
    color:"#B7B2B2",
    fontFamily:"ItimRegular"
  },
  profileEdit:{
    fontSize:13,
    lineHeight:26,
    color:"#fff",
    fontFamily:"NunitoSansBold",
    textDecorationLine:"underline",
  },
  profileDataListWrapper:{
    paddingHorizontal:34,
    flex:1,
    justifyContent:"center",
    paddingTop:30,
  },
  profileDataListItem:{
    backgroundColor:"#fff",
    borderRadius:15,
    padding:15,
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:18,
    alignItems:"center"
  },
  profileIocnText:{
    flexDirection:"row",
    alignItems:"center"
  },
  profileTitle:{
    color:"#0F286A",
    fontSize:20,
    lineHeight:26,
    fontFamily:"ItimRegular",
    paddingLeft:14,
  },
})