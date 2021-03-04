import NextI18Next from "next-i18next";

const path = require('path')
const next: NextI18Next = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['en', 'fr'],
  localeSubpaths: {
    ru: 'ru',
    en: 'en',
    fr: 'fr',
  },
  localePath: path.resolve('./public/static/locales')
})
export default next
