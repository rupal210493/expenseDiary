/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Layout, Text} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import {block} from 'react-native-reanimated';
import {globalStyle} from '../src/styles/globalstyle';
import {Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AppStatusBar from './settings';
import {initStorage, getUserLanguage, isSetUpDone} from '../src/db';
import {setI18nConfig} from '../translator';

export class SplashScreen extends React.Component {
  componentDidMount() {
    initStorage().then(data => {
      console.log(data);
      setI18nConfig(getUserLanguage());
      setTimeout(() => {
        if (isSetUpDone() === true) {
          Actions.expense();
        } else {
          Actions.settings();
        }
      }, 1500);
    });
  }
  render() {
    return (
      <View>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="#ed213a"
        />
        {
          <LinearGradient
            colors={['#ed213a', '#93291e']}
            style={styles.linearGradient}>
            <Image
              source={require('./assets/tax.png')}
              style={{width: 150, height: 150}}
            />
          </LinearGradient>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    padding: 15,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});
