import * as React from 'react'
import styles from './index.module.scss'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Pagination, Parallax } from 'swiper/modules'
import ItemService from 'components/for_pages/MainUserPage/Greetings/ItemService'
import { useResize } from 'components/hooks/useResize'
import EffectStackMobile from 'components/ui/Slider/EffectStackMobile'

interface Props {

}

const SliderCardsMobile = (props: Props) => {

  const swiperRef = React.useRef<SwiperRef>(null)

  const { isDesktopWidth, isPhoneWidth } = useResize()

  const items = [
    {
      color: '#EB5757',
      text: 'Self-employed and clients',
      image: isPhoneWidth ? '/img/MainPage/people-red.png' : '/img/MainPage/people-red-service.png',
    },
    {
      color: '#EEBA1A',
      text: 'Volunteering organizations and volunteers',
      image: isPhoneWidth ? '/img/MainPage/people-yellow.png' : '/img/MainPage/people-yellow-service.png',
    },
    {
      color: '#00CDC1',
      text: 'Clubs and club members',
      image: isPhoneWidth ? '/img/MainPage/people-green.png' : '/img/MainPage/people-green-service.png',
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
        effect={'stack-mobile'}
        loop
        centeredSlides
        watchSlidesProgress
        slidesPerView={1}
        pagination={!isDesktopWidth ? pagination : false}
        modules={[Pagination, EffectStackMobile, Parallax]}
        ref={swiperRef}
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

export default SliderCardsMobile
