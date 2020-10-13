import styles from './index.module.scss'
import Button from 'components/ui/Button'
import LangSwitch from 'components/ui/LangSwitch'
import Link from 'next/link'

interface Props {}

export default function Header(props: Props) {

  return (
    <header className={styles.root}>
      <Link href="/"><a><img className={styles.logo} src='img/logo.svg' alt='wedo4you'/></a></Link>
      <div className={styles.buttons}>
        <Button largeHeader>Стать мастером</Button>
        <LangSwitch/>
        <Button smallHeader><img src="img/icons/person.svg" alt=""/></Button>
      </div>
    </header>
  )
}
