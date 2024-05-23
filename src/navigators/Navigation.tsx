import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PageName} from '../config/pageName.ts';
import WelcomeScreen from '../screens/WelcomeScreen';
import {screenOptions} from '../utils/navigationUtils.ts';
import {LoginScreen} from '../screens/Auth/LoginScreen.tsx';
import SignUpScreen from '../screens/Auth/SignUpScreen.tsx';
import BottomTabNavigation from './BottomTabNavigation.tsx';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import Cart from '../screens/Cart';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={PageName.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={PageName.Login} component={LoginScreen} />
      <Stack.Screen name={PageName.Register} component={SignUpScreen} />
      <Stack.Screen name={PageName.BottomTab} component={BottomTabNavigation} />
      <Stack.Screen
        name={PageName.ProductDetailsScreen}
        component={ProductDetailsScreen}
      />
      <Stack.Screen name={PageName.Cart} component={Cart} />
    </Stack.Navigator>
  );
};

export default Navigation;
