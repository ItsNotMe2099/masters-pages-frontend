import { useRouter } from 'next/router'
import styles from './index.module.scss'
import classNames from 'classnames'
import Link from 'next/link'

interface Props {
  className?: string
}

export default function Header(props: Props) {

  const items = [
    { label: 'Benefits', link: '#benefits' },
    { label: 'Capabilities', link: '#capabilities' },
    { label: 'Case Studies', link: '#casestudies' },
    { label: 'How to Join', link: '#howtojoin' },
    { label: 'How to Use', link: '#howtouse' },
  ]

  const router = useRouter()

  console.log('ROUTER A', router)

  return (
    <div className={classNames(styles.root, props.className)}>
      {items.map((i, index) =>
        <Link href={i.link} key={index}>
          <a className={classNames(styles.item, { [styles.active]: router.asPath.includes(i.link) })}>{i.label}</a>
        </Link>
      )}
    </div>
  )
}
