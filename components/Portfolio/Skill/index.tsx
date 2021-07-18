import { fetchSkillList } from "components/Skill/actions";
import Loader from "components/ui/Loader";
import SliderControl from "components/ui/SliderControl";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, SkillData, SkillListItem } from "types";
import { getMediaPath } from "utils/media";
import { getCategoryTranslation } from "utils/translations";
import styles from 'components/Portfolio/Skill/index.module.scss'
import Slider from "react-slick";
import { useSelector, useDispatch } from 'react-redux'
import {useTranslation, Trans} from 'i18n'
interface Props {
  item: SkillData,
  onEdit: (SkillData) => void
  onRemove: (SkillData) => void
  allowEdit?: boolean
}
const Skill = ({allowEdit, item, onEdit, onRemove}: Props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: true,
    arrows: true,
    nextArrow: <SliderControl taskPage direction='next' arrowClassName={styles.sliderArrow}/>,
    prevArrow: <SliderControl taskPage direction='prev' arrowClassName={styles.sliderArrow}/>,
    dotsClass: `${styles.dots}`,
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
  const {t} = useTranslation('common');
  return (
    <div className={styles.root}>
      {allowEdit && <div className={styles.editButton} onClick={() => onEdit(item)}>
        <img src={'/img/icons/pencil.svg'}/>
      </div>}
      {allowEdit && <div className={styles.removeButton} onClick={() => onRemove(item)}>
        <img src={'/img/icons/delete.svg'}/>
      </div>}
      <div className={`${styles.slider} ${item.photos.length === 0 && styles.sliderEmpty}`}>
        {item.photos.length === 0 &&
        <img src={'/img/icons/no-image.svg'}/>}
        {item.photos.length === 0 &&
        <span>{t('portfolio.skill.firstImage')}</span>}
        {item.photos.length > 0 &&  <Slider {...settings}>
          {item.photos.map(photo => <div className={styles.slide}><img src={getMediaPath(photo)}/></div>)}
        </Slider>}
      </div>
      <div className={styles.title}> {getCategoryTranslation(item.subCategory)?.name}</div>
      <div className={styles.description}> {item.description || t('portfolio.skill.emptyDescription')}</div>
      <div className={styles.priceLabel}>{t('.taskSearch.filter.fieldPrice')}:</div>
      <div className={styles.price}>{item.price ? `$${item.price}` : item.ratePerHour ? `$${item.ratePerHour}/hour`: 'N/A'}</div>
    </div>
  )
}

export default Skill
