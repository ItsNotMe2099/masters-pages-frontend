import StarRating from 'components/svg/StarRating'
import StarRatingStroke from 'components/svg/StarRatingStroke'
import styles from './index.module.scss'
import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'
import {IField} from "types/types";
import {useField} from "formik";
import FieldError from "components/ui/FieldError";
import Label from "components/fields/Label";
import React from "react";


interface Props extends IField<number>{

}

export default function RatingField(props: Props) {
  const [field, meta, helpers] = useField(props)
  const showError = meta.touched && !!meta.error

  return (
    <div className={styles.root}>
     <div className={styles.stars}>
      <div onClick={() => helpers.setValue(1)} className={styles.star}>{field.value >= 1 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => helpers.setValue(2)} className={styles.star}>{field.value >= 2 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => helpers.setValue(3)} className={styles.star}>{field.value >= 3 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => helpers.setValue(4)} className={styles.star}>{field.value >= 4 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => helpers.setValue(5)} className={styles.star}>{field.value >= 5 ? <StarRating/> : <StarRatingStroke/>}</div>
    </div>
      <FieldError showError={showError}>{meta.error}</FieldError>
      </div>
  )
}
