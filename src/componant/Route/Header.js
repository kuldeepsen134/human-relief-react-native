import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import LanguageModal from '../popup/LanguageModal';
import Search from '../popup/Search';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import LocalActionsSheet from '../ActionSheet/LocalActionsSheet';
import { useSelector } from 'react-redux';

const Header = () => {
    const navigation = useNavigation();
    const [currentLanguage, setCurrentLanguage] = useState('E');
    const [modalVisible, setModalVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const {local,languageSign} = useSelector((state)=>state.local);

    const manageSearchModal = () => {
        setSearchVisible(!searchVisible);
    }

    const manageModal = () => {
        setModalVisible(!modalVisible);
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

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <ImageBackground
                        source={require('../../../assets/images/menu-bg.png')}
                        style={styles.drywerMenyIcon}
                        resizeMode="cover" >
                        <View style={{
                            width: 18,
                            height: 2,
                            backgroundColor: "#fff",
                            marginBottom: 6,
                        }}></View>
                        <View style={{
                            width: 12,
                            height: 2,
                            backgroundColor: "#fff",
                            marginBottom: 6,
                        }}></View>
                        <View style={{
                            width: 8,
                            height: 2,
                            backgroundColor: "#fff"
                        }}></View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    manageModal();
                    SheetManager.show("localActionSheet");
                    }}>
                    <ImageBackground source={require('../../../assets/images/circle-bg.png')}
                        style={styles.circleIcon}
                        resizeMode="cover">
                        <Text style={styles.langSwitcher}>{languageSign}</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <Image
                    style={styles.headerLogo}
                    source={require('../../../assets/images/logo.png')} />

                <TouchableOpacity onPress={() => manageSearchModal()}>
                    <ImageBackground source={require('../../../assets/images/circle-bg.png')}
                        style={styles.circleIcon}
                        resizeMode="cover">
                        <Octicons name="search" size={20} color="#fff" />
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={{ paddingRight: 22, }} onPress={() => navigation.navigate('Notification')}>
                    <ImageBackground source={require('../../../assets/images/circle-bg.png')}
                        style={styles.circleIcon}
                        resizeMode="cover">
                        <Octicons name="bell-fill" size={20} color="#fff" />
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            {/* 
            <LanguageModal modalState={modalVisible} language={setCurrentLanguage} manageModal={manageModal} />
            */}
            <Search modalState={searchVisible} language={setSearchVisible} manageSearchModal={manageSearchModal} />
            
             <ActionSheet
                id="localActionSheet"
                headerAlwaysVisible={true}
                animated={true}
                gestureEnabled={true}
                closable={true}
            >
            <LocalActionsSheet language={setCurrentLanguage} />
            </ActionSheet>
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        paddingTop: 52,
        backgroundColor: "#0F286A",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100,
        paddingBottom: 10,
    },
    drywerMenyIcon: {
        width: 50,
        height: 31,
        paddingLeft: 12,
        justifyContent: "center"
    },
    langSwitcher: {
        fontFamily: "ItimRegular",
        color: "#fff",
        fontSize: 22,
        lineHeight: 26,
    },
    circleIcon: {
        width: 31,
        height: 31,
        alignItems: "center",
        justifyContent: "center"
    },
    headerLogo: {
        width: 101,
        height: 37,
    }
})