import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import ProjectDescriptionHeader from 'components/for_pages/Project/ProjectModal/ProjectDescriptionHeader'
import {useTranslation} from 'next-i18next'
import {Form, FormikProvider} from 'formik'
import {useAppContext} from 'context/state'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import TabApplicationView from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationView'
import TabApplicationForm from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationForm'
import ApplicationRepository from 'data/repositories/ApplicationRepository'

interface Props {
  
}

const VolunteerStats = ({ ...props}: Props) => {

  return (
    <div className={styles.statistic}>
    <div className={styles.withUs}>
      Statistic with us:
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Applications:
      </div>
      0
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Projects:
      </div>
      0
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Orders:
      </div>
      0
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Hours:
      </div>
      0h
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Reviews:
      </div>
      0
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Recommendation:
      </div>
      No
    </div>
  </div>
  )
}

export default VolunteerStats
