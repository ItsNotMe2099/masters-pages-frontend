import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Steps from 'components/Steps'
import { withAuthSync } from 'utils/auth'
import styles from './index.module.scss'

const CreateTaskPage = (props) => {
  return (
    <>
      <Header {...props}/>
      <div className={styles.container}>
        <Steps
        image='img/icons/form1.svg'
        text='01. Fill up task request'
        image_2='img/icons/form3.svg'
        text_2='02. Get offers'
        image_3='img/icons/chat2.svg'
        text_3='03. Choose a master'
        />
        <Footer/>
      </div>

    </>
  )
}

export default withAuthSync(CreateTaskPage)
