import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import PersonalLabelForm from 'components/Share/PersonalLabel/Form'
import ShareLabel from 'components/Share/ShareLabel'
import Button from 'components/PublicProfile/components/Button'
import * as React from 'react'
import {IRootState, ISharePersonalLabel} from 'types'
import {useRef, useState} from 'react'
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';

interface Props {
  subCategoryId?: number
  phone: string
}

export default function SharePersonalLabel(props: Props) {
  const dispatch = useDispatch()
  const {phone, subCategoryId} = props;
  const profile = useSelector((state: IRootState) => state.profile.currentProfile);
  const labelRef = useRef(null);
  const [settings, setSettings] = useState<ISharePersonalLabel>({
    theme: 'light',
    style: 'horizontal',
    options: {
      qrCode: true,
      name: true,
      phone: true,
      webAddress: true
    }
  });
  const shareUrl = `${ typeof window !== 'undefined' ? window?.location.protocol + "//" + window?.location.host : '/'}/${subCategoryId ? `sk${subCategoryId}` : `id${profile.id}`}`;

  const handleChange = (data) => {
    console.log("handleChange", data)

    setSettings((settings) => ({...settings, ...data}));
  }
  const handleDownloadImage = () => {
    console.log("LabelRef", labelRef);
    exportComponentAsJPEG(labelRef);
  }
  const handleDownloadPdf= () => {
    exportComponentAsPDF(labelRef, {
      pdfOptions: {
        w: 300,
        h: 164,
        pdfFormat: [1595.28, 841.89]
      }
    });
  }
  return (
    <div className={styles.root} >
      <div className={styles.title}>Your personal label</div>
      <div className={styles.description}>Use your personal MP label as email signature , letter head, business cards logo or place on your outdoor ads</div>
      <PersonalLabelForm onChange={handleChange} initialValues={settings}/>
      <div className={styles.shareLabel}><ShareLabel ref={labelRef} link={shareUrl} settings={settings} name={`${profile.firstName} ${profile.lastName}`} phone={phone} id={subCategoryId ? `sk${subCategoryId}` : `id${profile.id}`}/></div>
      <div className={styles.btnContainer}>
        <Button size={'small'} onClick={handleDownloadPdf}>Download PDF</Button>
        <Button size={'small'} onClick={handleDownloadImage}>Download image</Button>
      </div>
    </div>
  )
}
