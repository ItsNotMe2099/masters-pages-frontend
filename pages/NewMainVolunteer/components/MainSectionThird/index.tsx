import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {useTranslation} from "i18n";
import { useState } from "react";
import MainSlider from "./Slider";
import cx from 'classnames'


const MainSectionThird = (props) => {
  
  const { t } = useTranslation('common')


  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <MainSlider/>
      </div>
      <div className={styles.bgRect}></div>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide();
export default MainSectionThird
