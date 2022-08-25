import styles from './index.module.scss'

import {IProfilePreferWorkIn, IRootState} from 'types'
import Card from 'components/PublicProfile/components/Card'
import LanguageListItem from 'components/PublicProfile/components/view/CardLanguages/components/LanguageListItem'
import {hideProfileForm, showProfileForm, updateProfileByForm} from 'components/Profile/actions'
import {changeArrayOrder} from 'utils/array'

import { useSelector, useDispatch } from 'react-redux'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import LanguageForm from 'components/PublicProfile/components/view/CardLanguages/components/Form'
import { useTranslation } from 'next-i18next'
import {IProfile} from 'data/intefaces/IProfile'
import ProfileRepository from 'data/repositories/ProfileRepostory'

interface Props{
  profile: IProfile,
  isEdit: boolean
  onProfileUpdate?: () => void

}


export enum LanguageCode {
  /** Afrikaans */
  af = 'af',
  /** Akan */
  ak = 'ak',
  /** Albanian */
  sq = 'sq',
  /** Amharic */
  am = 'am',
  /** Arabic */
  ar = 'ar',
  /** Armenian */
  hy = 'hy',
  /** Assamese */
    as = 'as',
  /** Azerbaijani */
  az = 'az',
  /** Bambara */
  bm = 'bm',
  /** Bangla */
  bn = 'bn',
  /** Basque */
  eu = 'eu',
  /** Belarusian */
  be = 'be',
  /** Bsnian */
  bs = 'bs',
  /** Breton */
  br = 'br',
  /** Bulgarian */
  bg = 'bg',
  /** Burmese */
  my = 'my',
  /** Catalan */
  ca = 'ca',
  /** Chechen */
  ce = 'ce',
  /** Chinese */
  zh = 'zh',
  zhm = 'zhm',
  zhw = 'zhw',
  zhy = 'zhy',
  /** Simplified Chinese */
  zh_Hans = 'zh_Hans',
  /** Traditional Chinese */
  zh_Hant = 'zh_Hant',
  /** Church Slavic */
  cu = 'cu',
  /** Cornish */
  kw = 'kw',
  /** Corsican */
  co = 'co',
  /** Croatian */
  hr = 'hr',
  /** Czech */
  cs = 'cs',
  /** Danish */
  da = 'da',
  /** Dutch */
  nl = 'nl',
  /** Flemish */
  nl_BE = 'nl_BE',
  /** Dzongkha */
  dz = 'dz',
  /** English */
  en = 'en',
  /** Australian English */
  en_AU = 'en_AU',
  /** Canadian English */
  en_CA = 'en_CA',
  /** British English */
  en_GB = 'en_GB',
  /** American English */
  en_US = 'en_US',
  /** Esperanto */
  eo = 'eo',
  /** Estonian */
  et = 'et',
  /** Ewe */
  ee = 'ee',
  /** Faroese */
  fo = 'fo',
  /** Finnish */
  fi = 'fi',
  /** French */
  fr = 'fr',
  /** Canadian French */
  fr_CA = 'fr_CA',
  /** Swiss French */
  fr_CH = 'fr_CH',
  /** Fulah */
  ff = 'ff',
  /** Galician */
  gl = 'gl',
  /** Ganda */
  lg = 'lg',
  /** Georgian */
  ka = 'ka',
  /** German */
  de = 'de',
  /** Austrian German */
  de_AT = 'de_AT',
  /** Swiss High German */
  de_CH = 'de_CH',
  /** Greek */
  el = 'el',
  /** Gujarati */
  gu = 'gu',
  /** Haitian Creole */
  ht = 'ht',
  /** Hausa */
  ha = 'ha',
  /** Hebrew */
  he = 'he',
  /** Hindi */
  hi = 'hi',
  hid = 'hid',
  /** Hungarian */
  hu = 'hu',
  /** Icelandic */
    is = 'is',
  /** Igbo */
  ig = 'ig',
  /** Indonesian */
  id = 'id',
  /** Interlingua */
  ia = 'ia',
  /** Irish */
  ga = 'ga',
  /** Italian */
  it = 'it',
  /** Japanese */
  ja = 'ja',
  /** Javanese */
  jv = 'jv',
  /** Kalaallisut */
  kl = 'kl',
  /** Kannada */
  kn = 'kn',
  /** Kashmiri */
  ks = 'ks',
  /** Kazakh */
  kk = 'kk',
  /** Khmer */
  km = 'km',
  /** Kikuyu */
  ki = 'ki',
  /** Kinyarwanda */
  rw = 'rw',
  /** Korean */
  ko = 'ko',
  /** Kurdish */
  ku = 'ku',
  /** Kyrgyz */
  ky = 'ky',
  /** Lao */
  lo = 'lo',
  /** Latin */
  la = 'la',
  /** Latvian */
  lv = 'lv',
  /** Lingala */
  ln = 'ln',
  /** Lithuanian */
  lt = 'lt',
  /** Luba-Katanga */
  lu = 'lu',
  /** Luxembourgish */
  lb = 'lb',
  /** Macedonian */
  mk = 'mk',
  /** Malagasy */
  mg = 'mg',
  /** Malay */
  ms = 'ms',
  /** Malayalam */
  ml = 'ml',
  /** Maltese */
  mt = 'mt',
  /** Manx */
  gv = 'gv',
  /** Maori */
  mi = 'mi',
  /** Marathi */
  mr = 'mr',
  /** Mongolian */
  mn = 'mn',
  /** Nepali */
  ne = 'ne',
  /** North Ndebele */
  nd = 'nd',
  /** Northern Sami */
  se = 'se',
  /** Norwegian Bokmål */
  nb = 'nb',
  /** Norwegian Nynorsk */
  nn = 'nn',
  /** Nyanja */
  ny = 'ny',
  /** Odia */
  or = 'or',
  /** Oromo */
  om = 'om',
  /** Ossetic */
  os = 'os',
  /** Pashto */
  ps = 'ps',
  /** Persian */
  fa = 'fa',
  /** Dari */
  fa_AF = 'fa_AF',
  /** Polish */
  pl = 'pl',
  /** Portuguese */
  pt = 'pt',
  /** Brazilian Portuguese */
  pt_BR = 'pt_BR',
  /** European Portuguese */
  pt_PT = 'pt_PT',
  /** Punjabi */
  pa = 'pa',
  /** Quechua */
  qu = 'qu',
  /** Romanian */
  ro = 'ro',
  /** Moldavian */
  ro_MD = 'ro_MD',
  /** Romansh */
  rm = 'rm',
  /** Rundi */
  rn = 'rn',
  /** Russian */
  ru = 'ru',
  /** Samoan */
  sm = 'sm',
  /** Sango */
  sg = 'sg',
  /** Sanskrit */
  sa = 'sa',
  /** Scottish Gaelic */
  gd = 'gd',
  /** Serbian */
  sr = 'sr',
  /** Shona */
  sn = 'sn',
  /** Sichuan Yi */
  ii = 'ii',
  /** Sindhi */
  sd = 'sd',
  /** Sinhala */
  si = 'si',
  /** Slovak */
  sk = 'sk',
  /** Slovenian */
  sl = 'sl',
  /** Somali */
  so = 'so',
  /** Southern Sotho */
  st = 'st',
  /** Spanish */
  es = 'es',
  /** European Spanish */
  es_ES = 'es_ES',
  /** Mexican Spanish */
  es_MX = 'es_MX',
  /** Sundanese */
  su = 'su',
  /** Swahili */
  sw = 'sw',
  /** Congo Swahili */
  sw_CD = 'sw_CD',
  /** Swedish */
  sv = 'sv',
  /** Tajik */
  tg = 'tg',
  /** Tamil */
  ta = 'ta',
  /** Tatar */
  tt = 'tt',
  /** Telugu */
  te = 'te',
  /** Thai */
  th = 'th',
  /** Tibetan */
  bo = 'bo',
  /** Tigrinya */
  ti = 'ti',
  /** Tongan */
  to = 'to',
  /** Turkish */
  tr = 'tr',
  /** Turkmen */
  tk = 'tk',
  /** Ukrainian */
  uk = 'uk',
  /** Urdu */
  ur = 'ur',
  /** Uyghur */
  ug = 'ug',
  /** Uzbek */
  uz = 'uz',
  /** Vietnamese */
  vi = 'vi',
  /** Volapük */
  vo = 'vo',
  /** Welsh */
  cy = 'cy',
  /** Western Frisian */
  fy = 'fy',
  /** Wolof */
  wo = 'wo',
  /** Xhosa */
  xh = 'xh',
  /** Yiddish */
  yi = 'yi',
  /** Yoruba */
  yo = 'yo',
  /** Zulu */
  zu = 'zu',
}
const CardLanguages = (props: Props) => {
  const dispatch = useDispatch()
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)
  const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key => key === 'language')
  const { profile, isEdit } = props
  const { t } = useTranslation('common')

  const handleEditClick = () => {
    dispatch(showProfileForm( 'language'))
  }
  const handleSubmit = async (data) => {
    //dispatch(updateProfileByForm(profile.id, {languages: [...profile.languages ? profile.languages : [], data.language]}, 'language'))
    await ProfileRepository.updateProfile(profile.id, {languages: [...profile.languages ? profile.languages : [], data.language]})
    props.onProfileUpdate && props.onProfileUpdate()
    dispatch(hideProfileForm( 'language'))

  }
  const handleCancel = () => {
    dispatch(hideProfileForm( 'language'))
  }
  const handleMoveUp = async (model: IProfilePreferWorkIn, index: number) => {
    const newArray = changeArrayOrder(profile.languages, index, index - 1)
    //dispatch(updateProfileByForm(profile.id, {languages: newArray}, 'language'))
    await ProfileRepository.updateProfile(profile.id, {languages: newArray})
    props.onProfileUpdate && props.onProfileUpdate()
  }

  const handleMoveDown = async (model: IProfilePreferWorkIn, index: number) => {
    const newArray = changeArrayOrder(profile.languages, index, index + 1)
    //dispatch(updateProfileByForm(profile.id, {languages: newArray}, 'language'))
    await ProfileRepository.updateProfile(profile.id, {languages: newArray})
    props.onProfileUpdate && props.onProfileUpdate()
  }
  const handleDelete = async (model: IProfilePreferWorkIn, index: number) => {
    const newArray = [...profile.languages]
    newArray.splice(index, 1)
    //dispatch(updateProfileByForm(profile.id, {languages: newArray}, 'language'))
    await ProfileRepository.updateProfile(profile.id, {languages: newArray})
    props.onProfileUpdate && props.onProfileUpdate()
  }

  return (
    <Card isHidden={!isEdit && profile.languages?.length === 0} className={styles.root} isLoading={showForm && formLoading} title={t('cardLanguages.languages')} toolbar={isEdit ? [<FormActionButton type={'create'} title={t('add')} onClick={handleEditClick}/>] : []}>
      {profile.languages.map((item, index) => <LanguageListItem isEdit={isEdit} index={index} model={item} onMoveUp={(index > 0  && profile.preferToWorkIn.length > 1) ? handleMoveUp : null} onMoveDown={(index == 0  && profile.preferToWorkIn.length > 1) ? handleMoveDown : null} onDelete={handleDelete} />)}
      {showForm && <LanguageForm onSubmit={handleSubmit} onCancel={handleCancel}/>}
    </Card>
  )
}

export default CardLanguages
