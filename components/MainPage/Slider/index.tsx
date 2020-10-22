import React, { Component } from "react";
import Slider from "react-slick";
import SliderControl from 'components/ui/SliderControl'
import Slide from "./Slide";
import styles from './index.module.scss'

export default class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SliderControl direction='next'/>,
      prevArrow: <SliderControl direction='prev' />,
      variableWidth: false,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
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
          <Slide text='5000 + tasks done' image='img/Slide/yes.svg'/>
          <Slide text='10 000+ tasks requested' image='img/Slide/files.svg'/>
          <Slide text='3000+ masters on website' image='img/Slide/plumber-man.svg'/>
          <Slide text='20 000 + reviews' image='img/Slide/review.svg'/>
          <Slide text='21 000 + reviews' image='img/Slide/review.svg'/>
        </Slider>
        </div>
      </div>
    );
  }
}
