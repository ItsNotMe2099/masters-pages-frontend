import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  FacebookShareButton, LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import {IRootState} from 'types'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'
import Routes from "pages/routes";
interface Props {
  customLink?: string
  subCategoryId?: number
}

export default function ShareBySocialMedia({subCategoryId, customLink}: Props) {
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const profile = appContext.profile
  const {t} = useTranslation('common')

  const shareUrl = `${ typeof window !== 'undefined' ? window?.location.protocol + '//' + window?.location.host : '/'}${subCategoryId ? `/sk${subCategoryId}` : `${Routes.profile(profile)}${customLink ? `/${customLink}` : ''}`}`

  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('shareBySocialMedia')}</div>
      <div className={styles.buttons}>
        <div className={styles.shareButton}>
      <LinkedinShareButton url={shareUrl}>
        <img src="/img/icons/socials/share_linkedin.svg" alt="" />
      </LinkedinShareButton>
        </div>
        <div className={styles.shareButton}>
        <FacebookShareButton url={shareUrl}>
        <img src="/img/icons/socials/share_fb.svg" alt="" />
      </FacebookShareButton>
        </div>
        <div className={styles.shareButton}>
      <TwitterShareButton url={shareUrl}>
        <img src="/img/icons/socials/share_twitter.svg" alt="" />
      </TwitterShareButton>
        </div>
      </div>
    </div>
  )
}
