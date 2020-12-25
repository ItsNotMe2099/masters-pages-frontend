import StarRating from 'components/svg/StarRating'
import StarRatingStroke from 'components/svg/StarRatingStroke';
import { useState } from 'react'
import styles from './index.module.scss'


interface Props {

}

export default function Rating(props: Props) {

  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(null)

  return (
    <>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return(
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
            {i === 0 && <StarRating/>}
            {ratingValue <= (hover || rating) ? <StarRating/> : <StarRatingStroke/>}
          </label>
        )
      })}
      </>
  )
}
