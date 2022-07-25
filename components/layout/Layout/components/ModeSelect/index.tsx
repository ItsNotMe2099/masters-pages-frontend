import {useDetectOutsideClick} from 'components/hooks/useDetectOutsideClick'
import {changeRole} from 'components/Profile/actions'
import ArrowDropDown from 'components/svg/ArrowDropDown'
import {useEffect, useRef, useState} from 'react'
import {IRootState} from 'types'
import styles from './index.module.scss'
import cx from 'classnames'

import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {getProfileRoleByRoute} from 'utils/profileRole'
import {useRouter} from 'next/router'
import {IUser} from 'data/intefaces/IUser'
import {ProfileRole} from 'data/intefaces/IProfile'
import {useAppContext} from 'context/state'

interface Props {
  onClick?: () => void
  user: IUser
}

 const ModeSelect = (props: Props) => {
  const {user} = props
   const { t } = useTranslation('common')
   const {route: currentRoute} = useRouter()
   const appContext = useAppContext()
   const roleCurrent = appContext.role
   const role =  getProfileRoleByRoute(currentRoute)  || roleCurrent
  const dispatch = useDispatch()

  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  const options = role !== ProfileRole.Corporate ? [
    { value: ProfileRole.Client, label: t('personalArea.profile.modeClient') },
    { value: ProfileRole.Master, label: t('personalArea.profile.modeMaster') },
    { value: ProfileRole.Volunteer, label: t('personalArea.profile.modeVolunteer') },
    //{ value: ProfileRole.Corporate, label: t('personalArea.profile.modeCorporate') },
  ] :
  [{ value: ProfileRole.Corporate, label: t('personalArea.profile.modeCorporate') }]

  const [value, setValue] = useState(options.find(item => role ? item.value === role : item.value === 'client'))

  useEffect(() => {
    setValue(options.find(item => role ? item.value === role : item.value === 'client'))
  }, [role])
  const handleOptionClick = (e, item) => {
    e.preventDefault()
    setValue(item)
    appContext.updateRole(item.value);
    setIsActive(false)
    if(props.onClick) {
    props.onClick()
    }
  }
  const handleActiveOptionClick = (e) => {
    e.preventDefault()
    setIsActive(false)
  }

   const getModeClass = () => {
     switch (value?.value) {
       case ProfileRole.Master:
         return styles.modeMaster
       case ProfileRole.Volunteer:
         return styles.modeVolunteer
       case ProfileRole.Corporate:
         return styles.modeCorporate
       case ProfileRole.Client:
       default:
         return styles.modeClient
     }
   }

   const getTextColor = () => {
    switch (value?.value) {
      case ProfileRole.Master:
        return styles.modeMasterText
      case ProfileRole.Volunteer:
        return styles.modeVolunteerText
      case ProfileRole.Corporate:
        return styles.modeCorporateText
      case ProfileRole.Client:
      default:
        return styles.modeClientText
    }
  }

  return (
    <>
    <div className={`${styles.root} ${getModeClass()}`}>
      <a onClick={onClick} className={`${styles.dropDownTrigger} ${getTextColor()}`}>
        <div className={`${styles.dropdownItemLabel} ${getTextColor()}`}>{value.label}</div>
        <ArrowDropDown/>
      </a>
      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <ul>
          {options.filter(item => !value || item.value != value.value).map(item => (
            <li className={styles.dropdownItem}
            >
              <a href="" onClick={(e) => handleOptionClick(e, item)}>
                <span className={styles.dropdownItemLabel}>{item.label}</span>
              </a>
            </li>
          ))}

        </ul>
      </nav>
    </div>
    <div className={styles.menuSeparator}></div>
    </>
  )
}
export default ModeSelect
