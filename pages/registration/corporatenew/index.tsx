import styles from 'pages/registration/corporatenew/index.module.scss'
import {getAuthServerSide} from 'utils/auth'
import RegForm from 'components/for_pages/CorporateRegistration/FormNew'
import { useState } from 'react'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import MainSectionHeader from 'components/for_pages/Corporate/Header'
import NextSvg from 'components/svg/NextSvg'


interface Props {
  
}

const CorporateNew = (props: Props) => {

  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  return (
    <div className={styles.body}>
      <MainSectionHeader/>
      <div className={classNames(styles.root, {[styles.alt]: isSuccess})}>
        {isSuccess ?
        <>
        <div className={styles.title}>
          THANK YOU FOR THE APPLICATION
        </div>
        <div className={styles.illustration}><img src='/img/Registration/new/corp/success.svg' alt=''/></div>
        <div className={styles.text}>Regular application processing time is 2 business days. <br/>
        <div>We will review the application and notify you once your account is open.</div></div>
        <div className={styles.btns}>
          <div className={styles.wrapper}>
          <Button 
            type='button'
            href='/guestpage'
            className={styles.btn}>
            Guest access<NextSvg/>
          </Button>
          <div className={styles.desc}>
            Search volunteers
          </div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.wrapper}>
          <Button 
            type='button'
            href='/corporate'
            className={styles.btn}>
            Organizations site<NextSvg/>
          </Button>
          <div className={styles.desc}>
            Tutorial, videos and sample profiles
          </div>
          </div>
        </div>
        </>
        :
        <RegForm onSubmit={() => setIsSuccess(true)}/>
        }
      </div>
    </div>
  )
}

export const getServerSideProps = getAuthServerSide({redirect: false})

export default CorporateNew
