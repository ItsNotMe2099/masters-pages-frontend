import { CONTACTS } from 'types'
import Item from './Item'
import SmartPhone from './SmartPhone'
import styles from './index.module.scss'
import AppStoreSvg from 'components/svg/AppStoreSvg'
import GooglePlaySvg from 'components/svg/GooglePlaySvg'
import Wrapper from './Wrapper'
import { useResize } from 'components/hooks/useResize'
import SliderPhone from './Slider'

interface Props {

}

export default function HowToJoin(props: Props) {

  const { isTabletWidth } = useResize()

  const slides1 = [
    { image: '/img/New Page/phone1-slide.png', label: 'IOS' },
    { image: '/img/New Page/phone2-slide.png', label: 'Android' },
  ]

  return (
    <Wrapper className={styles.root} color='#FFD580' id={'howtojoin'}>
      <div className={styles.title}>
        HOW TO JOIN
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <Item number={1} title='Download MastersPages APP'>
            {!isTabletWidth ?
              <div className={styles.first}>
                <SmartPhone image='/img/New Page/phone1.png' text='IOS' textClass={styles.phoneText} />
                <SmartPhone image='/img/New Page/phone2.png' text='Android' textClass={styles.phoneText} />
              </div> :
              <SliderPhone items={slides1} />
            }
            <div className={styles.download}>
              <div className={styles.now}>Download App Now:</div>
              <div className={styles.apps}>
                <a href={CONTACTS.appStore}><AppStoreSvg /></a>
                <a href={CONTACTS.googlePlay}><GooglePlaySvg /></a>
              </div>
            </div>
          </Item>
          <Item number={2} title='Setup your volunteer profile'>
            <div className={styles.first}>
              <SmartPhone image='/img/New Page/phone3.png'
                text={<>Follow individual<br /> account registration<br /> procedure</>} />
              <SmartPhone image='/img/New Page/phone4.png' text='Select "volunteer" mode' />
            </div>
          </Item>
        </div>
        <div className={styles.bottom}>
          <Item number={3} title='Find and join your project'>
            <div className={styles.second}>
              <SmartPhone image='/img/New Page/phone5.png'
                text={<>Use search bar to find<br /> your project</>} />
              <SmartPhone image='/img/New Page/phone6.png'
                text={<>Fill application to join<br /> the project</>} />
              <SmartPhone image='/img/New Page/phone7.png'
                text={<>Fill in required<br /> application fields and<br />  hit "Joint project"</>} />
            </div>
          </Item>
          <Item classTop={styles.fourthTop} number={4} title={<>Accept invitation<br /> once received</>}>
            <div className={styles.third}>
              <SmartPhone image='/img/New Page/phone8.png'
                text={<>Once your application is approved<br /> you'll get invitation to join the Project</>} />
            </div>
          </Item>
        </div>
      </div>
    </Wrapper>
  )
}
