import { useEffect } from 'react'
import * as React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { useDispatch, useSelector, connect } from 'react-redux'
import { useTranslation } from 'next-i18next'
import ReportDateSelector from 'components/Report/ReportDateSelector'
import MultiSelect from 'components/ui/Inputs/MultiSelect'
import {CheckboxList} from 'components/ui/Inputs/CheckboxList'
import {fetchReportFilters} from 'components/Report/actions'

let ReportFilterForm = props => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const { handleSubmit } = props
  const filter = useSelector((state: IRootState) => state.report.filter)
  useEffect(() => {
    dispatch(fetchReportFilters({
      ...props.initialValues.range
    }))
  }, [])
  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div className={styles.filters}>
        <div className={styles.filterDate}>
          <div className={styles.filterLabel}>{t('reportFilterForm.overview')}</div>
          <div className={styles.filterValue}>
            <Field
              name="range"
              component={ReportDateSelector}
              onChange={(value) => {
                dispatch(fetchReportFilters({
                  ...value
                }))
              }}
            />

        </div>
        </div>

        <div className={styles.filterBy}>
          <div className={styles.filterLabel}>{t('reportFilterForm.filterBy')}</div>
          <div className={`${styles.cell} ${styles.filterValue}`}>
            {filter?.clientsFilter?.data.length > 0 && <Field
              name="clientsIds"
              component={MultiSelect}
              options={filter?.clientsFilter?.data.map(item => ({label: item.name, value: item.id}))}
              label={t('clients')}
            />}


            {filter?.mastersFilter?.data.length > 0 && <Field
              name="mastersIds"
              component={MultiSelect}
              options={filter?.mastersFilter?.data.map(item => ({label: item.name, value: item.id}))}
              label={t('masters')}
            />}

            {filter?.tasksFilter?.data.length > 0 && <Field
              name="ordersIds"
              component={MultiSelect}
              options={filter?.tasksFilter?.data.map(item => ({label: item.title, value: item.id}))}
              label={t('orders')}
            />}

          </div>
        </div>
      </div>
      <div className={styles.fields}>

        {filter?.tasksFilter?.data.length > 0 && <Field
          name="fields"
          flex={'float'}
          component={CheckboxList}
          checkboxClassName={styles.checkbox}
          options={[
            {value: 'id', label: '№'},
            {value: 'title', label: t('title')},
            {value: 'plannedTime', label: t('reportFilterForm.plannedTime')},
            {value: 'actualTime', label: t('reportFilterForm.actualTime')},
            {value: 'plannedAmount', label: t('reportFilterForm.plannedAmount')},
            {value: 'actualAmount', label: t('reportFilterForm.actualAmount')},
            {value: 'clientName', label: t('reportFilterForm.clientName')},
            {value: 'masterName', label: t('reportFilterForm.masterName')},
            {value: 'review', label: t('review')},
            {value: 'events', label: t('event.events')},
            {value: 'reviewMark', label: t('reportFilterForm.reviewMark')},
            {value: 'address', label: t('address')}
          ]}
        />}

      </div>
  </form>


  )
}



ReportFilterForm  = reduxForm({
  form: 'ReportFilterForm',

}) (ReportFilterForm )
const selector = formValueSelector('ReportFilterForm') // <-- same as form name
ReportFilterForm = connect(state => {
 // const phone = selector(state, 'phone')
  return {

  }
})(ReportFilterForm)

export default ReportFilterForm
