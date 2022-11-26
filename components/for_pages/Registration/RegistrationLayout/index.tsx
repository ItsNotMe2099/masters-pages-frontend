import styles from 'pages/registration/corporate/index.module.scss'
import {ReactElement, useState} from 'react'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import MainSectionHeader from 'components/for_pages/Corporate/Header'
import NextSvg from 'components/svg/NextSvg'

interface Props {
  children?: ReactElement | ReactElement[]
}

const RegistrationLayout = (props: Props) => {
  return (
    <div className={styles.body}>
      <MainSectionHeader isRegistration/>
      <div className={classNames(styles.root, {[styles.alt]: false})}>
        {props.children}
      </div>
    </div>
  )
}
export default RegistrationLayout
