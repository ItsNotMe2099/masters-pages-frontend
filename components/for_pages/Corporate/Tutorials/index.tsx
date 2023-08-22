import styles from 'components/for_pages/Corporate/Tutorials/index.module.scss'
import { useTranslation } from 'next-i18next'
import Video from '../MainSectionFourth/Video'

const Tutorials = (props) => {

  const { t } = useTranslation('common')

  const videos = [
    { url: 'https://youtu.be/IFjXzakAMAw', title: 'Masterspages 7-Step Approach to Volunteering Project Management' },
    { url: 'https://youtu.be/O3i3XX6Fj-A', title: 'Masterspages organization services for volunteering projects' },
    { url: 'https://youtu.be/u-l81xVyHZU', title: 'Masterspages Mobile Apps' },
    { url: 'https://www.youtube.com/watch?v=FMa-WUJKw0k', title: 'How to set up an organization’s profile' },
    { url: 'https://www.youtube.com/watch?v=bF1GaeD4JZo&t=4s', title: 'How to launch a volunteering project ad' },
    { url: 'https://youtu.be/AkSc50UjtyE', title: 'How to manage volunteers' },
    { url: 'https://www.youtube.com/watch?v=jt7ehRqFj3I', title: 'How to manage a volunteering project' },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>
          ABOUT VIDEOS
        </div>
        <div className={styles.videos}>
          {videos.map(i =>
            <Video className={styles.video} url={i.url} title={i.title} style='altIcon' />
          )}
        </div>
      </div>
    </div>
  )
}
export default Tutorials
