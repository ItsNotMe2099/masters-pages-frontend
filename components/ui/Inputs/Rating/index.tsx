import StarRating from 'components/svg/StarRating'
import { useState } from 'react'
import styles from './index.module.scss'


interface Props {

}

export default function Rating(props: Props) {

  const [value, setValue] = useState(1)

  return (
    <form className={styles.rating}>
  <label onClick={() => setValue(1)}>
    <input type="radio" name="stars" value="1" />
    <div className={value === 1 ? styles.checked : null}><StarRating/></div>
  </label>
  <label onClick={() => setValue(2)}>
    <input type="radio" name="stars" value="2" />
    <div className={value === 2 ? styles.checked : null}><StarRating/>
    <StarRating/></div>
  </label>
  <label onClick={() => setValue(3)}>
    <input type="radio" name="stars" value="3" />
    <div className={value === 3 ? styles.checked : null}><StarRating/>
    <StarRating/>
    <StarRating/></div>
  </label>
  <label onClick={() => setValue(4)}>
    <input type="radio" name="stars" value="4" />
    <div className={value === 4 ? styles.checked : null}><StarRating/>
    <StarRating/>
    <StarRating/>
    <StarRating/></div>
  </label>
  <label onClick={() => setValue(5)}>
    <input type="radio" name="stars" value="5" />
    <div className={value === 5 ? styles.checked : null}><StarRating/>
    <StarRating/>
    <StarRating/>
    <StarRating/>
    <StarRating/></div>
  </label>
</form>
  )
}
