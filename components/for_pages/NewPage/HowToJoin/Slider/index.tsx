import * as React from 'react'
import styles from './index.module.scss'
import { Swiper as SwiperClass } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Zoom, Pagination, Navigation } from 'swiper/modules'
import Image from 'next/image'

interface IItem {
  image: string
  label: string | React.ReactElement
}

interface Props {
  items: IItem[]
}

const SliderPhone = ({ items }: Props) => {

  const swiperRef = React.useRef<SwiperClass | null>(null)

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState<number>(0)

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + '</span>'
    },
  }



  return (
    <div className={styles.root}>
      <Image src={'/img/New Page/iphone1.png'} alt='' width={206} height={418} />
      <Swiper
        spaceBetween={8}
        slidesPerView={1}
        pagination={pagination}
        navigation
        onSlideChange={(swiper) => {
          setCurrentSlideIndex(swiper.realIndex)
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Zoom, Pagination, Navigation]}
        zoom={{
          maxRatio: 2,
          minRatio: 1

        }}

      >
        {items.map((item, index) => (<SwiperSlide key={index} className={styles.slide} >
          <div className={'swiper-zoom-container'}>
            <Image className={styles.image} src={item.image} alt='' layout='fill' />
          </div>
        </SwiperSlide>
        ))}
        {items.map((item, index) => currentSlideIndex === index && <div className={styles.label}>{item.label}</div>)}
      </Swiper>
    </div>
  )
}

export default SliderPhone
