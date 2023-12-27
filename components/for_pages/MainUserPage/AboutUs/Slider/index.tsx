import * as React from 'react'
import styles from './index.module.scss'
import { useState, useEffect } from 'react'
import Dot from './Dot'

interface IItem {
  link: string
  color: string
  text: string
  image: string
  light: string
}

interface Props {
  items: IItem
}

const SliderAboutUs = (props: Props) => {
  const [page, setPage] = useState<number>(1)
  const pageCount = 3
  const [item, setItem] = useState<number | null>(null)
  const [currentItem, setCurrentItem] = useState<IItem | null>(null)

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
      {pageCount > 1 && <a className={styles.prev} onClick={() => page !== 1 && setPage(page - 1)}><img src='/img/Reports/Volunteers/prev.svg' alt='' /></a>}
      <>
        {pageCount > 1 && <a className={styles.next} onClick={() => pageCount !== page && setPage(page + 1)}><img src='/img/Reports/Volunteers/next.svg' alt='' /></a>}
        {pageCount > 1 &&
          <div className={styles.dots}>
            {dots.map((i, index) => <Dot index={index} page={page} onClick={() => setPage(index + 1)} />)}
          </div>}
      </>
    </div>
  )
}

export default SliderAboutUs
