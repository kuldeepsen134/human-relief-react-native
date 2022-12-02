import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Home from './src/screen/Home';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Navigation from './src/componant/Route/Navigation';
import TabsRoutes from './src/componant/Route/TabsRoutes';
import CustomDrawer from './src/componant/Route/CustomDrawer';

import store from './src/store/store';
import { Provider } from 'react-redux';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { isLogin, userLogout } from './src/store/features/authReducer';
import { getProfile } from './src/store/features/userReducer';
import { getLocal } from './src/store/features/localReducer';
 
const App = ()=> {
 
  const Drawer = createDrawerNavigator();
  const dispatch =useDispatch();

  useEffect(()=>{ 
    dispatch(isLogin()); 
    dispatch(getLocal())
  })

  const [loaded] = useFonts({
    InriaSansBold: require('./assets/fonts/InriaSans-Bold.ttf'),
    InriaSansBoldItalic: require('./assets/fonts/InriaSans-BoldItalic.ttf'),
    InriaSansItalic: require('./assets/fonts/InriaSans-Italic.ttf'),
    InriaSansLight: require('./assets/fonts/InriaSans-Light.ttf'),
    InriaSansLightItalic: require('./assets/fonts/InriaSans-LightItalic.ttf'),
    InriaSansRegular: require('./assets/fonts/InriaSans-Regular.ttf'),
    ItimRegular: require('./assets/fonts/Itim-Regular.ttf'),
    NunitoSansRegular: require('./assets/fonts/NunitoSans-Regular.ttf'),
    NunitoSansSemiBold: require('./assets/fonts/NunitoSans-SemiBold.ttf'),
    NunitoSansBold: require('./assets/fonts/NunitoSans-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }
 
  return (
    <>
          
      <NavigationContainer> 
      <Drawer.Navigator 
        initialRouteName="Route"
        drawerContent={props => <CustomDrawer {...props} />}
        >
        <Drawer.Screen name="Route" component={Navigation} options={{headerShown:false}} />
      </Drawer.Navigator>
    </NavigationContainer> 
    <StatusBar style="light" color="red" />
      
    </>
  );
}

//export default App;


export default ()=>{
  return (
    <Provider store={store}>
      <App/>
     </Provider>
  )
}










function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Routes2" component={TabsRoutes} />
    </Drawer.Navigator>
  );
}