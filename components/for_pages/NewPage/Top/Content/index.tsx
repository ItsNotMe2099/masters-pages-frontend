import styles from './index.module.scss'
import Button from 'components/ui/Button'

interface Props {

}

export default function Content(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Unleash Your Inner Hero:<br /> Volunteer with a Purpose
      </div>
      <div className={styles.text}>
        This is a public report detailing the completion of<br /> work and achievement of project goals.
      </div>
      <Button href='#' projectBtn='red' className={styles.btn}>
        Create volunteer profile
      </Button>
    </div>
  )
}
