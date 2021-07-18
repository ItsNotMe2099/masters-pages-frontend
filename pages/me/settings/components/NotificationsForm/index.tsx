import Input from "components/ui/Inputs/Input";
import { Field, reduxForm,formValueSelector } from 'redux-form'

import styles from './index.module.scss'
import {useTranslation} from "i18n";
import Checkbox from "components/ui/Inputs/Checkbox";
import * as React from "react";

let NotificationsForm = props => {
  const {t} = useTranslation();
  const { handleSubmit } = props
  const handleHourFieldChange = () => {
    props.change('budget', null);
  }
  const handleFixedFieldChange = () => {
    props.change('ratePerHour', null);
    props.change('estimate', null);
  }
  const options = [
    {key: 'messages', title: t('personalArea.tabSettings.notificationSettings.messages')},
    {key: 'newTaskOffer', title: t('personalArea.tabSettings.notificationSettings.newTaskOffer')},
    {key: 'newTaskResponse', title: t('personalArea.tabSettings.notificationSettings.newTaskResponse')},
    {key: 'newFeedback', title: t('personalArea.tabSettings.notificationSettings.newFeedback')},
    {key: 'taskOfferDeclined', title: t('personalArea.tabSettings.notificationSettings.taskOfferDeclined')},
    {key: 'eventPlanned', title: 'Event planned'},
    {key: 'eventStatusChanged', title: 'Event status changed'},
    {key: 'eventRemind', title: 'Event remind'},
    {key: 'news', title: 'News'},
  ];
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerLabel}>{t('personalArea.tabSettings.fieldNotificationSettings')}</div>
        <div className={styles.headerLabel}>{t('personalArea.tabSettings.push')}</div>
        <div className={styles.headerLabel}>{t('personalArea.tabSettings.email')}</div>
      </div>
      {options.map(option => <div className={styles.row}>
        <div className={styles.label}><div className={styles.cellCenter}>{option.title}</div></div>
        <div className={styles.push}>
          <div className={styles.cellCenter}>
          <Field name={`notifications.${option.key}.push`}
                 component={Checkbox}
                 label={null}
          ></Field>
          </div>
        </div>
        <div className={styles.email}>
          <div className={styles.cellCenter}>
          <Field name={`notifications.${option.key}.email`}
                 component={Checkbox}
          ></Field>
          </div>
        </div>
      </div>)}
     </div>
  )
}
export default NotificationsForm
