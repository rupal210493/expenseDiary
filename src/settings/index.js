import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import {
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Modal,
  Card,
  Button,
} from '@ui-kitten/components';
import {Picker} from '@react-native-community/picker';
import {globalstyle, globalStyle} from '../styles/globalstyle';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-eva-icons';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import {translate} from '../../translator';
import {setI18nConfig} from '../../translator';
import {
  isLanguageSet,
  getUserLanguage,
  setUserLanguage,
  saveSetUpDone,
} from '../db';
import {Actions} from 'react-native-router-flux';
import {saveUserSettings} from '../db';
import currencylist from '../assets/currency/currencyicon.json';

const LanguageSelectorView = props => {
  return (
    <View>
      <Text
        style={{
          textAlign: 'left',
          fontSize: 16,
          marginBottom: 5,
          opacity: 0.5,
        }}>
        {translate('setting_language')}
      </Text>
      <Picker
        style={globalStyle.dropdown}
        onValueChange={(itemValue, itemIndex) => props.setLanguage(itemValue)}>
        <Picker.Item label="e.g. Hindi, English" value="en" />
        <Picker.Item label="Hindi" value="hi" />
        <Picker.Item label="English" value="en" />
      </Picker>
    </View>
  );
};

const LanguageSelector = props => {
  const [language, setLanguage] = React.useState('en');
  return (
    <Modal
      visible={props.isLangSelectorVisible}
      backdropStyle={styles.backdrop}>
      <Card disabled={true}>
        <LanguageSelectorView language={language} setLanguage={setLanguage} />
        <Button onPress={() => props.selectLanguageHandler(language)}>
          <Text>Save</Text>
        </Button>
      </Card>
    </Modal>
  );
};

export class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLangSelected: false,
      name: null,
      currency: null,
    };
  }

  selectLanguageHandler = language => {
    console.log('language selected is ', language);
    setUserLanguage(language);
    this.handleLocalizationChange(language);
  };

  handleLocalizationChange = languageTag => {
    setI18nConfig(languageTag);
    this.forceUpdate();
  };

  handleChangeName = name => {
    this.setState({
      name,
    });
  };

  handleChangeCurrency = currency => {
    this.setState({
      currency,
    });
  };

  getCurrencyVerboseName = (name, symbol) => {
    return `${name} (${symbol})`;
  };

  render() {
    if (isLanguageSet() === false) {
      return (
        <LanguageSelector
          isLangSelectorVisible={true}
          selectLanguageHandler={this.selectLanguageHandler}
        />
      );
    }

    let dim = Dimensions.get('window').height / 2;
    return (
      <Layout style={globalStyle.backgroundColor} level="1">
        <Layout
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#ed213a',
            justifyContent: 'center',
            paddingLeft: 15,
            paddingTop: 40,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="settings-2-outline"
              fill="#fff"
              width={40}
              height={40}
            />
            <Text style={{fontSize: 28, color: '#ffffff', flexWrap: 'wrap'}}>
              {' '}
              Settings
            </Text>
          </View>
        </Layout>
        <Layout style={styles.shadow} level="2">
          <View>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 16,
                marginBottom: 5,
                opacity: 0.5,
              }}>
              {translate('setting_name')}
            </Text>
            <TextInput
              style={globalStyle.dropdown}
              inlineImageLeft="search_icon"
              onChangeText={text => {
                this.handleChangeName(text);
              }}
            />
          </View>
          <LanguageSelectorView setLanguage={this.selectLanguageHandler} />
          <View>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 16,
                marginBottom: 5,
                opacity: 0.5,
              }}>
              {translate('setting_currency')}
            </Text>
            <Picker
              selectedValue={this.state.currency}
              style={globalStyle.dropdown}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({currency: itemValue})
              }>
              {currencylist.map((curr, index) => {
                return (
                  <Picker.Item
                    key={curr.id}
                    label={this.getCurrencyVerboseName(curr.name, curr.symbol)}
                    value={curr.symbol}
                  />
                );
              })}
            </Picker>
          </View>
          <Button
            title="Press me"
            style={{backgroundColor: '#ed213a', borderColor: '#ed213a'}}
            onPress={() => {
              saveUserSettings(this.state);
              saveSetUpDone();
              console.log('Saving settings ', this.state);
              Actions.expense();
            }}>
            <Text style={{fontSize: 17}}>Save</Text>{' '}
          </Button>
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 15,
    flex: 5,
    width: '100%',
    justifyContent: 'center',
  },
  linearGradient: {
    padding: 15,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
