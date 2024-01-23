import styles from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import Link from 'next/link'
import ChevronMoreSvg from 'components/svg/ChevronMoreSvg'
import CheckSvg from 'components/svg/CheckSvg'
import { useResize } from 'components/hooks/useResize'


interface Props {
  color: string
  image: string
  text: string
  textClass?: string
  index?: number
}

export default function ItemService(props: Props) {

  const { isDesktopWidth, isTabletWidth, isPhoneWidth } = useResize()

  const getFirstForText = () => {
    switch (props.color) {
      case '#EB5757':
        return 'for Masters'
      case '#EEBA1A':
        return 'for Volunteering organizations'
      case '#00CDC1':
        return 'for Clubs'
    }
  }

  const getSecondForText = () => {
    switch (props.color) {
      case '#EB5757':
        return 'for Clients'
      case '#EEBA1A':
        return 'for Volunteers'
      case '#00CDC1':
        return 'for Club members'
    }
  }

  const getList = () => {
    switch (props.color) {
      case '#EB5757':
        return [{ label: 'Orders' }, { label: 'Masters' }, { label: 'Clients' }]
      case '#EEBA1A':
        return [{ label: isTabletWidth ? 'Organizations' : 'Volunteering organizations profiles' },
        { label: isTabletWidth ? 'Volunteers' : 'Volunteers profiles' },
        { label: isTabletWidth ? 'Ads' : 'Ads of volunteering projects' }]
      case '#00CDC1':
        return [{ label: 'Clubs' }, { label: 'Groups' }, { label: 'Members' }]
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
        {isPhoneWidth && <div className={styles.separatorMobile} />}
        <div className={styles.right}>
          <div className={styles.learn}>
            Learn about services:
          </div>
          <div className={styles.top}>
            <div className={styles.for}>
              {!isPhoneWidth && <div className={styles.forText}>
                {getFirstForText()}
              </div>}
              <Link href={props.color === '#EB5757' ? '/advertising' : props.color === '#EEBA1A' ? '/organization' : '/FindClubs'}>
                <a className={styles.btn}>
                  <div className={styles.more}>{!isPhoneWidth ? 'Learn more' : getFirstForText()}</div>
                  <ChevronMoreSvg color='#EB5757' />
                </a>
              </Link>
            </div>
            {!isPhoneWidth && <div className={styles.separator} />}
            <div className={styles.for}>
              {!isPhoneWidth && <div className={styles.forText}>
                {getSecondForText()}
              </div>}
              <Link href={props.color === '#EB5757' ? '/advertising' : props.color === '#EEBA1A' ? '/volunteers' : '/FindMembers'}>
                <a className={styles.btn}>
                  <div className={styles.more}>{!isPhoneWidth ? 'Learn more' : getSecondForText()}</div>
                  <ChevronMoreSvg color='#EB5757' />
                </a>
              </Link>
            </div>
          </div>
          {isPhoneWidth && <div className={styles.separatorMobile} />}
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
            <Link href={props.color === '#EB5757' ? '/FindMasterGuest' : props.color === '#EEBA1A' ? '/FindVolunteerGuest' : '/FindMembers'}>
              <a className={styles.btnBottom}>
                <div className={styles.more}>Learn more</div>
                <ChevronMoreSvg color='#EB5757' />
              </a>
            </Link>
          </div>
        </div>
      </div>
      {isDesktopWidth && <><div className={styles.lightLeft}><Image src={props.color === '#EB5757' ? '/img/MainPage/red.png' :
        props.color === '#EEBA1A' ? '/img/MainPage/yellow.png' : '/img/MainPage/green.png'} alt='' layout='fill' /></div>
        <div className={styles.lightRight}><Image src={props.color === '#EB5757' ? '/img/MainPage/yellow.png' :
          props.color === '#EEBA1A' ? '/img/MainPage/green.png' : '/img/MainPage/red.png'} alt='' layout='fill' /></div></>}
    </div>

  )
}
