import StarRating from 'components/svg/StarRating'
import StarRatingStroke from 'components/svg/StarRatingStroke';
import { useState } from 'react'
import styles from './index.module.scss'


interface Props {
}

export default function Rating(props: Props) {

  const [value, setValue] = useState(1)

  return (
  <label className={styles.stars}>
      <input className={styles.input} value={value}/>
      <div onClick={() => setValue(1)}><StarRating/></div>
      <div onClick={() => value === 2 ? setValue(1) : setValue(2)}>{value >= 2 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => value === 3 ? setValue(2) : setValue(3)}>{value >= 3 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => value === 4 ? setValue(3) : setValue(4)}>{value >= 4 ? <StarRating/> : <StarRatingStroke/>}</div>
      <div onClick={() => value === 5 ? setValue(4) : setValue(5)}>{value >= 5 ? <StarRating/> : <StarRatingStroke/>}</div>
  </label>
  )
}
