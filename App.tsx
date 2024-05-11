import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigators/Navigation.tsx';
import {navigationRef} from './src/utils/navigationUtils.ts';

const App = () => {
  return (
    <NavigationContainer
      ref={ref => {
        navigationRef.current = ref;
      }}>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
