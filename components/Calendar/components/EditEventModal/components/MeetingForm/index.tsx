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
  return (
     <div className={styles.root}>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${placeType === 'Online' && styles.tab__active}`} onClick={handleOnlineClick}>Online</div>
        <div className={`${styles.tab} ${placeType !== 'Online' && styles.tab__active}`} onClick={handleOfflineClick}>Location</div>
      </div>
        <div className={styles.body}>
          {placeType === 'Online' && <Field
            name="meetingLink"
            component={TextArea}
            label="Meeting link"
            validate={required}
          />}
          {placeType !== 'Online' && <Field
            name="placeType"
            component={RadioList}
            grid={2}
            size={'small'}
            labelType="placeholder"
            label={'Type'}
            options={[ {label: 'Client Address', value: 'ClientAddress'}, {label: 'Master Address', value: 'MasterAddress'}]}
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
            label="Address 1"
            labelType={'static'}
            size={'small'}
          />}
          {placeType !== 'Online' && <Field
            name="address2"
            component={Input}
            label="Address 2"
            labelType={'static'}
            size={'small'}
          />}

          {placeType !== 'Online' && <div className={styles.addresses}>
            <Field
              name="city"
              component={Input}
              label="City"
              labelType={'static'}
              size={'small'}
            />
            <Field
              name="region"
              component={Input}
              label="State"
              labelType={'static'}
              size={'small'}
            />
            <Field
              name="zipcode"
              component={Input}
              label="Zip code"
              labelType={'static'}
              size={'small'}
            />
          </div>}
        </div>
    </div>
  )
}

export default MeetingForm
