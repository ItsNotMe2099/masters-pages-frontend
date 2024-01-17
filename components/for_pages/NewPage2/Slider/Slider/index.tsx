import * as React from 'react'
import styles from './index.module.scss'
import { Swiper as SwiperClass } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Parallax } from 'swiper/modules'
import ItemService from 'components/for_pages/MainUserPage/Greetings/ItemService'
import EffectCarousel from 'components/ui/Slider/EffectCarousel'

interface Props {

}

const SliderCards = (props: Props) => {

  const swiperRef = React.useRef<SwiperClass | null>(null)

  const items = [
    {
      color: '#EB5757',
      text: 'Self-employed and clients',
      image: '/img/MainPage/people-red.png',
    },
    {
      color: '#EEBA1A',
      text: 'Volunteering organizations and volunteers',
      image: '/img/MainPage/people-yellow.png',
    },
    {
      color: '#00CDC1',
      text: 'Clubs and club members',
      image: '/img/MainPage/people-green.png',
    }
  ]

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + '</span>';
    },
  }

  return (
    <div className={styles.root}>
      <Swiper
        effect={'carousel'}
        spaceBetween={8}
        loop
        centeredSlides
        slidesPerView={1}
        pagination={pagination}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Pagination, EffectCarousel, Parallax]}

      >
        {items.map((item, index) => (<SwiperSlide key={index} className={styles.slide} >
          <div className={'swiper-zoom-container'}>
            <ItemService index={index} color={item.color} text={item.text} image={item.image} />
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SliderCards
