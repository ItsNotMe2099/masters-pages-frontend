import styles from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ChevronMoreSvg from 'components/svg/ChevronMoreSvg'
import CheckSvg from 'components/svg/CheckSvg'


interface Props {
  color: string
  image: string
  text: string
  textClass?: string
}

export default function ItemService(props: Props) {

  const router = useRouter()

  const getFirstForText = () => {
    switch (router.asPath) {
      case '/service/self-employed':
        return 'for Masters'
      case '/service/volunteering':
        return 'for Volunteering organizations'
      case '/service/clubs':
        return 'for Clubs'
    }
  }

  const getSecondForText = () => {
    switch (router.asPath) {
      case '/service/self-employed':
        return 'for Clients'
      case '/service/volunteering':
        return 'for Volunteers'
      case '/service/clubs':
        return 'for Club members'
    }
  }

  const getList = () => {
    switch (router.asPath) {
      case '/service/self-employed':
        return [{ label: 'Orders' }, { label: 'Masters' }, { label: 'Clients' }]
      case '/service/volunteering':
        return [{ label: 'Volunteering organizations profiles' }, { label: 'Volunteers profiles' }, { label: 'Ads of volunteering projects' }]
      case '/service/clubs':
        return [{ label: 'Clubs' }, { label: 'Groups' }, { label: 'Members' }]
    }
  }

  const getColorNext = () => {
    switch (router.asPath) {
      case '/service/self-employed':
        return '#F0C131'
      case '/service/volunteering':
        return '#00CDC1'
      case '/service/clubs':
        return '#EB5757'
    }
  }

  const getColorPrev = () => {
    switch (router.asPath) {
      case '/service/self-employed':
        return '#00CDC1'
      case '/service/volunteering':
        return '#EB5757'
      case '/service/clubs':
        return '#F0C131'
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.container} style={{ backgroundColor: `${props.color}` }}>
        <div className={styles.card}>
          <div className={styles.people}><Image src={props.image} alt='' layout='fill' /></div>
          <div className={classNames(styles.text, props.textClass)}>
            {props.text}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.learn}>
            Learn about services:
          </div>
          <div className={styles.top}>
            <div className={styles.for}>
              <div className={styles.forText}>
                {getFirstForText()}
              </div>
              <Link href={''}>
                <a className={styles.btn}>
                  <div className={styles.more}>Learn more</div>
                  <ChevronMoreSvg color='#EB5757' />
                </a>
              </Link>
            </div>
            <div className={styles.separator} />
            <div className={styles.for}>
              <div className={styles.forText}>
                {getSecondForText()}
              </div>
              <Link href={''}>
                <a className={styles.btn}>
                  <div className={styles.more}>Learn more</div>
                  <ChevronMoreSvg color='#EB5757' />
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.explore}>
            Explore:
          </div>
          <div className={styles.bottom}>
            {getList().map((i, index) =>
              <div className={styles.item} key={index}>
                <CheckSvg />
                <div className={styles.label}>{i.label}</div>
              </div>
            )}
          </div>
          <div className={styles.wrapper}>
            <Link href={''}>
              <a className={styles.btnBottom}>
                <div className={styles.more}>Learn more</div>
                <ChevronMoreSvg color='#EB5757' />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.next} style={{backgroundColor: `${getColorNext()}`}} />
      <div className={styles.prev} style={{backgroundColor: `${getColorPrev()}`}} />
    </div>

  )
}
