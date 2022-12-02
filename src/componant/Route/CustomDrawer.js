import { StyleSheet, Text, View, TouchableOpacity, Image, Share, Linking } from 'react-native'
import React, { useEffect, useState } from 'react';
import Favourites from './svg/Favourites';
import Campaign from './svg/Campaign';
import Setting from './svg/Setting';
import Star from './svg/Star';
import ShareIcon from '../svg/ShareIcon';
import AboutApplication from './svg/AboutApplication';
import { useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView, } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../store/features/authReducer';
import { FontAwesome, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons'; 
import { URL } from '../Data/API';

import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en,de } from '../localization/NavigationLang';

const CustomDrawer = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [activeMenu, setActiveMenu] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const { token, loading, userId } = useSelector((state) => state.auth);

    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    const { local } = useSelector((state)=>state.local);
    const i18n = new I18n({ en,de });
    i18n.enableFallback = true;
    i18n.locale = local;

    const Logout = () =>{
        dispatch(userLogout());
        setIsLogin(false);
        navigation.navigate('Login');
    }
    useEffect(()=>{
        loadingProfileData();
    },[])

    const loadingProfileData = () =>{
        fetch(`${URL}/api/users/profile/${userId}`).then(res => res.json()).then(resp => {
          setFirstName(resp[0].firstName);
          setEmail(resp[0].email);
        })
      }

    useEffect(() => {
        if (token) {
            setIsLogin(true);
            loadingProfileData();
        }
    }, [token]);

    const getProfileData = () =>{

    }

    const DrawerMenuData = [
        {
            id: 1,
            title: i18n.t('favorite'),
            icon: <Favourites />,
            link: "Favourites"
        },
        {
            id: 2,
            title: i18n.t('campaign'),
            icon: <Campaign />,
            link: "Campaign"
        },
        {
            id: 3,
            title: i18n.t('aboutUs'),
            icon: <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/d-menu.png')} />,
            link: "AboutUs"
        },
        {
            id: 4,
            title: i18n.t('setting'),
            icon: <Setting />,
            link: "Setting"
        },
        {
            id: 5,
            title: i18n.t('aboutApplication'),
            icon: <AboutApplication />,
            link: "AboutApp"
        },
        {
            id: 6,
            title: i18n.t('rateTheApplication'),
            icon: <Star />,
            link: ""
        },
        {
            id: 7,
            title: i18n.t('share'),
            icon: <ShareIcon />,
            link: "Share"
        },
    ]

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Human Relief | Please check this out. https://google.com',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    const HandleClick = (item) => {
        console.log(item[1]);

        if (item[1] != "") {
            if (item[1] === "Share") {
                onShare();
            } else {
                navigation.navigate(item[1]);
            }

        }
        setActiveMenu(item[0]);
    }

    /*
    useEffect(()=>{
        AsyncStorage.getItem('token').then(res=>{
            if(res != ""){
                setIsLogin(false);
            }else{
                setIsLogin(true);
            }
        })
    },[isLogin])

    const Logout = () =>{
        AsyncStorage.removeItem('token').then(res=>{
            setIsLogin(false);
            navigation.navigate("Login");
        })
    } 
    */

    return (
        <View style={styles.drawerWrapper}>
            <View style={styles.drawerHeader}>
                <View style={styles.profileImagePlaceholder}></View>

                {
                    isLogin ? 
                    <View>
                        <Text style={styles.drawerheaderName}>{firstName}</Text>
                        <Text style={styles.drawerheaderEmail}>{email}</Text>
                    </View>
                :
                <View style={styles.headerButtonWrapper}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.headerButton}>{i18n.t('login')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.headerButton}>{i18n.t('sign_up')}</Text>
                    </TouchableOpacity>
                </View>
                 }
            </View>

            <View style={styles.drawerNavigation}>
                <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                    {
                        DrawerMenuData.map((item,index) =>
                            <TouchableOpacity
                                onPress={() => HandleClick([item.id, item.link])}
                                key={index}
                                style={[styles.drawerNavItem, {
                                    //opacity:item.id === activeMenu ? 0.5 : 1
                                }]}>
                                <View style={styles.drawerNavIcon}>
                                    {item.icon}
                                </View>
                                <Text style={styles.drawerNavText}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    }

                    {
                        isLogin ?
                            <TouchableOpacity
                                onPress={() => Logout()}
                                style={styles.drawerNavItem}
                            >
                                <View style={styles.drawerNavIcon}>
                                    <AntDesign name="logout" size={25} color="#0F286A" />
                                </View>
                                <Text style={styles.drawerNavText}>{i18n.t('logout')}</Text>
                            </TouchableOpacity>
                            :
                            <></>
                    }



                </DrawerContentScrollView>

            </View>

            <View style={styles.drawerFooter}>
                <Text style={styles.drawerFooterText}>Version 1.0.0</Text>
            </View>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    drawerWrapper: {
        flex: 1,
    },
    drawerHeader: {
        height: 197,
        backgroundColor: "#D9D9D9",
        alignItems: "center",
        justifyContent: "center",
    },
    drawerNavigation: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 35,
        paddingLeft: 19,
        paddingRight: 19,
    },
    drawerFooter: {
        height: 50,
        alignItems: "center",

    },
    headerButtonWrapper: {
        flexDirection: "row",
        marginTop: 39,
    },
    headerButton: {
        fontSize: 13,
        lineHeight: 26,
        color: "#0F286A",
        width: 120,
        height: 38,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "NunitoSansSemiBold",
        paddingHorizontal: 21,
        paddingVertical: 5,
        textAlign: "center",
        textTransform: "uppercase",
        borderRadius: 10,
        marginHorizontal: 4.5,
    },
    drawerNavItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 23,
    },
    drawerNavText: {
        color: "#0F286A",
        fontSize: 18,
        lineHeight: 26,
        fontFamily: "NunitoSansSemiBold",
        paddingLeft: 12,
    },
    drawerNavIcon: {
        width: 30,
    },
    drawerFooterText: {
        fontSize: 16,
        lineHeight: 26,
        color: "#B7B2B2",
        fontFamily: "NunitoSansSemiBold",
    },
    profileImagePlaceholder: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: "#fff"
    },
    drawerheaderName: {
        color: "#0F286A",
        fontSize: 18,
        lineHeight: 26,
        fontFamily: "NunitoSansSemiBold",
        textAlign:"center",
        marginTop:10,
    },
    drawerheaderEmail: {
        color: "#0F286A",
        fontSize: 14,
        lineHeight: 26,
        fontFamily: "NunitoSansSemiBold",
        marginTop:-8,
        textAlign:"center",
    },

})