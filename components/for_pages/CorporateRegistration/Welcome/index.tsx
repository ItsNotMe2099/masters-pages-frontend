import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'

interface Props{

}

const Welcome = (props: Props) => {

  const {t} = useTranslation('common')


  const listItems = [
    {text: t('welcome.list.collection')},
    {text: t('welcome.list.managment')},
    {text: t('welcome.list.accounting')},
    {text: t('welcome.list.reports')},
    {text: t('welcome.list.review')},
    {text: t('welcome.list.communication')},
    {text: t('welcome.list.publication')},
    {text: t('welcome.list.scheduling')},
    {text: t('welcome.list.placement')}
  ]

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {t('welcome.welcome')}
      </div>
      <div className={styles.interest}>
        {t('welcome.thankYou')}
      </div>
      <div className={styles.list}>
        <div className={styles.listTitle}>
        {t('welcome.functionality')}
        </div>
        {listItems.map((item, index) =>
          <div className={styles.item} key={index}>
            <div className={styles.icon}>
              <img src='/img/Corporate/icon.svg' alt=''/>
            </div>
            <div className={styles.text}>
              {item.text}
            </div>
          </div>
        )}
      </div>
      <div className={styles.bottom}>
      {t('welcome.toGet')}
      </div>
    </div>
  )
}

export default Welcome
