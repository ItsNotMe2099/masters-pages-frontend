import React, { useEffect} from 'react'
import Slider from 'react-slick'
import SliderControl from 'components/ui/SliderControl'
import Slide from './Slide'
import styles from './index.module.scss'
import {IRootState} from '../../../types'
import { useSelector, useDispatch } from 'react-redux'
import {fetchStatRequest} from '../../Stat/actions'
import { useTranslation } from 'next-i18next'
interface Props{

}
export default function SimpleSlider(props: Props) {
  const dispatch = useDispatch()
  const stat = useSelector((state: IRootState) => state.stat.stat)
  const {t} = useTranslation('common')
  useEffect(() => {
    dispatch(fetchStatRequest())
  }, [])
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SliderControl mainPage direction='next'/>,
      prevArrow: <SliderControl mainPage direction='prev' />,
      variableWidth: false,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            variableWidth: true,
            adaptiveHeight: true,
            dots: false
          }
        },
        {
          breakpoint: 667,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
          }
        }
      ]
    }
    return (
      <div className={styles.root}>
        <div className={styles.sliderContainer}>
        <Slider {...settings}>
          <Slide text={`${stat?.tasksDoneCount || ''} ${t('mainPage.tasksDone')}`} image='/img/Slide/yes.svg'/>
          <Slide text={`${stat?.tasksCount || ''} ${t('mainPage.tasksRequested')}`} image='/img/Slide/files.svg'/>
          <Slide text={`${stat?.mastersCount || ''} ${t('mainPage.mastersOnWebsite')}`} image='/img/Slide/plumber-man.svg'/>
          <Slide text={`${stat?.feedbacksCount || ''} + ${t('reviewsSmall')}`} image='/img/Slide/review.svg'/>
          <Slide text={`${stat?.tasksDonePerMonth || ''} ${t('mainPage.tasksPerMonth')}`} image='/img/Slide/review.svg'/>
        </Slider>
        </div>
      </div>
    )

}
