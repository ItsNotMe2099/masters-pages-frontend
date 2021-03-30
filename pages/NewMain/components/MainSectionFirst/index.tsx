import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import MainSectionButton from 'pages/NewMain/components/Button'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import {signUpOpen} from 'components/Modal/actions'

const Label = ({label, index}: {label: string, index: number}) => {

  return (<div className={styles.label} style={{marginLeft:(index >= 3 ? 30 : 0) +  index * 18}}>
    <span className={styles.labelFirst}>{label[0]}</span>
    <span>{label.slice(1)}</span>
  </div>)
}
const Category = ({label}: {label: string}) => {
  return (<div className={styles.category}>
    <img src={'/img/Main/icons/mark.svg'}/> {label}
  </div>)
}
const MainSectionFirst = (props) => {
  const dispatch = useDispatch()
  const renderLabel = (label, index) => {
    return (<div className={styles.label}>
      <span className={styles.labelFirst}>{label[0]}</span>
      <span>{label.slice(1)}</span>
    </div>)
  }
  return (
    <div className={styles.root}  style={{backgroundImage: `url(/img/Main/bg/first_${Math.floor(Math.random() * 6) + 1 }.png)`}}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
        <div className={styles.title}>Modern business management platform for self-employed
          professionals</div>
          <div className={styles.categories}>
            <div className={styles.categoriesColumn}>
              <Category label={'Tutors'}/>
              <Category label={'Repairman'}/>
              <Category label={'Beauty master'}/>
            </div>
            <div className={styles.categoriesColumn}>
              <Category label={'Freelancers'}/>
              <Category label={'Accountants'}/>
              <Category label={'Lawyers'}/>

            </div>
            <div className={styles.categoriesColumn}>
              <Category label={'Athletic coaches'}/>
              <Category label={'Artists'}/>
              <Category label={'Home staff'}/>
            </div>
            <div className={styles.categoriesColumn}>
              <Category label={'Veterinarians'}/>
              <Category label={'Driving instructors'}/>
              <Category label={'Doctors'}/>
            </div>
            <div className={styles.categoriesColumn}>
              <Category label={'Various specialists'}/>

            </div>

            </div>
        <div className={styles.description}>
          Organize smooth flow of your business in the most efficient way in one place with MastersPages:
        </div>
        <MainSectionButton>We go live in May 2021</MainSectionButton>
        </div>
        <div className={styles.rightSide}>
          <Label label={'Advertise'} index={0}/>
          <Label label={'Communicate'} index={1}/>
          <Label label={'Time manage'} index={2}/>
          <div className={styles.labelSeparator}/>
          <Label label={'Note'} index={3}/>
          <Label label={'Organize'} index={4}/>
          <Label label={'Wow'} index={5}/>
        </div>
      </div>
      <div className={styles.bgRect}></div>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide();
export default MainSectionFirst
