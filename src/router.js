import React from 'react';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';
import {SplashScreen} from './splash';
import {SettingsPage} from './settings';
import {ExpenseList} from './expense';

export const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="splash" component={SplashScreen} initial hideNavBar />
        <Scene key="settings" component={SettingsPage} hideNavBar />
        <Scene key="expense" component={ExpenseList} hideNavBar />
      </Stack>
    </Router>
  );
};
