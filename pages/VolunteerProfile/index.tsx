import { loaderOpen, modalClose } from 'components/Modal/actions'

import { createProfile } from 'components/Profile/actions'
import { useEffect } from 'react'
import { IRootState } from 'types'
import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import SimpleSlider from 'components/Steps/MasterProfile/Slider'
import MasterForm from 'components/MasterProfileForm'
import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'

const MasterProfile = (props) => {
  const dispatch = useDispatch()
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const {t} = useTranslation('common')

  useEffect(() => {
    if(formLoading){
      dispatch(loaderOpen())
    }else{
      dispatch(modalClose())
    }
  }, [formLoading])
  const handleSubmit = (data) => {
    dispatch(createProfile('volunteer', {
      ...data,
      preferredCategories: data.categories.map((item) => item.id),
      preferredSubCategories: data.categories.map((item) => {
        return item.subCategories.map(item => item.id)
      }).flat(Infinity)
    }))
  }
  return (
    <Layout showLeftMenu={false}>
      <div className={styles.steps}>
        <div className={styles.stepsContainer}>
        <SimpleSlider/>
        </div>
      </div>
      <div className={styles.container}>

        <div className={styles.required}>* {t('requiredField')}</div>
        <MasterForm onSubmit={handleSubmit} initialValues={{
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          countryCode: profile?.geoname?.country,
          geonameid: profile?.geonameid,
          birthday: profile?.birthday,
          photo: profile?.photo,
        }}/>

      </div>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true})
export default MasterProfile
