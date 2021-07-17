import StarRating from 'components/svg/StarRating'
import StarRatingStroke from 'components/svg/StarRatingStroke';
import { useState } from 'react'
import styles from './index.module.scss'
import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'


interface Props {
  input: any
}

export default function Rating(props: Props) {
  const { value, onChange } = props.input;

  return (
    <div className={styles.root}>
    <div className={styles.stars}>
      <div onClick={() => onChange(1)} className={styles.star}>{value >= 1 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => onChange(2)} className={styles.star}>{value >= 2 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => onChange(3)} className={styles.star}>{value >= 3 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => onChange(4)} className={styles.star}>{value >= 4 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => onChange(5)} className={styles.star}>{value >= 5 ? <StarRating/> : <StarRatingStroke/>}</div>
    </div>
      <ErrorInput {...props}/>
      </div>
  );
}
