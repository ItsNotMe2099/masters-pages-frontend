import * as React from 'react'
import styles from './index.module.scss'
import Item from 'components/for_pages/MainUserPage/Greetings/Item'
import { Swiper as SwiperClass } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Zoom, Pagination } from 'swiper/modules'
import classNames from 'classnames'
import { useAppContext } from 'context/state'

interface Props {

}

const SliderGreetings = (props: Props) => {

  const appContext = useAppContext()

  const swiperRef = React.useRef<SwiperClass | null>(null)

  const items = [
    {

      link: '/self-employed',
      color: '#EB5757',
      text: 'Self-employed and clients',
      image: '/img/MainPage/people-red.png',
      light: '/img/MainPage/red.png',
    },
    {
      link: '/volunteering',
      color: '#EEBA1A',
      text: 'Volunteering organizations and volunteers',
      image: '/img/MainPage/people-yellow.png',
      light: '/img/MainPage/yellow.png'
    },
    {
      link: '/clubs',
      color: '#00CDC1',
      text: 'Clubs and club members',
      image: '/img/MainPage/people-green.png',
      light: '/img/MainPage/green.png'
    }
  ]

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + '</span>';
    },
  }

  return (
    <div className={classNames(styles.root, { [styles.none]: appContext.menuMobileOpen })}>
      <Swiper
        spaceBetween={8}
        slidesPerView={1}
        pagination={pagination}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Zoom, Pagination]}
        zoom={{
          maxRatio: 2,
          minRatio: 1

        }}

      >
        {items.map((item, index) => (<SwiperSlide key={index} className={styles.slide} >
          <div className={'swiper-zoom-container'}>
            <Item link={item.link} color={item.color} text={item.text} image={item.image} light={item.light} />
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SliderGreetings
