import styles from './index.module.scss'
import {useTranslation} from "i18n"
import { getAuthServerSide } from 'utils/auth';
import Welcome from 'components/for_pages/Corporate/Welcome';
import CorporateAccountForm from 'components/for_pages/Corporate/Form';


interface Props {
  
}

const Corporate = (props: Props) => {

return (
  <body className={styles.body}>
    <div className={styles.root}>
      <div className={styles.title}>
        Corporate account application
      </div>
      <div className={styles.content}>
        <CorporateAccountForm/>
        <Welcome/>
      </div>
    </div>
  </body>
  )
}

//export const getServerSideProps = getAuthServerSide({redirect: true});

export default Corporate
