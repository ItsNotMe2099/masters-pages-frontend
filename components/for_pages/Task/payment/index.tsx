import Map from 'components/Map'
import * as React from 'react'
import Button from 'components/ui/Button'
import styles from 'components/for_pages/Task/payment/index.module.scss'
import { useDispatch } from 'react-redux'
import { ITask } from 'types'
import { useTranslation } from 'next-i18next'

interface Props {
  task: ITask
}


const Payment = (props: Props) => {

  const dispatch = useDispatch()
  const {t} = useTranslation('common')
  const handleAccept = () => {

  }



  return (
    <>
      <div className={styles.payment}>
        <div className={styles.grey}>
        <div className={styles.titleLeft}>
        {`${t('task.paymentMethod')}:`}
        </div>
        <div className={styles.methodWrapper}>
        <div className={styles.method}>
          <img src="/img/SearchTaskPage/icons/bank.svg" alt=''/>
          <div className={styles.desc}>{t('task.paymentMethodBank')}</div>
        </div>
        <div className={styles.method}>
          <img src="/img/SearchTaskPage/icons/cash.svg" alt=''/>
          <div className={styles.desc}>{t('task.paymentMethodCash')}</div>
        </div>
        <div className={styles.methodSafe}>
          <img className={styles.last} src="/img/SearchTaskPage/icons/safe.svg" alt=''/>
          <div className={styles.desc}>{t('task.paymentMethodSafeDeal')}</div>
        </div>
        </div>
        {props.task.budget ?
          <div className={styles.priceWrapper}>
          <div className={styles.price}>
            {`${t('fixedPrice')}:`}
          </div>
          <div className={styles.title}>
          {t('task.lessThen')} <span>${props.task.budget}</span>
          </div>
          </div>
          :
          props.task.ratePerHour && <div className={styles.priceWrapper}>
          <div className={styles.price}>
          {`${t('hourly')}:`}
          </div>
          <div className={styles.title}>
            <span>${props.task.ratePerHour}/${t('priceRateSuffix')}</span>
          </div>
          </div>
          }
          <div className={styles.btnContainer}>
            <Button bold smallFont transparent size='16px 0' onClick={handleAccept}>{t('task.acceptTask')}</Button>
          </div>
          <div className={styles.location}>
          {`${t('location')}:`}
          </div>
          </div>
          <div className={styles.map}>
            <Map/>
          </div>
      </div>
    </>
  )
}

export default Payment
