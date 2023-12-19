import styles from './index.module.scss'
import Item from './Item'

interface Props {

}

export default function CaseStudies(props: Props) {

  const items = [
    {
      image: '/img/New Page/photos1.png', title: 'Reviving Urban Spaces: A Garden Cleaning Initiative',
      text: <><p>In this compelling case study, we delve into the remarkable<br /> transformation brought about by dedicated volunteers in their<br /> mission to rejuvenate an abandoned urban garden.</p>
        <p>Through meticulous garden cleaning efforts, the once-neglected<br /> space has been revitalized, evolving into a vibrant and inviting<br /> community hub.</p>
        <p>Witness how this project not only rekindled the garden's beauty but<br /> also significantly enhanced the well-being and sense of togetherness<br /> among local residents.</p></>,
      volunteers: '45', hours: '1 723', events: '6'
    },
    {
      image: '/img/New Page/photos2.png', title: 'Nourishing Hearts: Food Sharing for the Homeless',
      text: <><p>Discover the impactful volunteer project that addresses hunger and provides emotional support to homeless individuals through food sharing.</p>
        <p>This heartwarming initiative not only feeds the hungry but also kindles hope and human connection within the homeless community.</p></>,
      volunteers: '23', hours: '376', events: '12'
    },
    {
      image: '/img/New Page/photos3.png', title: 'Caring for the Voiceless: Assisting Homeless Animals',
      text: <><p>Explore the compassionate volunteer project dedicated to aiding homeless animals in need.</p>
        <p>This initiative is a testament to the power of volunteer-driven efforts in providing shelter, nourishment, and care for our four-legged friends who have no place to call home.</p></>,
      volunteers: '87', hours: '34 283', events: '42'
    },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.title}>Case studies 🤗</div>
      <div className={styles.content}>
        {items.map((i, index) =>
          <Item item={i} key={index} reverse={index === 1} />
        )}
      </div>
    </div>
  )
}
