import StepArrowSvg from 'components/svg/StepArrowSvg'
import Item from '../HowToJoin/Item'
import SmartPhone from '../HowToJoin/SmartPhone'
import Wrapper from '../HowToJoin/Wrapper'
import styles from './index.module.scss'
import { useResize } from 'components/hooks/useResize'
import SliderPhone from '../HowToJoin/Slider'
import ArrowDownSvg from 'components/svg/ArrowDownSvg'

interface Props {

}

export default function HowToUse(props: Props) {

  const { isTabletWidth, isLPhoneWidth } = useResize()

  const slides1 = [
    {
      image: '/img/New Page/days-slide.png', label: <>Log your hours in "Events" section<br />
        Use "+" to create new Event</>
    },
    { image: '/img/New Page/create-event-slide.png', label: 'Enter Event details' },
    {
      image: '/img/New Page/edit-event-slide.png', label: <>Once the event is finished:<br />
        (4) Use “Edit” to adjust actual<br /> timing<br />
        (5) Use complete to finish Event</>
    },
  ]

  const slides2 = [
    {
      image: '/img/New Page/messages-slide.png', label: <>Go to “Messages”. Select an individual<br /> or a group</>
    },
    { image: '/img/New Page/chat-slide.png', label: 'Type your message' },
  ]

  const slides3 = [
    {
      image: '/img/New Page/post-slide.png', label: <>Post your photos of the project and<br /> check out projects posts</>
    },
    { image: '/img/New Page/create-post-slide.png', label: <>To make a post select<br /> photo from your photo<br /> roll</> },
    { image: '/img/New Page/comment-post-slide.png', label: <>Post comments or<br /> likes</> },
  ]

  return (
    <Wrapper iconClass={styles.icon} className={styles.root} color='#E3E6F0' id={'howtouse'}>
      <div className={styles.title}>
        HOW TO USE
      </div>
      <div className={styles.content}>
        <Item number={1} title='Open your project'>
          <div className={styles.first}>
            <SmartPhone image='/img/New Page/phone9.png'
              text={<>Find your project in corresponding folder of the "My Projects"<br />
                menu</>} />
          </div>
        </Item>
        {isLPhoneWidth && <ArrowDownSvg />}
        <Item className={styles.two} number={2} title='Log your hours'>
          {!isTabletWidth ? <div className={styles.second}>
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
          </div> :
            <SliderPhone items={slides1} />
          }
        </Item>
        {isLPhoneWidth && <ArrowDownSvg />}
        <Item className={styles.three} number={3} title='Communicate'>
          {!isTabletWidth ? <div className={styles.third}>
            <SmartPhone image='/img/New Page/phone13.png'
              text={<>Go to “Messages”.<br /> Select an individual or a<br /> group</>} />
            <div className={styles.arrow}><StepArrowSvg color='#6D718C' /></div>
            <SmartPhone image='/img/New Page/phone14.png'
              text={'Type your message'} />
          </div> :
            <SliderPhone items={slides2} />
          }
        </Item>
        {isLPhoneWidth && <ArrowDownSvg />}
        <Item className={styles.two} number={4} title='Post your photos'>
          {!isTabletWidth ? <div className={styles.second}>
            <SmartPhone image='/img/New Page/phone15.png'
              text={<>Post your photos of the<br /> project and check out<br /> projects posts</>} />
            <div className={styles.arrow}><StepArrowSvg color='#6D718C' /></div>
            <SmartPhone image='/img/New Page/phone16.png'
              text={<>To make a post select<br /> photo from your photo<br /> roll</>} />
            <div className={styles.arrow}><StepArrowSvg color='#6D718C' /></div>
            <SmartPhone image='/img/New Page/phone17.png'
              text={<>Post comments or<br /> likes</>} />
          </div> :
            <SliderPhone items={slides3} />
          }
        </Item>
        {isLPhoneWidth && <ArrowDownSvg />}
        <Item className={styles.two} number={5} title={<>Complete your{isLPhoneWidth && <br />} engagement</>}>
          <div className={styles.fifth}>
            <SmartPhone image='/img/New Page/phone18.png'
              text={<>To get your feedback press "Complete"<br /> button once you finish your project<br /> participation</>} />
          </div>
        </Item>
      </div>
    </Wrapper>
  )
}
