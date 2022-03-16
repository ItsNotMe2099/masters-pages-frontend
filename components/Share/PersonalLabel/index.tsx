import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import PersonalLabelForm from 'components/Share/PersonalLabel/Form'
import ShareLabel from 'components/Share/ShareLabel'
import Button from 'components/PublicProfile/components/Button'
import * as React from 'react'
import {IRootState, ISharePersonalLabel} from 'types'
import {useRef, useState} from 'react'
import { exportComponentAsJPEG, exportComponentAsPDF } from 'react-component-export-image'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'

interface Props {
  customLink?: string
  subCategoryId?: number
  phone: string
}

export default function SharePersonalLabel(props: Props) {
  const dispatch = useDispatch()
  const {phone, subCategoryId, customLink} = props
  const appContext = useAppContext();
  const profile = appContext.profile
  const labelRef = useRef(null)
  const { t } = useTranslation('common')
  const [settings, setSettings] = useState<ISharePersonalLabel>({
    theme: 'light',
    style: 'horizontal',
    options: {
      qrCode: true,
      name: true,
      phone: true,
      webAddress: true
    }
  })
  const shareUrl = `${ typeof window !== 'undefined' ? window?.location.protocol + '//' + window?.location.host : '/'}/${subCategoryId ? `sk${subCategoryId}` : `id${profile.id}${customLink ? `/${customLink}` : ''}`}`

  const handleChange = (data) => {
    setSettings((settings) => ({...settings, ...data}))
  }
  const handleDownloadImage = () => {
    exportComponentAsJPEG(labelRef)
  }
  const handleDownloadPdf= () => {
    exportComponentAsPDF(labelRef, {
      pdfOptions: {
        w: 300,
        h: 164,
        pdfFormat: [1595.28, 841.89]
      }
    })
  }
  return (
    <div className={styles.root} >
      <div className={styles.title}>{t('personalLabel.yourPersonalLabel')}</div>
      <div className={styles.description}>{t('personalLabel.useYourPersonal')}</div>
      <PersonalLabelForm onChange={handleChange} initialValues={settings}/>
      <div className={styles.shareLabel}><ShareLabel ref={labelRef} link={shareUrl} settings={settings} name={`${profile.firstName} ${profile.lastName}`} phone={phone} id={subCategoryId ? `sk${subCategoryId}` : `id${profile.id}`}/></div>
      <div className={styles.btnContainer}>
        <Button size={'small'} onClick={handleDownloadPdf}>{t('personalLabel.downloadPDF')}</Button>
        <Button size={'small'} onClick={handleDownloadImage}>{t('personalLabel.downloadImage')}</Button>
      </div>
    </div>
  )
}
