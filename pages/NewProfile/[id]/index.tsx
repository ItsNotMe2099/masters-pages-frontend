import {getAuthServerSide} from "utils/auth";
import styles from 'pages/NewProfile/[id]/index.module.scss'
import MainSectionFirst from 'pages/NewMain/components/MainSectionFirst'
import MainSectionSecond from 'pages/NewMain/components/MainSectionSecond'
import MainSectionThird from 'pages/NewMain/components/MainSectionThird'
import MainSectionHeader from 'pages/NewMain/components/Header'
import MainSectionFooter from 'pages/NewMain/components/Footer'
import Modals from 'components/layout/Modals'
import {wrapper} from 'store'
import request from 'utils/request'
import {ProfileData} from 'types'
import CardProfile from 'components/PublicProfile/components/view/CardProfile'
import CardPreferWorkIn from 'components/PublicProfile/components/view/CardPreferWorkIn'
import CardCategories from 'components/PublicProfile/components/view/CardCategories'
import CardLanguages from 'components/PublicProfile/components/view/CardLanguages'
import CardBio from 'components/PublicProfile/components/view/CardBio'
import CardRecommendations from 'components/PublicProfile/components/view/CardRecommendations'
import CardReviews from 'components/PublicProfile/components/view/CardReviews'
import CardRewards from 'components/PublicProfile/components/view/CardRewards'
import CardSalesPitch from 'components/PublicProfile/components/view/CardSalesPitch'
import CardWorkExperience from 'components/PublicProfile/components/view/CardWorkExperience'
import CardPortfolio from 'components/PublicProfile/components/view/CardPortfolio'
import CardGallery from 'components/PublicProfile/components/view/CardGallery'
import Header from 'components/layout/Header'

interface Props{
  profile: ProfileData
}
const NewMain = (props) => {
  const profile = props.profile;
  console.log("Profile", profile)
  return (
    <div className={styles.root}>
      <Header/>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <CardProfile profile={profile}/>
          <CardPreferWorkIn profile={profile}/>
          <CardCategories profile={profile}/>
          <CardLanguages profile={profile}/>
          <CardBio profile={profile}/>
          <CardRecommendations profile={profile}/>
          <CardReviews profile={profile}/>
          <CardRewards profile={profile}/>
        </div>
        <div className={styles.rightColumn}>
          <CardSalesPitch profile={profile}/>
          <CardWorkExperience profile={profile}/>
          <CardPortfolio profile={profile}/>
          <CardGallery profile={profile}/>

        </div>
      </div>
</div>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const res = await getAuthServerSide()(ctx as any);
  console.log("CTX", ctx.query);
  const data = await request({ url: `/api/profile/${ctx.query.id}`, method: 'GET' })
  console.log("PublicProfile", data);
  return {props: {...(res as any).props, profile: data.data}};
});

export default NewMain
