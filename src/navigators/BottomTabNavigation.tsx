import React, {useEffect} from 'react';
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
import {useNotification} from '../hooks/useNotification.ts';
import {socket} from '../services/socket.ts';
const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const {notificationSize} = useNotification();
  useEffect(() => {
    console.log('ok la');
    socket.connect();
    socket.on('connect', () => {
      console.log('User connected');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    // Clean up the effect
    return () => {
      socket.disconnect();
    };
  }, []);
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
          tabBarBadge: notificationSize === 0 ? undefined : notificationSize,
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
