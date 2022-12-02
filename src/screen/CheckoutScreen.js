import { StyleSheet, Text, View,Modal, Image, Dimensions, ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react';
import { URL } from '../componant/Data/API';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen = ({route}) => {
  const { amt, userId,item } = route.params;
  const [showModal,setShowModal] = useState(false);
  const navigation = useNavigation();

  const handleRequest = (data) =>{
    const {title,url} = data;
    console.log(data)
    if(title == 'success'){

      setShowModal(false);
      
      let splitUrl = url.split('?');
      let split_other_half = splitUrl[1].split('&');
      let paymentId = split_other_half[0].replace("paymentId=","");      
      //navigation.navigate('OrderScreen',{pid:generateUUID(10),ppid:paymentId});
      addTransaction(paymentId);
    }else if(title == 'cancel'){ 
      setShowModal(false);
      navigation.navigate('OrderCancel');
    }else {
      return; 
    }
  }

  function generateUUID(digits) {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    let uuid = [];
    for (let i = 0; i < digits; i++) {
        uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return 'hr-'+Date.now()+'-'+uuid.join('');
  }

  useEffect(()=>{
    setShowModal(true);
  },[])

  const addTransaction = (paymentId) =>{
    fetch(`${URL}/api/transaction`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        "transactionId": generateUUID(10),
        "userId": userId,
        "paypalId": paymentId,
        "item": item,
      })
    }).
    then((response)=>response.json()).
    then((response)=>{
      if(response.status === true){
        console.log();
        navigation.navigate('OrderScreen'); 
      }
    });
  }
  

  return (
    <View>
      <Modal visible={showModal}>
        <WebView 
          renderLoading={()=> <Loading />}
          startInLoadingState={true}
          source={{uri:`${URL}/pay/${amt}`}} 
          onNavigationStateChange={(data)=>handleRequest(data)} 
        />
      </Modal> 
 
    </View>
  )
}

const Loading = () =>{
  return(
  <View style={styles.containerWeb}>
    <Image source={ require('../../assets/images/paypal.png')} style={styles.paymentLogo} />
    <ActivityIndicator size="large" />
  </View>)
}



export default CheckoutScreen;

let {height,width} = Dimensions.get('screen') ;

const styles = StyleSheet.create({
  containerWeb:{
    height:height,
    width:width,
    justifyContent:"center",
    alignItems:"center"
  },
  paymentLogo:{
    width:"50%",
    resizeMode:"contain",
  }, 
})