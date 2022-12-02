import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { CategoryData } from '../componant/Data/CategoryData';
import CampaignItem from '../componant/ListItem/CampaignItem';
import { URL } from '../componant/Data/API';
import CampaignSkelton from '../componant/skeleton/CampaignSkelton';

import { useSelector } from 'react-redux';

import { en,de } from '../componant/localization/CampaignLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';


const Campaign = () => {
  const [topCampaign, setTopCampaign] = useState([]);
  const [onGoingCampaign, setOnGoingCampaign] = useState([]);
  const [sponsorshipCampaign, setSponsorshipCampaign] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);

  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  useEffect(() => {
    loadCategoryData();
  }, [])

  const loadCategoryData = () => {
    fetch(`${URL}/api/getCategory/`).then((response) => response.json()).then((response) => {
      setDataToList(response);
    })
  }

  const setDataToList = (response) => {
    let tempTopCamp = response.filter((item) => {
      if (item.parent === "Top Campaign") {
        return item;
      }
    });

    let temponGoingCamp = response.filter((item) => {
      if (item.parent === "On Going Campaign") {
        return item;
      }
    });

    let tempSponsorshi = response.filter((item) => {
      if (item.parent === "Sponsorship") {
        return item;
      }
    });

    setTopCampaign(tempTopCamp);
    setOnGoingCampaign(temponGoingCamp);
    setSponsorshipCampaign(tempSponsorshi);
    setLoadingCategory(false);
  }

  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={['rgba(15, 40, 106, 1)', 'rgba(15, 40, 106, 0.2)']}
        style={styles.background} >

        <View style={styles.mainWrapper}>
          <ScrollView
            contentContainerStyle={{ width: '100%' }}
            showsVerticalScrollIndicator={false}
          >

            <Text style={styles.mainHeading}>{i18n.t('topHeading')}</Text>

            <View style={styles.listWrapper}>
              <Text style={styles.listHeading}>{i18n.t('topCampaignHeading')}</Text>
              {
                loadingCategory ?
                  <CampaignSkelton />
                  :
                  <View style={[styles.listInnerWrapper]}>
                    {topCampaign.map((item) => <CampaignItem local={local} item={item} key={item.id} />)}
                  </View>
              }
            </View>

            <View style={styles.listWrapper}>
              <Text style={styles.listHeading}>{i18n.t('onGoingCampaignHeading')}</Text>
              {
                loadingCategory ?
                  <CampaignSkelton />
                  :
                  <View style={[styles.listInnerWrapper]}>
                    {onGoingCampaign.map((item) => <CampaignItem local={local}  item={item} key={item.id} />)}
                  </View>
              }

            </View>

            <View style={styles.listWrapper}>
              <Text style={styles.listHeading}>{i18n.t('sponsorshipHeading')}</Text>
              {
                loadingCategory ?
                  <CampaignSkelton />
                  :
                  <View style={[styles.listInnerWrapper]}>
                    {sponsorshipCampaign.map((item) => <CampaignItem local={local}  item={item} key={item.id} />)}
                  </View>
              }

            </View>

            {/*
            <FlatList
                style={styles.listWrapper}
                ListHeaderComponent={<Text style={styles.listHeading}>Top Campaign</Text>}
                data={topCampaign}
                renderItem={CampaignItem}
                keyExtractor={item => item.id}
                numColumns={3}
                scrollEnabled={false}
              /> 
             */}



          </ScrollView>
        </View>

      </LinearGradient>
    </View>
  )
}

export default Campaign;

const styles = StyleSheet.create({
  background: {
    paddingTop: 10,
    flex: 1,
    height: "100%"
  },
  mainWrapper: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  mainHeading: {
    paddingTop: 28,
    color: "#fff",
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "NunitoSansBold",
    paddingBottom: 17,
  },
  listWrapper: {
    paddingBottom: 40,
  },
  listInnerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    marginHorizontal: -29,
  },
  listHeading: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 26,
    fontFamily: "NunitoSansBold",
    paddingBottom: 22,
  },

})