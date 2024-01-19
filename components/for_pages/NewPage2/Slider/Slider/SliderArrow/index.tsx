import styles from './index.module.scss'
import classNames from 'classnames'
import ChevronLeftSvg from 'components/svg/ChevronLeftSvg'
import ChevronRightSvg from 'components/svg/ChevronRightSvg'

interface Props {
  className?: string
  direction: 'prev' | 'next'
  sliderRef: any
}

export default function SliderArrow(props: Props) {
  const handleClick = () => {
    switch (props.direction) {
      case 'prev':
        props.sliderRef.current.swiper.slidePrev()
        break
      case 'next':
        props.sliderRef.current.swiper.slideNext()
        break
    }

  }
  return (
    <div className={classNames(styles.root, props.className)} onClick={handleClick}>
      {props.direction === 'prev' && <ChevronLeftSvg className={styles[props.direction]} />}
      {props.direction === 'next' && <ChevronRightSvg className={styles[props.direction]} />}
    </div>
  )
}

