import Link from 'next/link'
import styles from './index.module.scss'
import Task from './Task'

interface Props {}

export default function OrderingSection(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        People ordering right now
      </div>
      <Link href="/">
        <a>
          <Task taskTitle='Task title' 
          taskDesc='Non cras rhoncus dignissim aliquam facilisi.' 
          taskTime='30m ago'
          taskPrice='$1000'
          priceType='Fixed price'
          taskImage='img/icons/design.svg'
          color='#A4E4B6'
          />
        </a>
      </Link>
      <Link href="/">
        <a>
          <Task taskTitle='Task title' 
          taskDesc='Non cras rhoncus dignissim aliquam facilisi.' 
          taskTime='1h ago'
          taskPrice='$10/h'
          priceType='10h a week'
          taskImage='img/icons/design.svg'
          color='#A4E4B6'
          />
        </a>
      </Link>
      <Link href="/">
        <a>
          <Task taskTitle='Task title' 
          taskDesc='Non cras rhoncus dignissim aliquam facilisi.' 
          taskTime='1h ago'
          taskPrice='$1000'
          priceType='Fixed price'
          taskImage='img/icons/design.svg'
          color='#A4E4B6'
          />
        </a>
      </Link>
      <Link href="/">
        <a>
          <Task taskTitle='Task title' 
          taskDesc='Non cras rhoncus dignissim aliquam facilisi.' 
          taskTime='1h ago'
          taskPrice='$10/h'
          priceType='10h a week'
          taskImage='img/icons/interpreter.svg'
          color='#958EFE'
          />
        </a>
      </Link>
    </div>
  )
}
