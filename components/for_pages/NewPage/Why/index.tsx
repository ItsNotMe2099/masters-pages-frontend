import ChartSvg from 'components/svg/ChartSvg'
import styles from './index.module.scss'
import SpeakerSvg from 'components/svg/SpeakerSvg'
import PostSvg from 'components/svg/PostSvg'
import ScheduleSvg from 'components/svg/ScheduleSvg'
import Card from './Card'
import CardActive from './CardActive'

interface Props {

}

export default function Why(props: Props) {

  const cards = [
    {
      icon: <ChartSvg color='#1A9AC1' />, title: 'Live reporting',
      text: 'Experience real-time reporting with our volunteer app...'
    },
    {
      icon: <ScheduleSvg color='#1A9AC1' />, title: 'Time tracking',
      text: <div className={styles.schedule}><div className={styles.text}>Our volunteer app offers a<br /> seamless way to track your time,<br />
        ensuring your contributions are<br /> accurately recorded.</div>
        <div className={styles.text}>This feature simplifies reporting,<br /> making it easier for you to<br /> showcase your dedication and<br />
          impact.</div>
      </div>
    },
    {
      icon: <SpeakerSvg color='#1A9AC1' />, title: 'Chats and group',
      text: 'Instantly connect with fellow volunteers and coordinators...'
    },
    {
      icon: <PostSvg color='#1A9AC1' />, title: 'Posts and news',
      text: 'Showcase your achievements, passion, and the impact...'
    },
  ]

  return (
    <div className={styles.root} id='benefits'>
      <div className={styles.title}>
        Why volunteer with Masterspages 🔥
      </div>
      <div className={styles.cards}>
        <Card icon={cards[0].icon} text={cards[0].text} title={cards[0].title} />
        <CardActive icon={cards[1].icon} text={cards[1].text} title={cards[1].title} />
        {cards.slice(2).map((i, index) =>
          <Card icon={i.icon} text={i.text} title={i.title} key={index} />
        )}
      </div>
    </div>
  )
}
