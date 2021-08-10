import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import {default as React, useEffect, useState} from "react";
import {useTranslation} from "i18n";
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'
import {format} from 'date-fns'
import cookie from "js-cookie";
const queryString = require('query-string')
import axios from 'axios';
const SharePersonalLabel = dynamic(() => import('components/Share/PersonalLabel'), {
  ssr: false
})
import {IProfileGalleryItem, IRootState} from 'types'

import Modals from 'components/layout/Modals'
import {fetchReportFilters, fetchReportList} from 'components/Report/actions'
import MultiSelect from 'components/ui/Inputs/MultiSelect'
import {CheckboxList} from 'components/ui/Inputs/CheckboxList'
import {addDays} from 'date-fns'
import ReportFilterForm from 'components/Report/ReportFilterForm'
import Button from 'components/PublicProfile/components/Button'
import Loader from 'components/ui/Loader'


const ReportPage = (props) => {
  const {t} = useTranslation('common')
  const router = useRouter();

  const filter = useSelector((state: IRootState) => state.report.filter);
  const list = useSelector((state: IRootState) => state.report.list);
  const listLoading = useSelector((state: IRootState) => state.report.listLoading);
  const dispatch = useDispatch()
  const [fields, setFields] = useState();
  const [filterData, setFilterData] = useState({
    range: {
      start: new Date(),
      end: new Date(),
    },
    start: new Date(),
    end: new Date(),
    fields: ['id',
      'title',
      'plannedTime',
      'actualTime',
      'plannedAmount',
      'actualAmount',
      'clientName',
      'masterName',
      'review',
      'events',
      'reviewMark',
      'address', ]
  });



  const handleChange = (data) => {
    if(data.fields){
      setFields(data.fields);
    }
    const filter = {
      ...data,
      ...data.range as {start: Date, end: Date},

    };


    setFilterData(filter)
    dispatch(fetchReportList(filter));
  }
  const handleDownload = () => {
    const token = cookie.get('token') as string
    const profileRole = cookie.get('mode') as string || 'client'
    axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/reports/xlsx?${queryString.stringify({...filterData,
        start: format(filterData.start, 'yyyy-MM-dd 00:00:00 XXX'),
        end: format(filterData.end, 'yyyy-MM-dd 23:59:59 XXX'),

      }, {arrayFormat: 'bracket'})}`, // download url
      method: 'get',
      responseType: 'blob',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'profile-role': profileRole
      }
    })
      .then(response => new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }))
      .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'report.xlsx'
        a.click()
        a.remove()
        setTimeout(() => window.URL.revokeObjectURL(url), 100)
      })
  }
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <ReportFilterForm onSubmit={() => {}} onChange={handleChange} initialValues={{...filterData}}/>
        </div>
        {listLoading && <Loader/>}
        {!listLoading && list.length > 0 && <div className={styles.report}>
          <div className={styles.reportHeader}>
            {fields.includes('id') && <div className={`${styles.reportCell}`}>{t('report.id')}</div>}
            {fields.includes('title') && <div className={`${styles.reportCell}`}>{t('title')}</div>}
            {fields.includes('plannedTime') && <div className={`${styles.reportCell}`}>{t('reportFilterForm.plannedTime')}</div>}
            {fields.includes('actualTime') && <div className={`${styles.reportCell}`}>{t('reportFilterForm.actualTime')}</div>}
            {fields.includes('plannedAmount') && <div className={`${styles.reportCell}`}>{t('reportFilterForm.plannedAmount')}</div>}
            {fields.includes('actualAmount') && <div className={`${styles.reportCell}`}>{t('reportFilterForm.actualAmount')}</div>}
            {fields.includes('clientName') && <div className={`${styles.reportCell}`}>{t('reportFilterForm.clientName')}</div>}
            {fields.includes('masterName') && <div className={`${styles.reportCell}`}>{t('reportFilterForm.masterName')}</div>}
            {fields.includes('review') && <div className={`${styles.reportCell}`}>{t('review')}</div>}
            {fields.includes('events') && <div className={`${styles.reportCell}`}>{t('events')}</div>}
            {fields.includes('reviewMark') && <div className={`${styles.reportCell}`}>{t('review')}</div>}
            {fields.includes('address') && <div className={`${styles.reportCell}`}>{t('address')}</div>}
          </div>

          {list.map((item) => <div className={styles.reportRow}>
            {fields.includes('id') && <div className={`${styles.reportCell}`}>{item.id}</div>}
            {fields.includes('title') && <div className={`${styles.reportCell}`}>{item.title}</div>}
            {fields.includes('plannedTime') && <div className={`${styles.reportCell}`}>{item.planned_time}</div>}
            {fields.includes('actualTime') && <div className={`${styles.reportCell}`}>{item.actual_time}</div>}
            {fields.includes('plannedAmount') && <div className={`${styles.reportCell}`}>{item.planned_amount}</div>}
            {fields.includes('actualAmount') && <div className={`${styles.reportCell}`}>{item.actual_amount}</div>}
            {fields.includes('clientName') && <div className={`${styles.reportCell}`}>{item.client_name}</div>}
            {fields.includes('masterName') && <div className={`${styles.reportCell}`}>{item.master_name}</div>}
            {fields.includes('review') && <div className={`${styles.reportCell}`}>{item.review}</div>}
            {fields.includes('events') && <div className={`${styles.reportCell}`}>{item.events}</div>}
            {fields.includes('reviewMark') && <div className={`${styles.reportCell}`}>{item.review_mark}</div>}
            {fields.includes('address') && <div className={`${styles.reportCell}`}>{item.address}</div>}
          </div>)}
        </div>}
        {(!listLoading && list.length > 0 && filterData.start && filterData.end) &&<div className={styles.actions}>
          <Button onClick={handleDownload} size={'small'}>Download XLS</Button>
        </div>}
      </div>
    <Modals/>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default ReportPage
