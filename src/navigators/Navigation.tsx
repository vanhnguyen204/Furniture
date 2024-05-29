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
import ShippingAddress from '../screens/shipping-address';
import CheckoutScreen from '../screens/checkout';
import {RootStackParamList} from './RootStackParamList.ts';
import PaymentScreen from '../screens/Payment';
import PaymentHandleScreen from '../screens/PaymentHandle';
const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={'WelcomeScreen'} component={WelcomeScreen} />
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'Register'} component={SignUpScreen} />
      <Stack.Screen name={'BottomTab'} component={BottomTabNavigation} />
      <Stack.Screen
        name={'ProductDetailsScreen'}
        component={ProductDetailsScreen}
      />
      <Stack.Screen name={'Cart'} component={Cart} />
      <Stack.Screen name={'ShippingAddress'} component={ShippingAddress} />
      <Stack.Screen name={'Checkout'} component={CheckoutScreen} />
      <Stack.Screen name={'Payment'} component={PaymentScreen} />
      <Stack.Screen
        name={'PaymentHandleScreen'}
        component={PaymentHandleScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
