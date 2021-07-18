import React, { Component } from "react";
import Slider from "react-slick";
import styles from './index.module.scss'
import {useTranslation, withTranslation, Trans} from "i18n";

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
    const { t } = useTranslation('common');
    return (
      <div className={styles.root}>
        <div className={styles.sliderContainer}>
          <Slider {...settings}>
            <div className={styles.slide}>
              <div className={styles.slideIcon}>
              <img src='/img/icons/pay.svg'/>
              </div>
              <Trans i18nKey="instruction.slide.comfortable" className={styles.slideTitle}>Удобная и<br/> безопасная оплата</Trans>
              <Trans i18nKey="instruction.slide.withoutRisk" className={styles.slideDesc}>При оплате через <span>Сделку без риска YouDo</span><br/>вернет деньги,
                если что-то пойдет не так
              </Trans>
            </div>
            <div className={styles.slide}>
              <div className={styles.slideIcon}>
                <img src='/img/icons/man.svg' />
              </div>
              <Trans i18nKey="instruction.slide.reliable" className={styles.slideTitle}>Надежные<br/> исполнители</Trans>
              <Trans i18nKey="instruction.slide.trusted" className={styles.slideDesc}><span>Проверенные исполнители</span><br/>подтвердили свои документы на
                YouDo
              </Trans>
            </div>
            <div className={styles.slide}>
              <div className={styles.slideIcon}>
                <img src='/img/icons/review.svg'/>
              </div>
              <Trans i18nKey="instruction.slide.trustedReviews" className={styles.slideTitle}>Достоверные<br/> отзывы</Trans>
              <Trans i18nKey="instruction.slide.help" className={styles.slideDesc}>Более <span>1 000 000 отзывов от заказчиков</span><br/>помогут выбрать
                подходящего<br/>исполнителя
              </Trans>
            </div>
            <div className={styles.slide}>
              <div className={styles.slideIcon}>
              <img src='/img/icons/smartphone.svg' />
              </div>
              <Trans i18nKey="instruction.slide.business" className={styles.slideTitle}>Wedo4you для<br/> бизнеса</Trans>
              <Trans i18nKey="instruction.slide.pay" className={styles.slideDesc}>Безналичная оплата <span>бизнес-заданий</span><br/>с предоставлением
                закрывающих<br/>документов
              </Trans>
            </div>
          </Slider>
        </div>
      </div>
    )
  }
}
