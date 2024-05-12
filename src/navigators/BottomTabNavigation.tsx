import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PageName} from '../config/pageName.ts';
import HomeScreen from '../screens/HomeScreen';
import {screenOptions} from '../utils/navigationUtils.ts';
import {appColors} from '../assets/colors/appColors.ts';
import ImageComponent from '../components/ImageComponent.tsx';
import {iconBottomTab} from '../styles/iconBottomTab.ts';
import MarkScreen from '../screens/MarkScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            backgroundColor: appColors.white,

            borderTopWidth: 0,
          },
        ],
        tabBarActiveTintColor: appColors.black900,
      }}>
      <Tab.Screen
        name={PageName.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: ({size, color}) => {
            return (
              <ImageComponent
                src={iconBottomTab.iconHome}
                width={size}
                height={size}
                tintColor={color}
                alignSelf={'center'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={PageName.MarkScreen}
        component={MarkScreen}
        options={{
          tabBarIcon: ({size, color}) => {
            return (
              <ImageComponent
                src={iconBottomTab.iconMarkScreen}
                width={size}
                height={size}
                tintColor={color}
                alignSelf={'center'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={PageName.NotificationScreen}
        component={NotificationScreen}
        options={{
          tabBarIcon: ({size, color}) => {
            return (
              <ImageComponent
                src={iconBottomTab.iconNotification}
                width={size}
                height={size}
                tintColor={color}
                alignSelf={'center'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={PageName.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({size, color}) => {
            return (
              <ImageComponent
                src={iconBottomTab.iconProfile}
                width={size}
                height={size}
                tintColor={color}
                alignSelf={'center'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
