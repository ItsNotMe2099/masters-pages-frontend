import Image from 'next/image'
import styles from './index.module.scss'
import { ReactElement } from 'react'
import VolunteerSvg from 'components/svg/VolunteerSvg'
import TimerSvg from 'components/svg/TimerSvg'
import CalendarSvg from 'components/svg/CalendarSvg'
import Link from 'next/link'
import ChevronMoreSvg from 'components/svg/ChevronMoreSvg'
import classNames from 'classnames'

interface IItem {
  image: string
  title: string
  text: string | ReactElement
  volunteers: string
  events: string
  hours: string
}

interface Props {
  item: IItem
  reverse?: boolean
}

export default function Item({ item, reverse }: Props) {

  return (
    <div className={classNames(styles.root, { [styles.reverse]: reverse })}>
      <Image src={item.image} alt='' layout='fill' />
      <div className={styles.right}>
        <div className={styles.title}>
          {item.title}
        </div>
        <div className={styles.text}>
          {item.text}
        </div>
        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.top}>
              <VolunteerSvg color='#6D718C' />
              <div className={styles.label}>
                Volunteers
              </div>
            </div>
            <div className={styles.bottom}>
              {item.volunteers}
            </div>
          </div>
          <div className={styles.separator} />
          <div className={styles.item}>
            <div className={styles.top}>
              <TimerSvg color='#6D718C' />
              <div className={styles.label}>
                Hours
              </div>
            </div>
            <div className={styles.bottom}>
              {item.hours}
            </div>
          </div>
          <div className={styles.separator} />
          <div className={styles.item}>
            <div className={styles.top}>
              <CalendarSvg color='#6D718C' />
              <div className={styles.label}>
                Events
              </div>
            </div>
            <div className={styles.bottom}>
              {item.events}
            </div>
          </div>
        </div>
        <Link href={'#'}>
          <a className={styles.btn}>
            <div className={styles.more}>Create FREE volunteer profile</div>
            <ChevronMoreSvg color='#6D718C' />
          </a>
        </Link>
      </div>
    </div>
  )
}
