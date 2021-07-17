import Step from "components/Steps";
import SliderControl from "components/ui/SliderControl";
import React, { Component } from "react";
import Slider from "react-slick";
import styles from './index.module.scss'
import {useTranslation} from "react-i18next";

const SimpleSlider = () => {
  const {t} = useTranslation();
  const settings = {
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
        breakpoint: 600,
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
    return (
      <div className={styles.root}>
        <img className={styles.waveLeft} src={'/img/icons/waveArrow.svg'} alt=''/>
        <img className={styles.waveRight} src='/img/icons/waveArrow2.svg' alt=''/>
        <div className={styles.slides}>
          <div className={styles.slide}>
            <Step
              image='/img/icons/form1.svg'
              text={`01. ${t('createTask.stepFillUpTaskRequest')}`}
            />
          </div>
          <div className={styles.slide}>
            <Step
              image='/img/icons/form3.svg'
              text={`02. ${t('createTask.stepGetOffers')}`}
            />
          </div>
          <div className={styles.slide}>
            <Step
              image='/img/icons/chat2.svg'
              text={`03. ${t('createTask.stepChooseMaster')}`}
            />
          </div>
        </div>
        <div className={styles.slides__mobile}>
          <Slider {...settings}>
          <div className={styles.slide}>
            <Step
              image='/img/icons/form1.svg'
              text={`01. ${t('createTask.stepFillUpTaskRequest')}`}
            />
          </div>
          <div className={styles.slide}>
            <Step
              image='/img/icons/form3.svg'
              text={`02. ${t('createTask.stepGetOffers')}`}
            />
          </div>
          <div className={styles.slide}>
            <Step
              image='/img/icons/chat2.svg'
              text={`03. ${t('createTask.stepChooseMaster')}`}
            />
          </div>
          </Slider>
        </div>
      </div>
    )
}
export default SimpleSlider;
