import styles from './index.module.scss'

import {ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import LanguageListItem from 'components/PublicProfile/components/view/CardLanguages/components/LanguageListItem'

interface Props{
  profile: ProfileData
}
const CardLanguages = (props: Props) => {
  const { profile } = props;
  const langs = [
    {name: 'English', code: 'EN'},
    {name: 'Russian', code: 'RU'},
    {name: 'Italian', code: 'IT'}
  ]
  return (
    <Card className={styles.root} title={'Languages'}>
      {langs.map(item => <LanguageListItem name={item.name} code={item.code}/>)}
    </Card>
  )
}

export default CardLanguages
