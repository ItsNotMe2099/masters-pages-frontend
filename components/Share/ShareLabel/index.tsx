import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import Input from 'components/ui/Inputs/Input'
import * as React from 'react'
import {IRootState, ISharePersonalLabel} from 'types'
import Phone from 'components/svg/Phone'
var QRCode = require('qrcode.react');
import parsePhoneNumber, {isPossiblePhoneNumber} from 'libphonenumber-js'
import Logo from 'components/Logo'
import LogoSvg from 'components/svg/Logo'
import LogoMobileSvg from 'components/svg/LogoMobileSvg'
import Link from 'next/link'
interface Props {
  name: string,
  phone: string,
  id: string,
  link?: string
  settings: ISharePersonalLabel,
  subCategoryId?: number
}

const ShareLabel = React.forwardRef((props: Props, ref) => {
  const {settings, name, id, phone, link} = props

  const phoneNumber = phone ? parsePhoneNumber(phone) : null;
  const showInfo = settings.options.webAddress || settings.options.name || settings.options.phone;
  const getThemeClass = () => {
    switch (settings.theme){
      case 'dark':
        return styles.dark;
      case 'light':
        return styles.light;
    }
  }
  const getStyleClass = () => {
    switch (settings.style){
      case 'vertical':
        return styles.vertical;
      case 'horizontal':
        return styles.horizontal;
    }
  }
  return (
    <div ref={ref as any} className={styles.root}>
      <div className={`${styles.wrapper} ${getStyleClass()} ${getThemeClass()}`}>
        {settings.options.qrCode && <QRCode value={link} size={122} imageSettings={{
        height: 37,
        width: 37,
        src: '/img/icons/qr_code_logo.svg'}}/>}
        {!settings.options.qrCode &&
        <div className={styles.logo}>
          {settings.theme === 'dark'  ? <img className={styles.logoIcon} src={'/img/share/logo_dark.svg'}/> :  <img className={styles.logoIcon} src={'/img/share/logo_light.svg'}/>}

          <div className={`${styles.logoText}`} >Masters <span>Pages</span></div>

        </div>}
        {showInfo && <div className={styles.info}>
          {settings.options.name && <div className={styles.name}>{name}</div>}
          {settings.options.webAddress && <div className={styles.mpId}>mp id: {id}</div>}
          {(settings.options.phone && phoneNumber) && <div className={styles.phone}><Phone/>{phoneNumber.formatInternational()}</div>}
        </div>}
      </div>
    </div>
  )
})
export default ShareLabel;
