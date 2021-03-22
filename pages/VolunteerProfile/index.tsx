import { loaderOpen, modalClose } from "components/Modal/actions";
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import { createProfile } from "components/Profile/actions";
import Steps from 'components/Steps'
import { useEffect } from "react";
import { IRootState } from "types";
import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { createTaskComplete } from 'components/CreateTaskPage/actions';
import { useDispatch, useSelector } from 'react-redux'
import SimpleSlider from 'components/Steps/MasterProfile/Slider'
import MasterForm from 'components/MasterProfileForm'

const MasterProfile = (props) => {
  const dispatch = useDispatch()
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  useEffect(() => {
    if(formLoading){
      dispatch(loaderOpen());
    }else{
      dispatch(modalClose());
    }
  }, [formLoading])
  const handleSubmit = (data) => {
  console.log("HandleSubmit", data)
    dispatch(createProfile('volunteer', {
      ...data,
      preferredCategories: data.categories.map((item) => item.id),
      preferredSubCategories: data.categories.map((item) => {
        return item.subCategories.map(item => item.id)
      }).flat(Infinity)
    }));
  }

  return (
    <>
      <Header {...props}/>
      <div className={styles.steps}>
        <div className={styles.stepsContainer}>
        <SimpleSlider/>
        </div>
      </div>
      <div className={styles.container}>

        <div className={styles.required}>* required field</div>
        <MasterForm onSubmit={handleSubmit} initialValues={{
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          countryCode: profile?.geoname?.countryCode,
          geonameid: profile?.geonameid,
          birthday: profile?.birthday,
          photo: profile?.photo,
        }}/>
          <Footer/>

      </div>
    </>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default MasterProfile
