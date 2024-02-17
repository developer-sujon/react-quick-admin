//External Lib Import
import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

//Internal Lib Import
import translationBn from './bn/translation.json';
import translationEn from './en/translation.json';
import store from '../redux/store';

//Translations
const resources = {
  bn: {
    translation: translationBn,
  },
  en: {
    translation: translationEn,
  },
};

i18n.use(detector).use(initReactI18next).init({
  resources,
  lng: store?.getState()?.settingReducer?.language,

  fallbackLng: 'en',
});

export default i18n;
