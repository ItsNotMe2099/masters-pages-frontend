import Link from 'next/link'
import styles from './index.module.scss'
import ChevronMoreSvg from 'components/svg/ChevronMoreSvg'
import Card from './Card'
import { useResize } from 'components/hooks/useResize'

interface Props {

}

export default function Explore(props: Props) {

  const cards = [
    { title: 'Calendar', text: 'Instantly connect with fellow volunteers and coordinators...' },
    { title: 'Personal profile', text: 'Instantly connect with fellow volunteers and coordinators...' },
    { title: 'Reviews', text: 'Instantly connect with fellow volunteers and coordinators...' },
    { title: 'Time tracking', text: 'Instantly connect with fellow volunteers and coordinators...' },
    { title: 'Listing', text: 'Instantly connect with fellow volunteers and coordinators...' },
    { title: 'Reports', text: 'Instantly connect with fellow volunteers and coordinators...' },
  ]

  const { isSmDesktopWidth } = useResize()

  return (
    <div className={styles.root} id='capabilities'>
      <div className={styles.left}>
        <div className={styles.title}>
          Explore the full range of{!isSmDesktopWidth && <br />} capabilities on our platform.
        </div>
        <div className={styles.text}>
          <div>From seamless collaboration and efficient project management
            to in-<br />depth analytics and valuable networking opportunities,
            our platform<br /> opens doors to a world of potential.</div>
          <div>As you navigate through its various functions,
            you'll find a wealth of<br /> options for enhancing your productivity,
            expanding your knowledge,<br /> and achieving your goals.</div>
        </div>
        <Link href={'#'}>
          <a className={styles.btn}>
            <div className={styles.more}>Create FREE volunteer profile</div>
            <ChevronMoreSvg color='#6D718C' />
          </a>
        </Link>
      </div>
      <div className={styles.right}>
        <div className={styles.column}>
          {cards.slice(0, 3).map((i, index) =>
            <Card text={i.text} title={i.title} key={index} />
          )}
        </div>
        <div className={styles.column}>
          {cards.slice(3).map((i, index) =>
            <Card text={i.text} title={i.title} key={index} />
          )}
        </div>
      </div>
    </div>
  )
}
