import React, {Component, useEffect} from "react";
import Slider from "react-slick";
import SliderControl from 'components/ui/SliderControl'
import Slide from "./Slide";
import styles from './index.module.scss'
import {IRootState} from "../../../types";
import { useSelector, useDispatch } from 'react-redux'
import {fetchStatRequest} from "../../Stat/actions";
interface Props{

}
export default function SimpleSlider(props: Props) {
  const dispatch = useDispatch()
  const stat = useSelector((state: IRootState) => state.stat.stat)
  useEffect(() => {
    dispatch(fetchStatRequest());
  }, [])
    var settings = {
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
    };
    return (
      <div className={styles.root}>
        <div className={styles.sliderContainer}>
        <Slider {...settings}>
          <Slide text={`${stat?.tasksDoneCount || ''} + tasks done`} image='/img/Slide/yes.svg'/>
          <Slide text={`${stat?.tasksCount || ''} + tasks requested`} image='/img/Slide/files.svg'/>
          <Slide text={`${stat?.mastersCount || ''} + masters on website`} image='/img/Slide/plumber-man.svg'/>
          <Slide text={`${stat?.feedbacksCount || ''} + reviews`} image='/img/Slide/review.svg'/>
          <Slide text={`${stat?.tasksDonePerMonth || ''} + task done per month`} image='/img/Slide/review.svg'/>
        </Slider>
        </div>
      </div>
    );

}
