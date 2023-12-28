import * as React from 'react'
import styles from './index.module.scss'
import { useState, useEffect } from 'react'
import Dot from './Dot'
import Item from 'components/for_pages/MainUserPage/Greetings/Item'
import Slider from 'react-slick'


interface IItem {
  link: string
  color: string
  text: string
  image: string
  light: string
}

interface Props {

}

const SliderAboutUs = (props: Props) => {
  const [page, setPage] = useState<number>(1)
  const pageCount = 3
  const [item, setItem] = useState<number | null>(null)
  const [currentItem, setCurrentItem] = useState<IItem | null>(null)

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    centerMode: true,
    centerPadding: "120px",
    arrows: false,
    responsive: [
      {
        breakpoint: 646,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: false,
          centerPadding: "50px",
        }
      },
    ]
  }

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

  const handleItem = (indexItem: number) => {
    setItem(indexItem)
    setCurrentItem(null)
    setCurrentItem(items.find((i, index) => indexItem === index))
  }

  const array = Array(pageCount)

  const dots = array.fill(< Dot />)

  return (
    <div className={styles.root}>
      <Slider {...settings}>
        {items.map((i, index) =>
          <Item key={index} link={i.link} color={i.color} text={i.text} image={i.image} light={i.light} />
        )}
      </Slider>
    </div>
  )
}

export default SliderAboutUs
