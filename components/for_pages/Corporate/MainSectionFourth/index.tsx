import styles from 'components/for_pages/Corporate/MainSectionFourth/index.module.scss'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import SampleProfile from 'components/for_pages/Corporate/MainSectionFourth/SampleProfile'
import MainSectionButton from 'components/for_pages/Corporate/Button'
import { useDispatch } from 'react-redux'
import { signUpOpen } from 'components/Modal/actions'
import { IProfile } from 'data/intefaces/IProfile'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import { CONTACTS } from 'types'


const MainSectionFourth = (props) => {

  const { t } = useTranslation('common')

  const dispatch = useDispatch()

  const files = [
    {url: '/files/MastersPages corporate service.pdf', title: 'MastersPages corporate service'},
    {url: '/files/Masterspages onepager.pdf', title: 'Masterspages onepager'},]

  const url = '/api/profile/for-main-page'
  //const { data: data } = useSWR(url)

  const [data, setData] = useState<IProfile[]>([])

  useEffect(() => {
    ProfileRepository.fetchProfilesForMainPage().then(data => {
      if(data){
        setData(data)
      }
    })
  }, [])


  return (
    <div className={styles.root}>
      <div className={styles.container}>
      <div className={styles.videos}>
        <div className={styles.title}>Files</div>
        {files.map(item =>
          <a className={styles.item} 
          href={item.url} 
          target='_blank' 
          download={item.url}>
            <div className={styles.image}>
              <img src={'/img/files/pdf.png'} alt=''/>
            </div>
            <span>{item.title}</span>
          </a>
        )}
      </div>
      <div className={styles.separator}></div>
      <div className={styles.profiles}>
        <div className={styles.title}>Profile examples</div>
        {data && data.slice(0, 3).map((item, index) =>
          <SampleProfile item={item} type={index === 1 ? 'Corporate profile' : index === 2 ? 'Volunteer project' : 'Volunteer profile'}/>
        )}
      </div>
      <div className={styles.separator}></div>
      <div className={styles.reviews}>
        <div className={styles.title}>Contact us</div>
        <div className={styles.mail}>
          <img src='/img/Corporate/icons/mail.svg' alt=''/>
          <a className={styles.email} href={`mailto:${CONTACTS.email}`}>{CONTACTS.email} </a>
        </div>
      </div>
      </div>
      <div className={styles.btns}>
            <MainSectionButton size="normal" color="outlineYellow" href='/guestpage'>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
            <MainSectionButton size="normal" color="yellow" onClick={() => dispatch(signUpOpen())}>{t('newMainVolunteer.freeSignUp')}</MainSectionButton>
      </div>
    </div>
  )
}
export default MainSectionFourth
