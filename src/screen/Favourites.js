import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ProcessIndecator from '../componant/ListItem/ProcessIndecator';

const Favourites = () => {
  const { userId } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [indicator,setIndicator] = useState(false);
  useEffect(() => {
    if (userId) {
      setIndicator(true);
      displayList();
    } else {
      navigation.navigate('Login');
    }
  }, [])

  const displayList = () => {
    fetch(`https://human-relief-api.herokuapp.com/api/wishlistHandle/${userId}`).then((response) => response.json()).then((response) => {
      setData(response);
      setPageLoading(false);
      setTimeout(()=>{
        setIndicator(false);
      },300)
    });
  }

  const removeFromWishilist = (data) => {
    setIndicator(true);
    let pid = data._id;
    let wishlistData = data.wishlist.filter((item) => item.id != userId);
    UpdateWishlist({ id: pid, wishlistData });
  }

  const UpdateWishlist = ({ id, wishlistData }) => {
    fetch('https://human-relief-api.herokuapp.com/api/wishlistHandle/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "wishlist": wishlistData
      })
    }).then((response) => response.json()).then((response) => {
      if (response.modifiedCount === 1) {
        displayList();
      }
    })
  }

  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background} >
        <ScrollView>
          {
            pageLoading ?
              <></>
              :
              <>
                {
                  data.map((item) =>
                    <TouchableOpacity 
                      onPress={() => navigation.navigate('CampaignDetails', { id: item._id })}
                      style={styles.listWrapper}>
                      <Image source={{ uri: item.image }} style={styles.listImage} />
                      <View style={styles.listContent}>
                        {

                          item.category[0].title ?
                            <Text style={styles.listDate}>{item.category[0].title}</Text>
                            :
                            <></>
                        }

                        <Text style={styles.listTiTle}>{item.title}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => removeFromWishilist(item)}
                        style={styles.icon}>
                        <AntDesign name="heart" size={24} color="#DC1010" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )
                }

                {
                  data.length === 0 ?
                  <View style={styles.emptyCartWrapper}>
                    <FontAwesome5 name="hand-holding-heart" size={100} color="#fff" />
                    <Text style={styles.emptyCartTItle}>No item Found</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Home') }>
                      <Text style={styles.button}>Explore More</Text>
                    </TouchableOpacity>
                  </View> : <></>
                }
              </>
          }
        </ScrollView>
      </LinearGradient>
      <ProcessIndecator indicator={indicator} />
    </View>
  )
}

export default Favourites;

const styles = StyleSheet.create({
  background: {
    paddingTop: 10,
    flex: 1,
    height: "100%"
  },
  listImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  listWrapper: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 15,
    paddingVertical: 28,
    paddingLeft: 25,
    paddingRight: 120,
    position: "relative",
  },
  listContent: {
    paddingLeft: 15,
  },
  listDate: {
    fontSize: 13,
    lineHeight: 25,
    color: "#0F286A",
    fontFamily: "NunitoSansBold",
  },
  listTiTle: {
    fontSize: 14,
    lineHeight: 25,
    color: "#3E3E3E",
    fontFamily: "NunitoSansBold",
  },
  inputFiledWrapper: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  icon: {
    position: "absolute",
    top: 23,
    right: 20,
  },
  emptyCartWrapper: {
    paddingTop: 120,
    alignItems: "center",
  },
  emptyCartTItle: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 25,
    color: "#fff"
  },
  button:{
    backgroundColor: "#0F286A",
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 18,
    marginTop: 10,
    borderRadius: 10,
    width:220,
    marginTop:30,
  }
})