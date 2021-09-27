import styles from './index.module.scss'
import MainSliderArrowLeft from 'pages/old//MainPage/components/MainSliderArrowLeft'
import MainSliderArrowRight from 'pages/old//MainPage/components/MainSliderArrowRight'

interface Props {
  direction: 'next' | 'prev'
  onClick?: (e: React.MouseEvent) => void
  white?: boolean

  arrowClassName?: string
  className?: string
}

export default function MainSliderControl(props: Props) {
  return (
    <div onClick={props.onClick} className={`${styles.root} ${props.white && styles.white}  ${props.className} ${props.arrowClassName} ${props.direction === 'next' ? styles.next : styles.prev}`}>
      {props.direction === 'next' &&  <MainSliderArrowRight/>}
      {props.direction === 'prev' &&  <MainSliderArrowLeft/>}
    </div>
  )
}
