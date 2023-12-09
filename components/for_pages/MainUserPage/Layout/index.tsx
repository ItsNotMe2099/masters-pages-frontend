import { ReactElement } from 'react'
import styles from './index.module.scss'
import MainSectionFooter from '../Footer'
import MainSectionHeader from '../Header'

interface Props {
  children?: ReactElement | ReactElement[]
}

export default function Layout(props: Props) {

  return (
    <div className={styles.root}>
      <MainSectionHeader />
        {props.children}
      <MainSectionFooter />
    </div>
  )
}
