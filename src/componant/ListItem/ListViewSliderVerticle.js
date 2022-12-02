import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

const ListViewSliderVerticle = ({ local,item, handleListClick, index, userId, loginAlert, removeFromWishilist,addToWishilist }) => {
    return ( 
        <TouchableOpacity
            onPress={() => handleListClick(item._id)}
            style={[styles.sliderItem, { marginLeft: index === 0 ? 30 : 0 }]}>
            <Image
                style={styles.sliderImage}
                source={{ uri: item.image }} />
            <View style={{borderRadius:30,alignItems:"center", justifyContent:"center",position:"absolute", right:10,top:10, width:35,height:35,backgroundColor:"rgba(0,0,0,0.2)"}}>
            {
                userId ?
                    <>
                        {
                            item.wishlist.length != 0 ?
                                item.wishlist.map((ci) =>
                                    ci.id === userId ?
                                        <TouchableOpacity onPress={() => removeFromWishilist(item)}>
                                            <AntDesign name="heart" size={22} color="red" />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => addToWishilist(item)}>
                                            <AntDesign name="heart" size={22} color="#fff" />
                                        </TouchableOpacity>
                                )
                                :
                                <TouchableOpacity onPress={() => addToWishilist(item)}>
                                    <AntDesign name="heart" size={22} color="#fff" />
                                </TouchableOpacity>
                        }
                    </>
                    :
                    <TouchableOpacity onPress={() => loginAlert()}>
                        <AntDesign name="heart" size={22} color="#fff" />
                    </TouchableOpacity>
            }
            </View>
            <View style={styles.itemContent}>
                <Text style={styles.itemHeading}>
                    {
                        local === 'en' ?
                        item.category[1].title
                        :
                        local === 'de' ?
                        item.category[1].title_de
                        :
                        undefined
                    }
                </Text>
                <Text numberOfLines={2} style={styles.itemDescription}>
                    {
                        local === 'en' ?
                        item.translation_title[0].en
                        :
                        local === 'de' ?
                        item.translation_title[0].de
                        :
                        undefined
                    }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ListViewSliderVerticle

const styles = StyleSheet.create({
    sliderImage: {
        width: 280,
        height: 157,
        borderRadius: 15,
    },
    sliderItem: {
        backgroundColor: "#fff",
        marginRight: 16,
        height: 255,
        borderRadius: 15,
        position:"relative"
    },
    itemHeading: {
        fontSize: 16,
        lineHeight: 26,
        color: "#0F286A",
        fontFamily: "NunitoSansBold",
    },
    itemDescription: {
        fontSize: 16,
        lineHeight: 26,
        color: "#000",
        fontFamily: "InriaSansRegular",
        width: 240,
    },
    itemContent: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 6,
        paddingBottom: 6,
        width: "100%",
        flexDirection: "column",
    }
}) 