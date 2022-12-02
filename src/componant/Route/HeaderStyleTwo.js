import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import LeftArrow from '../svg/LeftArrow';
import { Octicons, FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import LanguageModal from '../popup/LanguageModal';
import OtherModal from '../popup/OtherModal';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import LocalActionsSheet from '../ActionSheet/LocalActionsSheet';
import Search from '../popup/Search';
import { useSelector } from 'react-redux';

const HeaderStyleTwo = ({ name, notification, setting, support, extra, campaign,order,order_status }) => {
  const navigation = useNavigation();
  const [currentLanguage, setCurrentLanguage] = useState('E');

  const [modalVisible, setModalVisible] = useState(false);
  const [otherModalVisible, setOtherModalVisible] = useState(false);
  const { local, languageSign } = useSelector((state) => state.local);

  const manageOtherModal = () => {
    setOtherModalVisible(!otherModalVisible);
  }

  const manageModal = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          order ?
          navigation.goBack()
          :
          navigation.navigate('HomeScreen');
        }}>
          <LeftArrow />
        </TouchableOpacity>

        <View style={styles.secondHedaerIcon}>


          {
            name != "" ? <Text style={styles.title}>{name}</Text> : <Text style={{ position: "absolute" }}></Text>
          }

          {
            campaign ?
              <View style={styles.campaignHeadr}>
                <TouchableOpacity onPress={() => SheetManager.show("localActionSheet")}>
                  <ImageBackground source={require('../../../assets/images/circle-bg.png')}
                    style={styles.circleIcon}
                    resizeMode="cover">
                    <Text style={styles.langSwitcher}>{languageSign}</Text>
                  </ImageBackground>
                </TouchableOpacity>

                <Image
                  style={styles.headerLogo}
                  source={require('../../../assets/images/logo.png')} />

                <TouchableOpacity>
                  <ImageBackground source={require('../../../assets/images/circle-bg.png')}
                    style={styles.circleIcon}
                    resizeMode="cover">
                    <Octicons name="search" size={20} color="#fff" />
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => manageOtherModal()}>
                  <Entypo name="dots-two-vertical" size={20} color="#fff" />
                </TouchableOpacity>


              </View>
              :
              <Text style={{ position: "absolute" }}></Text>
          }

          {
            notification ?
              <ImageBackground source={require('../../../assets/images/circle-bg.png')}
                style={styles.circleIcon}
                resizeMode="cover">
                <Octicons name="bell-fill" size={20} color="#fff" />
              </ImageBackground>
              :
              <Text style={{ position: "absolute" }}></Text>
          }

          {
            setting ?
              <ImageBackground source={require('../../../assets/images/circle-bg.png')}
                style={styles.circleIcon}
                resizeMode="cover">
                <FontAwesome name="cog" size={20} color="#fff" />
              </ImageBackground>
              :
              <Text style={{ position: "absolute" }}></Text>
          }

          {
            support ?
              <ImageBackground source={require('../../../assets/images/circle-bg.png')}
                style={styles.circleIcon}
                resizeMode="cover">
                <FontAwesome5 name="headset" size={20} color="#fff" />
              </ImageBackground>
              :
              <Text style={{ position: "absolute" }}></Text>
          }
          
          {
            order_status ? 
              <ImageBackground source={require('../../../assets/images/circle-bg.png')}
                style={styles.circleIcon}
                resizeMode="cover">
                <Entypo name="check" size={20} color="#fff" />
              </ImageBackground>
              :
              <ImageBackground source={require('../../../assets/images/circle-bg.png')}
                style={styles.circleIcon}
                resizeMode="cover">
                <Entypo name="cross" size={20} color="#fff" />
              </ImageBackground>
          }

          {
            extra ?
              <TouchableOpacity onPress={() => manageOtherModal()}>
                <Entypo name="dots-two-vertical" size={20} color="#fff" />
              </TouchableOpacity>
              :
              <Text style={{ position: "absolute" }}></Text>
          }



        </View>


      </View>
      <LanguageModal modalState={modalVisible} language={setCurrentLanguage} manageModal={manageModal} />
      <OtherModal modalState={otherModalVisible} manageOtherModal={manageOtherModal} />

      <ActionSheet
        id="localActionSheet"
        headerAlwaysVisible={true}
        animated={true}
        gestureEnabled={true}
        closable={true}
      >
        <LocalActionsSheet />
      </ActionSheet>

    </>
  )
}

export default HeaderStyleTwo;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    paddingTop: 52,
    backgroundColor: "#0F286A",
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    paddingBottom: 10,
    paddingLeft: 19,
  },
  title: {
    fontSize: 24,
    lineHeight: 25,
    color: "#fff",
    fontFamily: "ItimRegular",
    marginLeft: 37,
  },
  secondHedaerIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 19,
  },
  circleIcon: {
    width: 31,
    height: 31,
    alignItems: "center",
    justifyContent: "center"
  },
  campaignHeadr: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingLeft: 25,
  },
  langSwitcher: {
    fontFamily: "ItimRegular",
    color: "#fff",
    fontSize: 22,
    lineHeight: 26,
  },
  headerLogo: {
    width: 101,
    height: 37,
  },
})