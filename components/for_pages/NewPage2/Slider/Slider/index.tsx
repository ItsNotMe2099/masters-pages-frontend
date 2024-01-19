import * as React from 'react'
import styles from './index.module.scss'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Pagination, Parallax } from 'swiper/modules'
import ItemService from 'components/for_pages/MainUserPage/Greetings/ItemService'
import EffectCarousel from 'components/ui/Slider/EffectCarousel'
import SliderArrow from './SliderArrow'
import classNames from 'classnames'
import { useResize } from 'components/hooks/useResize'

interface Props {

}

const SliderCards = (props: Props) => {

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
      {isDesktopWidth && <SliderArrow direction='prev' sliderRef={swiperRef} className={classNames(styles.arrow, styles.prev)} />}
      <Swiper
        effect={'carousel'}
        spaceBetween={8}
        loop
        centeredSlides
        slidesPerView={1}
        pagination={!isDesktopWidth ? pagination : false}
        modules={[Pagination, EffectCarousel, Parallax]}
        ref={swiperRef}
      >
        {items.map((item, index) => (<SwiperSlide key={index} className={styles.slide} >
          <div className={'swiper-zoom-container'}>
            <ItemService index={index} color={item.color} text={item.text} image={item.image} />
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
      {isDesktopWidth && <SliderArrow direction='next' sliderRef={swiperRef} className={classNames(styles.arrow, styles.next)} />}
    </div>
  )
}

export default SliderCards
