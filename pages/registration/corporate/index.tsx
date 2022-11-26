import styles from './index.module.scss'
import CorporateRegPage from "components/for_pages/CorporateRegistration";
import {getAuthServerSide} from "utils/auth";
import {useAppContext} from "context/state";
interface Props {

}

const CorporateNew = (props: Props) => {

  return (
    <CorporateRegPage/>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: false})
export default CorporateNew
