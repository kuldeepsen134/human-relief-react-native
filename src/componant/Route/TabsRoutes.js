import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Home from '../../screen/Home';
import Cart from '../../screen/Cart';
import Campaign from '../../screen/Campaign';
import Profile from '../../screen/Profile';
import HeaderStyleTwo from './HeaderStyleTwo';
import Header from './Header';
import { useSelector } from 'react-redux';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'; 

import { de,en } from '../localization/NavigationLang';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js'; 

function MyTabBar({ state, descriptors, navigation }) {
  const { token } = useSelector((state) => state.auth);
    return (
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          /*
          console.log("====================================");
          console.log(options)
          console.log("====================================");
          */
         
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              {
                isFocused ?  
                    <Text style={styles.tabTextStyle}>
                        {options.tabBarIcon.tabName}   
                    </Text> 
                : 
                    (
                        options.tabBarIcon.iconType === "FontAwesome" ? 
                            <FontAwesome name={options.tabBarIcon.inActive} style={styles.tabIconStyle} />
                        :options.tabBarIcon.iconType === "FontAwesome5" ?
                            <FontAwesome5 name={options.tabBarIcon.inActive} style={styles.tabIconStyle}  />
                        :
                            <Ionicons name={options.tabBarIcon.inActive} style={styles.tabIconStyle}  />
                        )
              }  
             
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  

const TabsRoutes = () => {
  const { local } = useSelector((state)=>state.local);
  const i18n = new I18n({ en,de });
  i18n.enableFallback = true;
  i18n.locale = local;

  return (
    <Tab.Navigator 
        tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen 
        name="HomeScreen" 
        component={Home} 
        options={{
          header: () => (
            <Header />
          ),
            tabBarIcon:{activeIcon:'Home',tabName:i18n.t('home'),inActive:'home',iconType:'FontAwesome'}
        }} 
        
        
        />

    <Tab.Screen 
        name="Campaign" 
        component={Campaign} 
        options={{
          header: () => (
            <Header />
          ),
            tabBarIcon:{activeIcon:'Campaign',tabName:i18n.t('campaign'),inActive:'hand-holding-usd',iconType:'FontAwesome5'}
        }} 
        />

    <Tab.Screen 
        name="Cart" 
        component={Cart} 
        options={{
            header: () => (
              <HeaderStyleTwo name={i18n.t('cart')} user={true} />
            ),
            tabBarIcon:{activeIcon:'Home',tabName:i18n.t('cart'),inActive:'shopping-cart', iconType:'FontAwesome5'}
        }} 
        />

    <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
            header: () => (
              <Header />
            ),
            tabBarIcon:{activeIcon:'Home',tabName:i18n.t('profile'),inActive:'user',iconType:'FontAwesome'}
        }} 
        />
    </Tab.Navigator>
  )
}

export default TabsRoutes

const styles = StyleSheet.create({
    tabContainer:{
        flexDirection: 'row',
        height:58,
        alignItems:"center",
        justifyContent:"space-around",
        textAlign:"center",
        backgroundColor:"#fff"
    },
    tabTextStyle:{
        color:"#0F286A",
        fontSize:15,
        lineHeight:26,
        fontFamily:"NunitoSansSemiBold",
        textShadowColor: 'rgba(0,0,0,0.25)', 
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 7,
    },
    tabIconStyle:{
        color:"#0F286A",
        fontSize:25,
    },
})
