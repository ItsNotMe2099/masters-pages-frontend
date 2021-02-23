import { withTranslation } from "react-i18next";
import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import Header from '../components/layout/Header'
import BannerSection from 'components/MainPage/BannerSection'
import Categories from 'components/Categories'
import Instruction from 'components/Instruction'
import Footer from 'components/layout/Footer'
import Split from 'components/Split'
import SimpleSlider from "components/MainPage/Slider";

const Home = (props) => {
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
    </div>
    </>
  )
}
Home.getInitialProps = async () => ({
  namespacesRequired: ['common', 'footer'],
})
export const getServerSideProps = getAuthServerSide();
export default withTranslation('registration')(Home)
