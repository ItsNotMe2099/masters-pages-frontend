import styles from './index.module.scss'
import Link from 'next/link'
import Button from 'components/ui/Button'
import { useTranslation } from 'next-i18next'

interface Props {
}

export default function BannerSection(props: Props) {
  const {t} = useTranslation('common')
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.title}>{t('mainPage.free')}</div>
          <div className={styles.description}>{t('mainPage.find')}</div>
          <div className={styles.peopleMobile}>
            <img src='/img/MainPage/people.png' alt=''/>
          </div>
          <form className={styles.form} action='/search'>
            <div className={styles.inputContainer}>
              <input className={styles.search}
                     placeholder={t('mainPage.specialist')}
                     name="query"
                     type='text'
              />
              <div className={styles.inputTip}>{t('mainPage.example')} <Link href="/search?query=Looking for a pet doctor"><a>{t('mainPage.petDoctor')}</a></Link></div>
              <Button black mediumFont size="16px 0">{t('mainPage.order')}</Button>
            </div>


          </form>
        </div>
        <div className={styles.peopleDesktop}>
          <img src='/img/MainPage/people.png' alt=''/>
        </div>
      </div>
    </div>
  )
}
