import Step from "components/Steps";
import SliderControl from "components/ui/SliderControl";
import React, { Component } from "react";
import Slider from "react-slick";
import styles from './index.module.scss'

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
    return (
      <div className={styles.root}>
        <img className={styles.waveLeft} src={'img/icons/wave1.svg'} alt=''/>
        <img className={styles.waveRight} src='img/icons/wave2.svg' alt=''/>
        <div className={styles.sliderContainer}>
          <Slider {...settings}>
          <div className={styles.slide}>
            <Step
            image='img/icons/form1.svg'
            text='01. Fill up task request'
            />
          </div>
          <div className={styles.slide}>
            <Step 
            image='img/icons/form3.svg'
            text='02. Get offers'
            />
          </div>
          <div className={styles.slide}>
            <Step
            image='img/icons/chat2.svg'
            text='03. Choose a master'
            />
          </div>
          </Slider>
        </div>
      </div>
    )
  }
}
