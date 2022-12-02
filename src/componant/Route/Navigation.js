import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth/Login';
import Home from '../../screen/Home';
import Register from '../Auth/Register';
import Header from './Header';
import HeaderStyleTwo from './HeaderStyleTwo';
import TabsRoutes from './TabsRoutes';
import SettingScreen from '../../screen/SettingScreen';
import CampaignListScreen from '../../screen/CampaignListScreen';
import CampaignDetails from '../../screen/CampaignDetails';
import Notification from '../../screen/Notification';
import Support from '../../screen/Support';
import MyAccount from '../../screen/MyAccount';
import DonationHistory from '../../screen/DonationHistory';
import AboutApp from '../../screen/AboutApp';
import AboutUs from '../../screen/AboutUs';
import Favourites from '../../screen/Favourites';
import CheckoutScreen from '../../screen/CheckoutScreen';

import OrderScreen from '../../screen/OrderScreen';
import OrderCancel from '../../screen/OrderCancel';


import { useSelector } from 'react-redux';

import { en,de } from '../localization/NavigationLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  const { token } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(false);
  //AsyncStorage.getItem('token')
  useEffect(() => {
    setIsLogin(token);
  }, [token])
  return (
    <>

      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="MyAccount"
          component={MyAccount}
          options={{
            header: () => (
              <HeaderStyleTwo name={i18n.t('my_account')} user={true} />
            ),
          }}
        />

        <Stack.Screen
          name="DonationHistory"
          component={DonationHistory}
          options={{
            header: () => (
              <HeaderStyleTwo name="Donation History" extra={true} />
            ),
          }}
        />

        <Stack.Screen
          name="Login"
          component={isLogin ? Home : Login}
          options={{ headerShown: false, swipeEnabled: false }}
        /> 
        <Stack.Screen
          name="Register"
          component={isLogin ? Home : Register}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="Home"
          component={TabsRoutes}
          options={{
            headerShown:false,
          }}

        />

        <Stack.Screen
          name="AboutApp"
          component={AboutApp}
          options={{
            header: () => (
              <HeaderStyleTwo name={i18n.t('about_app')} />
            ),
          }}

        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            header: () => (
              <HeaderStyleTwo name={i18n.t('aboutUs')} />
            ),
          }}

        />

        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            header: () => (
              <HeaderStyleTwo name={i18n.t('setting')} setting={true} />
            ),
          }}

        />

        <Stack.Screen
          name="CampaignListScreen"
          component={CampaignListScreen}
          options={{
            header: () => (
              <HeaderStyleTwo name="" campaign={true} />
            ),
          }}

        />
        <Stack.Screen
          name="CampaignDetails"
          component={CampaignDetails}
          options={{
            header: () => (
              <HeaderStyleTwo name="" campaign={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Favourites"
          component={Favourites}
          options={{
            header: () => (
              <HeaderStyleTwo name={i18n.t('favourites')} />
            ),
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            header: () => (
              <HeaderStyleTwo name={i18n.t('notification')} notification={true} />
            ),
          }}
        />

        <Stack.Screen
          name="Support"
          component={Support}
          options={{
            header: () => (
              <HeaderStyleTwo name={i18n.t('support')} support={true} />
            ),
          }}
        />

        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          headerShown={false}
        />

        <Stack.Screen
          name="OrderCancel"
          component={OrderCancel}
          options={{
            header: () => (
              <HeaderStyleTwo support={true} order_status={false} />
            ),
          }}
        />

        
        <Stack.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            header: () => (
              <HeaderStyleTwo  order={true} order_status={true} />
            ),
          }}
        />

      </Stack.Navigator>
    </>
  )

}

export default Navigation
