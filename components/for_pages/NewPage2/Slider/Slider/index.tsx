import * as React from 'react'
import styles from './index.module.scss'
import { Swiper as SwiperClass } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Zoom, Pagination, EffectCards } from 'swiper/modules'
import ItemService from 'components/for_pages/MainUserPage/Greetings/ItemService'

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
        effect={'cards'}
        spaceBetween={8}
        slidesPerView={1}
        pagination={pagination}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Pagination, EffectCards]}

      >
        {items.map((item, index) => (<SwiperSlide key={index} className={styles.slide} >
          <div className={'swiper-zoom-container'}>
            <ItemService color={item.color} text={item.text} image={item.image} />
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SliderCards
