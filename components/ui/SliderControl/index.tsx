import styles from './index.module.scss'

interface Props {
  direction: 'next' | 'prev'
  onClick?: (e: React.MouseEvent) => void
}

export default function SliderControl(props: Props) {
  return (
    <div onClick={props.onClick} className={`${styles.root} ${props.direction === 'next' ? styles.next : styles.prev}`}>
      {props.direction === 'next' && (
        <img src="/img/slider-control/next.svg" alt="next" />
      )}
      {props.direction === 'prev' && (
        <img src="/img/slider-control/prev.svg" alt="prev" />
      )}
    </div>
  )
}
