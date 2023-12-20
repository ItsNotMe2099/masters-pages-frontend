import StepArrowSvg from 'components/svg/StepArrowSvg'
import Item from '../HowToJoin/Item'
import SmartPhone from '../HowToJoin/SmartPhone'
import Wrapper from '../HowToJoin/Wrapper'
import styles from './index.module.scss'

interface Props {

}

export default function HowToUse(props: Props) {

  return (
    <Wrapper className={styles.root} color='#E3E6F0' id={'howtouse'}>
      <div className={styles.content}>
        <Item number={1} title='Open your project'>
          <div className={styles.first}>
            <SmartPhone image='/img/New Page/phone9.png'
              text={<>Find your project in corresponding folder of the "My Projects"<br />
                menu</>} />
          </div>
        </Item>
        <Item className={styles.two} number={2} title='Log your hours'>
          <div className={styles.second}>
            <SmartPhone image='/img/New Page/phone10.png'
              text={<>Log your hours in<br /> "Events" section<br />
                Use "+" to create new<br /> Event</>} />
            <div className={styles.arrow}><StepArrowSvg color='#6D718C' /></div>
            <SmartPhone image='/img/New Page/phone11.png'
              text={'Enter Event details'} />
            <div className={styles.arrow}><StepArrowSvg color='#6D718C' /></div>
            <SmartPhone image='/img/New Page/phone12.png'
              text={<>Once the event is<br /> finished:<br />
                (4) Use “Edit” to adjust<br /> actual timing<br />
                (5) Use complete to finish<br /> Event</>} />
          </div>
        </Item>
        <Item className={styles.three} number={3} title='Communicate'>
          <div className={styles.third}>
            <SmartPhone image='/img/New Page/phone13.png'
              text={<>Go to “Messages”.<br /> Select an individual or a<br /> group</>} />
            <div className={styles.arrow}><StepArrowSvg color='#6D718C' /></div>
            <SmartPhone image='/img/New Page/phone14.png'
              text={'Type your message'} />
          </div>
        </Item>
        <Item className={styles.two} number={4} title='Post your photos'>
          <div className={styles.second}>
            <SmartPhone image='/img/New Page/phone15.png'
              text={<>Post your photos of the<br /> project and check out<br /> projects posts</>} />
            <div className={styles.arrow}><StepArrowSvg color='#6D718C' /></div>
            <SmartPhone image='/img/New Page/phone16.png'
              text={<>To make a post select<br /> photo from your photo<br /> roll</>} />
            <div className={styles.arrow}><StepArrowSvg color='#6D718C' /></div>
            <SmartPhone image='/img/New Page/phone17.png'
              text={<>Post comments or<br /> likes</>} />
          </div>
        </Item>
        <Item className={styles.two} number={5} title='Complete your engagement'>
          <div className={styles.fifth}>
            <SmartPhone image='/img/New Page/phone18.png'
              text={<>To get your feedback press "Complete"<br /> button once you finish your project<br /> participation</>} />
          </div>
        </Item>
      </div>
    </Wrapper>
  )
}
