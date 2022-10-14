import StarRating from 'components/svg/StarRating'
import StarRatingStroke from 'components/svg/StarRatingStroke'
import styles from './index.module.scss'
import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'
import {IField} from "types/types";
import {useField} from "formik";
import FieldError from "components/ui/FieldError";
import Label from "components/fields/Label";
import React from "react";


interface Props {
  mark: number
}

export default function RatingStars(props: Props) {
  const mark = props.mark
  return (
    <div className={styles.root}>
     <div className={styles.stars}>
      <div className={styles.star}>{mark >= 1 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div className={styles.star}>{mark >= 2 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div className={styles.star}>{mark >= 3 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div className={styles.star}>{mark >= 4 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div className={styles.star}>{mark>= 5 ? <StarRating/> : <StarRatingStroke/>}</div>
    </div>
      </div>
  )
}
