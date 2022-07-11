import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import ArrowDropDown from 'components/svg/ArrowDropDown'
import { useTranslation} from 'next-i18next'
import { useRef, useState, useEffect } from 'react'
import styles from './index.module.scss'
import cx from 'classnames'
import { setCookie } from 'nookies'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

interface Props {
  isAuth: boolean
  className?: string
}
 const LangSelect = (props: Props) => {
  const { i18n } = useTranslation()
   const { language } = i18n
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const router = useRouter()
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }
  const options = [
    //{ value: 'ru', label: 'RU' },
    { value: 'en', label: 'EN' },
  ]
   console.log('Language', i18n.language)
  const [value, setValue] = useState(options.find(item => item.value === language))

  useEffect(() => {
    if(Cookies.get('next-i18next')){
      const lang = {value: Cookies.get('next-i18next'), label: Cookies.get('next-i18next').toUpperCase()}
      i18n.changeLanguage(lang.value)
      setValue(lang)
    }
  }, [])

  const handleOptionClick = (e, item) => {
    e.preventDefault()
    setValue(item)
    console.log('ItemValue', item.value)
    setCookie(null,'next-i18next', item.value)
    i18n.changeLanguage(item.value)
    setIsActive(false)
    router.push(router.asPath, router.asPath, { locale: item.value })
  }
  const handleActiveOptionClick = (e) => {
    e.preventDefault()
    setIsActive(false)
  }

  console.log('ROUTERRRRRRR', router)
  return (
    <div className={cx(styles.root, {[styles.rootAuth]: props.isAuth}, props.className)}>
      <a onClick={onClick} className={styles.dropDownTrigger}>
        <img className={styles.dropdownItemIcon} src={`/img/icons/flags/${value.value}.svg`} alt=''/>
        <span className={props.isAuth ? styles.dropdownItemLabelAuth : styles.dropdownItemLabel}>{value.label}</span>
        <ArrowDropDown/>
      </a>
      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <ul>
          {value &&
          <li className={styles.dropdownItem}><a href="" onClick={handleActiveOptionClick}>
            <img className={styles.dropdownItemIcon} src={`/img/icons/flags/${value.value}.svg`} alt=''/>
            <span className={styles.dropdownItemLabel}>{value.label}</span>
            <img className={styles.arrowActive}
                 src={'/img/icons/arrow_active.svg'}
                 alt=''/></a></li>
          }
          {options.filter(item => !value || item.value != value.value).map(item => (
            <li className={styles.dropdownItem}
            >
              <a href="" onClick={(e) => handleOptionClick(e, item)}>
                <img className={styles.dropdownItemIcon} src={`/img/icons/flags/${item.value}.svg`} alt=''/>
                <span className={cx(styles.dropdownItemLabel, {[styles.black]: isActive})}>{item.label}</span>
              </a>
            </li>
          ))}

        </ul>
      </nav>
    </div>
  )
}

export default LangSelect
