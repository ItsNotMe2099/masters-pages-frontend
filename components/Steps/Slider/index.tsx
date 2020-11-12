import React, { Component } from "react";
import Slider from "react-slick";
import Step from "..";
import styles from './index.module.scss'

export default class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      variableWidth: true,
      adaptiveHeight: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            variableWidth: false,
            adaptiveHeight: true
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
        <div className={styles.sliderContainer}>
          <Slider {...settings}>
          <div className={styles.slide}>
            <Step
            image='img/icons/form1.svg'
            text='01. Fill up task request'
            />
          </div>
          <div className={styles.slide}>
            <img className={styles.wave} src={'img/icons/wave1.svg'} alt=''/>
          </div>
          <div className={styles.slide}>
            <Step 
            image='img/icons/form3.svg'
            text='02. Get offers'
            />
          </div>
          <div className={styles.slide}>
            <img className={styles.wave} src='img/icons/wave2.svg' alt=''/>
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
