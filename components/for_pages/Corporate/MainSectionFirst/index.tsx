import styles from 'components/for_pages/Corporate/MainSectionFirst/index.module.scss'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import MainSectionButton from 'components/for_pages/Corporate/Button'
import Video from '../MainSectionFourth/Video'
import { FullScreen, useFullScreenHandle } from "react-full-screen"

interface Props {

}

interface PlayProps{
  onClick: () => void
}


const MainSectionFirst = (props: Props) => {

  const {t} = useTranslation('common')
  const dispatch = useDispatch()

  const handle = useFullScreenHandle()

  const Category = ({label}: {label: string}) => {
    return (<div className={styles.category}>
      <div><img src={'/img/Main/icons/mark.svg'}/></div> {label}
    </div>)
  }

  const Play = (props: PlayProps) => {
    return (
      <div className={styles.play}>
        <div className={styles.icon} onClick={props.onClick}>
          <img src='/img/MainVolunteer/bg/play-btn.svg' alt=''/>
        </div>
        <div className={styles.watch}>
          WATCH VIDEO
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.portal}>
          <div className={styles.text}>
            {t('newMainVolunteer.portal')}
          </div>
          <div className={styles.categories}>
            <Category label={t('newMainVolunteer.individualAssignments')}/>
            <Category label={t('newMainVolunteer.projects')}/>
          </div>
          <div className={styles.btns}>
            {/*<MainSectionButton size="normal" color="outlineYellow" href='/guestpage'>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
            <MainSectionButton size="normal" color="yellow" onClick={() => dispatch(signUpOpen())}>{t('newMainVolunteer.freeSignUp')}</MainSectionButton>*/}
            <div className={styles.hidden}>
              <FullScreen handle={handle}>
              <Video className={styles.video} url='https://www.youtube.com/watch?v=O3i3XX6Fj-A' title='' playBtn={<MainSectionButton onClick={handle.enter} size="normal" color="yellow">WATCH VIDEO</MainSectionButton>}/>
              </FullScreen>
            </div>
          </div>
        </div>
        <div className={styles.image}>
        <div className={styles.hidden}>
        <FullScreen handle={handle}>
          <Video className={styles.video} url='https://www.youtube.com/watch?v=O3i3XX6Fj-A' title='' playBtn={<Play onClick={handle.enter}/>}/>
        </FullScreen>
        </div>
          <img src='/img/MainVolunteer/bg/first.png' alt=''/>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}
export default MainSectionFirst
