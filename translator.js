import React from "react";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance

import {
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";


const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    hi: () => require("./src/assets/translations/hi.json"),
    en: () => require("./src/assets/translations/en.json"),
    // fr: () => require("./src/translations/fr.json")
  };
  
  export const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
  );
  
  export const setI18nConfig = (language) => {
    // fallback if no available language fits
    const fallback = { languageTag: "en", isRTL: false };
    let languageTag = null;
    if (language == null) {
      languageTag = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
                                                                        fallback;
      languageTag = languageTag.languageTag;
    } else {
      languageTag = language;
    }
    console.log("Setting language ", language);
    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(false);
    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
  };