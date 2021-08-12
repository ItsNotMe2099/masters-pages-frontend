import Input from "components/ui/Inputs/Input";
import * as React from "react";
import { required } from "utils/validations";
import styles from './index.module.scss'
import { Field, reduxForm,formValueSelector } from 'redux-form'
import DateTimeRange from 'components/ui/Inputs/DateTimeRange'
import TimeExpense from 'components/ui/Inputs/TimeExpense'
import Expenses from 'components/Calendar/components/EditEventModal/components/Expenses'
import {IEvent} from 'types'
import {useState} from 'react'
import TextArea from 'components/ui/Inputs/TextArea'
import InputAddress from 'components/ui/Inputs/InputAddress'
import {RadioList} from 'components/ui/Inputs/RadioList'
import {useTranslation} from 'i18n'

interface Props {
  event?: IEvent,
  change?: (key, value) => void
  placeType?: string
}
let MeetingForm = ({change, placeType}: Props) => {
  const handleOnlineClick = () => {
    change('placeType', 'Online')
  }
  const handleOfflineClick = () => {
    change('placeType', 'ClientAddress')
  }
  const {t} = useTranslation('common');
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
            options={[ {label: t('meetingForm.clientAddress'), value: 'ClientAddress'}, {label: t('meetingForm.masterAddress'), value: 'MasterAddress'}]}
          />}
          {placeType !== 'Online' && <div className={styles.orSection}>
            <div className={styles.orWrapper}>
              <div className={styles.orText}>or</div>
              <div className={styles.orBorder}></div>
            </div>
          </div>}
          {placeType !== 'Online' && <Field
            name="address1"
            component={Input}
            label={t('meetingForm.address1')}
            labelType={'static'}
            size={'small'}
          />}
          {placeType !== 'Online' && <Field
            name="address2"
            component={Input}
            label={t('meetingForm.address2')}
            labelType={'static'}
            size={'small'}
          />}

          {placeType !== 'Online' && <div className={styles.addresses}>
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
