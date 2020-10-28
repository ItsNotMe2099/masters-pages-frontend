import React, { Component } from "react";
import Slider from "react-slick";
import SliderControl from 'components/ui/SliderControl'
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
            variableWidth: true,
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
    <div className={styles.column}> 
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        <div className={styles.columnItem}>
          <img className={styles.icon__pay} src='img/icons/pay.svg' alt=''/>
          <div className={styles.text}>Удобная и<br/> безопасная оплата</div>
          <div className={styles.text__desc}>При орлате через <span>Сделку без риска YouDo</span><br/>вернет деньги, если что-то пойдет не так</div>
        </div>
        <div className={styles.columnItem}>
          <img src='img/icons/man.svg' alt=''/>
          <div className={styles.text}>Надежные<br/> исполнители</div>
          <div className={styles.text__desc}><span>Проверенные исполнители</span><br/>подтвердили свои документы на YouDo</div>
        </div>
        <div className={styles.columnItem}>
          <img className={styles.icon__pay} src='img/icons/review.svg' alt=''/>
          <div className={styles.text}>Достоверные<br/> отзывы</div>
          <div className={styles.text__desc}>Более <span>1 000 000 отзывов от заказчиков</span><br/>помогут выбрать подходящего<br/>исполнителя</div>
        </div>
        <div className={styles.columnItem}>
          <img className={styles.icon__pay} src='img/icons/smartphone.svg' alt=''/>
          <div className={styles.text}>Wedo4you для<br/> бизнеса</div>
          <div className={styles.text__desc}>Безналичная оплата <span>бизнес-заданий</span><br/>с предоставлением закрывающих<br/>документов</div>
        </div>
      </Slider>
    </div>
    </div>
  )
}
}
