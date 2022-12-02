import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import AddToCartSctionSheet from '../componant/ActionSheet/AddToCartSctionSheet';
import { useSelector } from 'react-redux';
import DetailsPageSkelton from '../componant/skeleton/DetailsPageSkelton';
import { useNavigation } from '@react-navigation/native';
import ProcessIndecator from '../componant/ListItem/ProcessIndecator';
import { DayLeft } from '../componant/Utility/DayLeft';

import { en, de } from '../componant/localization/CampaignLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const CampaignDetails = ({ route }) => {
    const navigation = useNavigation();
    const { id } = route.params;
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const { userId, token } = useSelector((state) => state.auth);
    const [isDataLoaded, setIsDataLoaded] = useState(true);
    const [favorite, setFavorite] = useState([]);
    const [multiLangTitle, setMultiLangTitle] = useState([]);
    const [multiLangDescription, setMultiLangDescription] = useState([]);
    const [indicator, setIndicator] = useState(false);

    const { local } = useSelector((state) => state.local);
    const i18n = new I18n({ en, de });
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        displaySingleDonation(id)
    }, []);

    const displaySingleDonation = (id) => {
        fetch('https://human-relief-api.herokuapp.com/api/getSingleDonation/' + id).then((resp) => resp.json()).then((res) => {
            setIsDataLoaded(false);
            setData(res[0]);
            if (res[0].length != 0) {
                setCategory(res[0].category);
                setFavorite(res[0].wishlist)
                setMultiLangTitle(res[0].translation_title)
                setMultiLangDescription(res[0].translation_description)
            }
        });
    }

    const removeFromWishilist = (data) => {
        setIndicator(true);
        let pid = data._id;
        let wishlistData = data.wishlist.filter((item) => item.id != userId);
        UpdateWishlist({ id: pid, wishlistData });
    }

    const addToWishilist = (data) => {
        setIndicator(true);
        let pid = data._id;
        let wishlistData = data.wishlist;
        wishlistData.push({ "id": userId });
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
                displaySingleDonation(id);
                setTimeout(() => {
                    setIndicator(false);
                }, 300)
            }
        })
    }




    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: false,
        showCloseButton: true,
        height: 700,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        closeIconStyle: {
            backgroundColor: "#000",
            color: "red"
        },
        barStyle: {
            backgroundColor: "#ddd"
        },

        closeOnTouchOutside: true
    });

    const [isPanelActive, setIsPanelActive] = useState(false);

    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };

    const loginAlert = (title, message) => {
        Alert.alert(
            title, message,
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

    /*
    useEffect(()=>{
        setTimeout(()=>{
            if(!loading){
               setTimeout(()=>{
                setIsDataLoaded(false); 
               },300)
            }
        },500)
    },[loading])
    */
 
    return (
        <View style={{ height: "100%" }}>

            <LinearGradient
                colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
                style={styles.background} >
                {
                    isDataLoaded ? <DetailsPageSkelton /> :
                        <>
                            <ScrollView>
                                <View style={styles.compaignHeader}>
                                    {
                                        data.length != 0 ? <Image source={{ uri: data.image, }} style={styles.compaignImage} /> : <></>
                                    }

                                    <View style={styles.compaignHeaderContent}>

                                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                            {
                                                category.map((item, index) =>
                                                    <Text key={index} style={[styles.heading, { paddingLeft: index === 0 ? 0 : 5 }]}>
                                                        {index === 0 ? "" : ","}
                                                        {
                                                            local === "en" ?
                                                            item.title
                                                            : local === "de" ?
                                                            item.title_de
                                                            :
                                                            undefined
                                                        }
                                                    </Text>
                                                )
                                            }
                                        </View>
                                        <View style={styles.tagLineWrapper}>
                                            <Text style={styles.tagLine}>
                                                { 
                                                    multiLangTitle.length === 0 ? undefined :
                                                    local === 'en' ? multiLangTitle[0].en : local === 'de' ? multiLangTitle[0].de : undefined
                                                }
                                            </Text>
                                            {

                                                userId ?
                                                    <>
                                                        {
                                                            favorite.length != 0 ?
                                                                favorite.map((ci) =>
                                                                    ci.id === userId ?
                                                                        <TouchableOpacity onPress={() => removeFromWishilist(data)}>
                                                                            <AntDesign name="heart" size={22} color="red" />
                                                                        </TouchableOpacity>
                                                                        :
                                                                        <TouchableOpacity onPress={() => addToWishilist(data)}>
                                                                            <AntDesign name="heart" size={22} color="#FFFFFF" />
                                                                        </TouchableOpacity>
                                                                )
                                                                :
                                                                <TouchableOpacity onPress={() => addToWishilist(data)}>
                                                                    <AntDesign name="heart" size={22} color="#FFFFFF" />
                                                                </TouchableOpacity>
                                                        }
                                                    </>
                                                    :
                                                    <TouchableOpacity onPress={() => loginAlert()}>
                                                        <AntDesign name="heart" size={22} color="#FFFFFF" />
                                                    </TouchableOpacity>

                                            }
                                        </View>
                                        <View style={styles.remainTime}>
                                            <Text style={styles.remTimeNumber}>
                                                {
                                                    data.donationDate ?
                                                        DayLeft(data.donationDate)
                                                        :
                                                        undefined
                                                }
                                            </Text>
                                            <Text style={styles.remTimeValue}> {i18n.t('datLeft')}</Text>
                                        </View>
                                    </View>

                                </View>

                                <View style={styles.fundWrapper}>
                                    <View style={styles.fundItem}>
                                        <View style={styles.icons}>
                                            <FontAwesome name="paper-plane" size={17} color="#fff" />
                                        </View>
                                        <View>
                                            <Text style={styles.fundLabel}>{i18n.t('targetAmountHeading')}</Text>
                                            <Text style={styles.fundDesc}>${data.targetAmmount}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.fundItem}>
                                        <View style={styles.icons}>
                                            <View style={{ width: 20, height: 20, backgroundColor: "rgba(255,255,255,0.4)", alignItems: "center", justifyContent: "center", borderRadius: 5, }}><MaterialIcons name="bar-chart" size={12} color="#fff" /></View>
                                        </View>
                                        <View>
                                            <Text style={styles.fundLabel}>{i18n.t('raisedSoFarHeading')}</Text>
                                            <Text style={styles.fundDesc}>${data.raisedSoFar}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.comapignMain}>
                                    <View style={styles.createdBy}>
                                        <Text style={styles.createdByLabel}>{i18n.t('createdBy')} </Text>
                                        <Text style={styles.createdByValue}>{data.createdBy}</Text>
                                    </View>
                                    <Text style={styles.comapignBody}>
                                    { 
                                        multiLangDescription.length === 0 ? undefined :
                                        local === 'en' ? multiLangDescription[0].en : local === 'de' ? multiLangDescription[0].de : undefined
                                    }
                                        {data.description}
                                    </Text>

                                </View>



                            </ScrollView>



                            <View style={styles.stickyButton}>
                                {token ?
                                    <TouchableOpacity onPress={() => SheetManager.show("addToCartSheet")}>
                                        <Text style={styles.stickyButtonText}>{i18n.t('button')}</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => loginAlert("Login Required", "Please login before add to cart item")}>
                                        <Text style={styles.stickyButtonText}>{i18n.t('button')}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </>
                }
            </LinearGradient>

            {
                isDataLoaded ? <></> :
                    <ActionSheet
                        id="addToCartSheet"
                        headerAlwaysVisible={true}
                        animated={true}
                        gestureEnabled={true}
                        closable={true}
                    >
                        <View>
                            <AddToCartSctionSheet id={data._id} image={data.image} title={data.title} />
                        </View>
                    </ActionSheet>
            }
            <ProcessIndecator indicator={indicator} />
        </View>
    )
}
export default CampaignDetails

const styles = StyleSheet.create({
    background: {
        paddingTop: 10,
        flex: 1,
        height: "100%"
    },
    compaignHeader: {
        paddingHorizontal: 48,
        paddingTop: 20,
    },
    compaignImage: {
        height: 150,
        width: "100%",
        borderRadius: 15,
    },
    compaignHeaderContent: {
        paddingHorizontal: 5,
        paddingTop: 8,
    },
    heading: {
        fontSize: 16,
        lineHeight: 26,
        color: "#fff",
        fontFamily: "NunitoSansBold",
        flexDirection: "column",
    },
    tagLine: {
        fontSize: 14,
        lineHeight: 26,
        color: "#fff",
        fontFamily: "InriaSansRegular",
        width: "80%"
    },
    tagLineWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    remainTime: {
        flexDirection: "row"
    },
    remTimeNumber: {
        fontSize: 14,
        lineHeight: 26,
        color: "#0F286A",
        fontFamily: "InriaSansRegular",
    },
    remTimeValue: {
        fontSize: 14,
        lineHeight: 26,
        color: "#B7B2B2",
        fontFamily: "InriaSansRegular",
    },
    fundWrapper: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: 17,
    },
    fundItem: {
        width: 153,
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    icons: {
        backgroundColor: "#0F286A",
        width: 42,
        height: 42,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    fundLabel: {
        fontSize: 13,
        lineHeight: 18,
        fontFamily: "NunitoSansSemiBold",
        color: "#000",
    },
    fundDesc: {
        fontSize: 14,
        lineHeight: 25,
        fontFamily: "NunitoSansBold",
        color: "#000"
    },
    comapignMain: {
        paddingHorizontal: 23,
        marginTop: 17,
        paddingBottom: 100,
        backgroundColor: "rgba(133,145,178,0.5)",
        paddingTop: 10,
    },
    createdBy: {
        flexDirection: "row",
        paddingBottom: 15,
        paddingHorizontal: 4,
    },
    comapignBody: {
        fontSize: 14,
        lineHeight: 25,
        fontFamily: "NunitoSansBold",
        color: "rgba(62, 62, 62, 0.8)"
    },
    createdByLabel: {
        fontSize: 14,
        lineHeight: 25,
        fontFamily: "NunitoSansBold",
        color: "#000"
    },
    createdByValue: {
        fontSize: 14,
        lineHeight: 25,
        fontFamily: "NunitoSansBold",
        color: "#0F286A"
    },
    stickyButton: {
        position: "absolute",
        display: "flex",
        bottom: 19,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    stickyButtonText: {
        fontSize: 20,
        lineHeight: 25,
        fontFamily: "NunitoSansBold",
        color: "#fff",
        backgroundColor: "#0F286A",
        padding: 12,
        borderRadius: 15,
        width: 308,
        textAlign: "center",
    },
    actionSheetStyle: {

    }
})