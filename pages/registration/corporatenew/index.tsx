import styles from 'pages/registration/corporatenew/index.module.scss'
import {getAuthServerSide} from 'utils/auth'
import {IUser} from 'data/intefaces/IUser'
import RegForm from './Form'


interface Props {
  user: IUser
}

const CorporateNew = (props: Props) => {

  const handleSubmit = () => {

  }

  return (
    <div className={styles.body}>
      <div className={styles.root}>
        <div className={styles.title}>
          Organization account application
        </div>
        <RegForm onSubmit={handleSubmit}/>
      </div>
    </div>
  )
}

export const getServerSideProps = getAuthServerSide({redirect: false})

export default CorporateNew
