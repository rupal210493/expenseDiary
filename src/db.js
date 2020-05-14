import SyncStorage from 'sync-storage';
import {Settings} from 'react-native';
import syncStorage from 'sync-storage';

export const initStorage = async () => {
  const data = await SyncStorage.init();
  console.log('AsyncStorage is ready!', data);
};

const Keys = {
  USER_LANGUAGE: 'userLanguage',
  USER_SETTINGS: 'userSettings',
  USER_SETUP_DONE: 'userSetUpDone',
  EXPENSE_LIST: 'expenseListv1',
};

export const isLanguageSet = () => {
  return getUserLanguage() != null;
};

export const getUserLanguage = () => {
  return SyncStorage.get(Keys.USER_LANGUAGE);
};

export const setUserLanguage = language => {
  return SyncStorage.set(Keys.USER_LANGUAGE, language);
};

export const saveUserSettings = settings => {
  return SyncStorage.set(Keys.USER_SETTINGS, settings);
};

export const getUserSettings = () => {
  return SyncStorage.get(Keys.USER_SETTINGS);
};

export const isSetUpDone = () => {
  return SyncStorage.get(Keys.USER_SETUP_DONE);
};

export const saveSetUpDone = () => {
  return SyncStorage.set(Keys.USER_SETUP_DONE, true);
};

export const saveExpenseList = expenseList => {
  let expenses = [];
  for (let i = 0; i < expenseList.length; i++) {
    const newObject = {
      date: expenseList[i].date.getTime(),
      name: expenseList[i].name,
      amount: expenseList[i].amount,
      expenseId: expenseList[i].expenseId,
    };
    expenses.push(newObject);
    console.log(expenses);
  }
  return SyncStorage.set(Keys.EXPENSE_LIST, expenses);
};

export const getExpenseList = () => {
  let expenseList = SyncStorage.get(Keys.EXPENSE_LIST) || [];
  for (let i = 0; i < expenseList.length; i++) {
    expenseList[i].date = new Date(expenseList[i].date);
  }
  return expenseList;
};
