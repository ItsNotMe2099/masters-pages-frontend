import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'

interface Props{

}

const Welcome = (props: Props) => {

  const {t} = useTranslation('common')

  const listItems = [
    {text: 'Collection of standardized applications from volunteers and self-employed professionals'},
    {text: 'Management of applications received'},
    {text: 'Accounting for services received'},
    {text: 'Instant reports'},
    {text: 'Review and Recommendations for volunteers and self-employed'},
    {text: 'Communication with volunteers and self employed'},
    {text: 'Publication of corporate news for volunteers and self-employed'},
    {text: 'Scheduling of events for volunteers and self employed'},
    {text: 'Placement of ads for volunteers and self-employed'}
  ]

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Welcome!
      </div>
      <div className={styles.interest}>
        Thank you for your interest in MastersPages corporate services.  Corporate account at MastersPages is free of charge for registered companies.
      </div>
      <div className={styles.list}>
        <div className={styles.listTitle}>
          Corporate account provides the following functionality:
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
        To get your free corporate account at MastersPages please, complete corporate registration form.  Normal corporate application processing time is 2 business days.  We will review application and notify you once account is open.
      </div>
    </div>
  )
}

export default Welcome
