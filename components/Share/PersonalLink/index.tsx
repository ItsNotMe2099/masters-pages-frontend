import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import Input from 'components/ui/Inputs/Input'
import * as React from 'react'
import {IRootState} from 'types'
import {useEffect, useState} from 'react'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'
import Routes from "pages/routes";

interface Props {
  customLink?: string
  subCategoryId?: number
}

export default function SharePersonalLink({subCategoryId, customLink}: Props) {
  const appContext = useAppContext();
  const profile = appContext.profile
  const dispatch = useDispatch()
  const shareUrl = `${ typeof window !== 'undefined' ? window?.location.protocol + '//' + window?.location.host : '/'}${subCategoryId ? `/sk${subCategoryId}` : `${Routes.profile(profile)}${customLink ? `/${customLink}` : ''}`}`
  const [isCopied, setIsCopied] = useState(false)
  const { t } = useTranslation('common')
  useEffect(() => {

  })
  const handleCopy = () => {
    setIsCopied(true)
    const textField = document.createElement('textarea')
    textField.innerText = shareUrl
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('personalLink.yourPersonalLink')}</div>
      <Input  icon={<img className={styles.copy} onClick={handleCopy} src={'/img/icons/copy.svg'}/>}  input={{value: shareUrl}} labelType={'static'} type={'text'}/>
      {isCopied && <div className={styles.tip}>{t('personalLink.linkWas')}</div>}
    </div>
  )
}
