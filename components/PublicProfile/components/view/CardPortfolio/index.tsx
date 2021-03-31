import styles from './index.module.scss'
import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import PortfolioListItem from 'components/PublicProfile/components/view/CardPortfolio/components/PortfolioListItem'

interface Props{
  profile: ProfileData
}
const CardPortfolio = (props: Props) => {
  const { profile } = props;
  return (
    <Card className={styles.root} title={'Portfolio'}>
      <PortfolioListItem/>
      <PortfolioListItem/>
      <PortfolioListItem/>

    </Card>
  )
}

export default CardPortfolio
