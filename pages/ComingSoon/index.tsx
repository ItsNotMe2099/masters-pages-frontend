import Facebook from 'components/svg/Facebook'
import Instagram from 'components/svg/Instagram'
import Head from 'next/head'
import Backgrounds from './components/Backgrounds'
import styles from './index.module.scss'

const ComingSoon = (props) => {

  const renderSocials = () => {
    return <div className={styles.social}>
        <a href="#" target="_blank"><Facebook className={styles.facebook}/></a>
        <a href="#" target="_blank"><Instagram className={styles.instagram}/></a>
    </div>
  }

  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
    </Head>
    <body className={styles.body}>
      <div className={styles.root}>
        <div className={styles.imgMobile}>
          <img src="/img/ComingSoon/Frame 5.svg" alt=""/>
        </div>
        <div className={styles.text}>
          <div className={styles.title}>Welcome to MASTERSPAGES</div>
          <div className={styles.ad}>
            We will be up and running in March 2021. Please, come back and try us out.
          </div>
          <div className={styles.list}>
            MastersPages will help everyone:
            <ul>
              <li>If you are a Master (professional, specialist), Masterpages is where you can promote your services by posting and presenting your qualifications and skills, your works, brag your achievements, get customer reviews, and get requests for your services. MastersPages will help you keep track of your assignments and plan your work time.</li>
              <li>If you are a Volunteer, Masterpages is where you can find those in need of your help and support. You will be able to keep records of your work, get recognition via gratitude feedback</li>
              <li>If you are a Customer, Masterpages is where you can find a Master or a Volunteer for your specific requirements by searching profiles or posting an ad with your task requirenments. You can choose a specialist you like, based on qualifications and skills, previous works, authentic customer reviews. You will be served at location of your choosing or online and even in language of your preference.</li>
            </ul>
          </div>
          <div className={styles.follow}>Follow us</div>
          <div>{renderSocials()}</div>
        </div>
        <div className={styles.img}>
          <img src="/img/ComingSoon/Frame 4.svg" alt=""/>
        </div>
        <Backgrounds/>
      </div>
    </body>
    </>
  )
}

export default ComingSoon
