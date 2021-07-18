import SliderControl from "components/ui/SliderControl";
import React, { Component } from "react";
import Slider from "react-slick";
import Step from "components/Steps";
import styles from './index.module.scss'
import {useTranslation, Trans} from "react-i18next";

export default class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 0,
      variableWidth: false,
      adaptiveHeight: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            variableWidth: false,
            nextArrow: <SliderControl taskPage direction='next'/>,
            prevArrow: <SliderControl taskPage direction='prev' />,
            dots: true,
            dotsClass: `${styles.dots}`
          }
        },
        {
          breakpoint: 667,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    const {t} = useTranslation('common')
    return (
      <div className={styles.root}>
        <img className={styles.waveLeft} src={'/img/icons/wave1.svg'} alt=''/>
        <img className={styles.waveRight} src='/img/icons/wave2.svg' alt=''/>
        <div className={styles.sliderContainer}>
          <Slider {...settings}>
          <div className={styles.slide}>
            <Step
            image='/img/icons/form1.svg'
            text={t('steps.completeProfile')}
            />
          </div>
          <div className={styles.slide}>
            <Step
            image='/img/icons/form3.svg'
            text={t('steps.findATask')}
            />
          </div>
          <div className={styles.slide}>
            <Step
            image='/img/icons/file.svg'
            text={t('steps.doTask')}
            />
          </div>
          </Slider>
        </div>
      </div>
    )
  }
}