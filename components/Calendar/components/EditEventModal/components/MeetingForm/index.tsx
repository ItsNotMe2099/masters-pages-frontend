import Input from 'components/ui/Inputs/Input'
import * as React from 'react'
import styles from './index.module.scss'
import { Field } from 'redux-form'
import {IEvent} from 'types'
import TextArea from 'components/ui/Inputs/TextArea'
import {RadioList} from 'components/ui/Inputs/RadioList'
import { useTranslation } from 'next-i18next'

interface Props {
  event?: IEvent,
  change?: (key, value) => void
  placeType?: string
}
const MeetingForm = ({change, placeType}: Props) => {
  const handleOnlineClick = () => {
    change('placeType', 'Online')
  }
  const handleOfflineClick = () => {
    change('placeType', 'ClientAddress')
  }
  const {t} = useTranslation('common')
  return (
     <div className={styles.root}>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${placeType === 'Online' && styles.tab__active}`} onClick={handleOnlineClick}>{t('online')}</div>
        <div className={`${styles.tab} ${placeType !== 'Online' && styles.tab__active}`} onClick={handleOfflineClick}>{t('location')}</div>
      </div>
        <div className={styles.body}>
          {placeType === 'Online' && <Field
            name="meetingLink"
            component={TextArea}
            label={t('meetingForm.meetingLink')}
          />}
          {placeType !== 'Online' && <Field
            name="placeType"
            component={RadioList}
            grid={2}
            size={'small'}
            labelType="placeholder"
            label={t('meetingForm.type')}
            options={[
              {label: t('meetingForm.clientAddress'), value: 'ClientAddress'},
              {label: t('meetingForm.masterAddress'), value: 'MasterAddress'},
              {label: t('meetingForm.otherAddress'), value: 'OtherAddress'}
            ]}
          />}
          {placeType === 'OtherAddress' && <div className={styles.orSection}>
            <div className={styles.orWrapper}>
              <div className={styles.orText}>or</div>
              <div className={styles.orBorder}></div>
            </div>
          </div>}
          {placeType === 'OtherAddress' && <Field
            name="address1"
            component={Input}
            label={t('meetingForm.address1')}
            labelType={'static'}
            size={'small'}
          />}
          {placeType === 'OtherAddress' && <Field
            name="address2"
            component={Input}
            label={t('meetingForm.address2')}
            labelType={'static'}
            size={'small'}
          />}

          {placeType === 'OtherAddress' && <div className={styles.addresses}>
            <Field
              name="city"
              component={Input}
              label={t('meetingForm.city')}
              labelType={'static'}
              size={'small'}
            />
            <Field
              name="region"
              component={Input}
              label={t('meetingForm.state')}
              labelType={'static'}
              size={'small'}
            />
            <Field
              name="zipcode"
              component={Input}
              label={t('meetingForm.zipCode')}
              labelType={'static'}
              size={'small'}
            />
          </div>}
        </div>
    </div>
  )
}

export default MeetingForm
