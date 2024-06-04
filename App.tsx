import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigators/Navigation.tsx';
import {navigationRef} from './src/utils/navigationUtils.ts';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <NavigationContainer
      ref={ref => {
        navigationRef.current = ref;
      }}>
      <StatusBar barStyle={'dark-content'} />
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
