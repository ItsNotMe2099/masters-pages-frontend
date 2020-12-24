import { withTranslation } from "react-i18next";
import { withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Header from '../components/layout/Header'
import BannerSection from 'components/MainPage/BannerSection'
import Categories from 'components/Categories'
import Instruction from 'components/Instruction'
import Footer from 'components/layout/Footer'
import Split from 'components/Split'
import SimpleSlider from "components/MainPage/Slider";
import FinishingTaskModal from "components/FinishingTaskModal";
import {
  modalClose,
  signInOpen,
  signUpOpen,
  phoneConfirmOpen,
} from 'components/Modal/actions'
import { useSelector, useDispatch } from 'react-redux'

const Home = (props) => {
  const dispatch = useDispatch()
  return (
    <>
    <Header {...props}/>
    <div className={styles.container}>
      <BannerSection/>
      <SimpleSlider/>
      <Categories/>
      <Instruction/>
      <Split/>
      <Footer/>
      <FinishingTaskModal firstName="Savannah" lastName="Nguyen" money="500" job="Courier one time job!" isOpen onRequestClose={() => dispatch(modalClose())}/>
    </div>
    </>
  )
}
Home.getInitialProps = async () => ({
  namespacesRequired: ['common', 'footer'],
})
export default withAuthSync(withTranslation('registration')(Home))
