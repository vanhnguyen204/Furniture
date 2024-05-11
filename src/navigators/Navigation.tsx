import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PageName} from '../config/pageName.ts';
import WelcomeScreen from '../screens/WelcomeScreen';
import {screenOptions} from '../utils/navigationUtils.ts';
import {LoginScreen} from '../screens/Auth/LoginScreen.tsx';
import SignUpScreen from '../screens/Auth/SignUpScreen.tsx';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={PageName.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={PageName.Login} component={LoginScreen} />
      <Stack.Screen name={PageName.Register} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
