import NextI18Next from 'next-i18next';
const domainLocaleMap = {
  'masterspages.com': 'en',
  'masterspages.ru': 'ru',
  // other domains
};

const path = require('path')
const domainDetector = {
  name: 'domainDetector',
  lookup(req, res, options) {

    return 'ru'
    const hostname = (typeof window !== 'undefined')
      ? window.location.hostname
      : req.headers.host?.split(':')[0]
    return domainLocaleMap[hostname]
  }
};
const options = {
  browserLanguageDetection:true,
  serverLanguageDetection:  true,
  strictMode: false,
  debug: false,
  defaultLanguage: 'en',
  otherLanguages: ['ru'],
  detection: {
    order: ['domainDetector', 'cookie'],
   },
   customDetectors: [domainDetector],
  localePath: path.resolve('./public/static/locales'),
  interpolation: {
    format: function (value, format, lng) {
      return value;
    },
  },
};

// @ts-ignore
const i18n = new NextI18Next(options);
export const withNamespaces = i18n?.['withNamespaces'];
export const Link = i18n.Link;
export const Trans = i18n.Trans;
export const appWithTranslation = i18n.appWithTranslation;
export const withTranslation = i18n.withTranslation;
export const  useTranslation = i18n.useTranslation;
export const config = i18n.config;
export default i18n;
/*
const next = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['en', 'ru'],
  serverLanguageDetection: true,
  localeSubpaths: {
    ru: 'ru',
    en: 'en',
    fr: 'fr',
  },
  //detection: {
  //  order: ['domainDetector'],
 // },
 // customDetectors: [domainDetector],
  localePath: path.resolve('./public/static/locales')
})
export default next*/
