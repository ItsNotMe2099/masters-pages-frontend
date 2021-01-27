import StarRating from 'components/svg/StarRating'
import StarRatingStroke from 'components/svg/StarRatingStroke';
import { useState } from 'react'
import styles from './index.module.scss'


interface Props {
  input: any
}

export default function Rating(props: Props) {
  const { value, onChange } = props.input;

  return (
    <div className={styles.stars}>
      <div onClick={() => onChange(1)}><StarRating/></div>
      <div onClick={() => onChange(2)}>{value >= 2 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => onChange(3)}>{value >= 3 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => onChange(4)}>{value >= 4 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => onChange(5)}>{value >= 5 ? <StarRating/> : <StarRatingStroke/>}</div>
    </div>
  );
}
