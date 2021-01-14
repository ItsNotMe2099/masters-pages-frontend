import styles from './index.module.scss'

interface Props {
  direction: 'next' | 'prev'
  onClick?: (e: React.MouseEvent) => void
  mainPage?: boolean
  taskPage?: boolean,
  arrowClassName?: string
  className?: string
}

export default function SliderControl(props: Props) {
  return (
    <div onClick={props.onClick} className={`${props.mainPage && styles.root} ${props.taskPage && styles.rootTask} 
    ${props.mainPage ? (props.direction === 'next' ? styles.next : styles.prev) : props.direction === 'next' ? styles.nextTask : styles.prevTask} ${props.className} ${props.arrowClassName}`}>
      {props.direction === 'next' && (
        <>
        {props.mainPage ?
        <img src="/img/slider-control/next.svg" alt="next" />
        :
        <img src="/img/slider-control/nextTask.svg" alt="next" />}
        </>
      )}
      {props.direction === 'prev' && (
        <>
        {props.mainPage ?
        <img src="/img/slider-control/prev.svg" alt="prev" />
        :
        <img src="/img/slider-control/prevTask.svg" alt="prev" />}
        </>
      )}
    </div>
  )
}
