import React from 'react';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {RouterComponent} from './src/router';
import {Layout, Text} from '@ui-kitten/components';
import { StyleSheet, StatusBar, View } from 'react-native';
import theme from './src/styles/theme.json';
import {setI18nConfig} from './translator';
import * as RNLocalize from "react-native-localize";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        // setI18nConfig(getUserLanguage()); // set initial config
    }
    
      componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
      }
    
      componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
      }
    
      handleLocalizationChange = () => {
        setI18nConfig(null);
        this.forceUpdate();
      };

    render() {
        return (

            <ApplicationProvider {...eva} theme={eva.light}>
                <RouterComponent/>
             
            </ApplicationProvider>

        );
    }
}