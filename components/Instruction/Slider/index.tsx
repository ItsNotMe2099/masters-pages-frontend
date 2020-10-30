import React, { Component } from "react";
import Slider from "react-slick";
import styles from './index.module.scss'

export default class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      variableWidth: false,
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
              <div className={styles.slideIcon}>
              <img src='img/icons/pay.svg'/>
              </div>
              <div className={styles.slideTitle}>Удобная и<br/> безопасная оплата</div>
              <div className={styles.slideDesc}>При орлате через <span>Сделку без риска YouDo</span><br/>вернет деньги,
                если что-то пойдет не так
              </div>
            </div>
            <div className={styles.slide}>
              <div className={styles.slideIcon}>
                <img src='img/icons/man.svg' />
              </div>
              <div className={styles.slideTitle}>Надежные<br/> исполнители</div>
              <div className={styles.slideDesc}><span>Проверенные исполнители</span><br/>подтвердили свои документы на
                YouDo
              </div>
            </div>
            <div className={styles.slide}>
              <div className={styles.slideIcon}>
                <img src='img/icons/review.svg'/>
              </div>
              <div className={styles.slideTitle}>Достоверные<br/> отзывы</div>
              <div className={styles.slideDesc}>Более <span>1 000 000 отзывов от заказчиков</span><br/>помогут выбрать
                подходящего<br/>исполнителя
              </div>
            </div>
            <div className={styles.slide}>
              <div className={styles.slideIcon}>
              <img src='img/icons/smartphone.svg' />
              </div>
              <div className={styles.slideTitle}>Wedo4you для<br/> бизнеса</div>
              <div className={styles.slideDesc}>Безналичная оплата <span>бизнес-заданий</span><br/>с предоставлением
                закрывающих<br/>документов
              </div>
            </div>
          </Slider>
        </div>
      </div>
    )
  }
}
