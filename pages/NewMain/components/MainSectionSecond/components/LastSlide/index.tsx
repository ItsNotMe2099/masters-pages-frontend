import styles from './index.module.scss'
import MainSectionButton from 'pages/NewMain/components/Button'
import { useSelector, useDispatch } from 'react-redux'
import {signUpOpen} from 'components/Modal/actions'
interface Props{

}

const LastSlide = (props: Props) => {
  const dispatch = useDispatch()
  return (
    <div className={styles.root}>

      <div className={styles.container}>
        <div className={styles.title}><span className={styles.titleFirst}>Wow</span> effect!!!</div>
        <div className={styles.description}>Let MastersPages help impress your customers with ease and delight of doing business with you, while
          you devote all efforts to unleashing your full creativity.
          Your vocation is one of the biggest games of your life.
          With MastersPages you will enjoy this game even more.
          MastersPages will make sure your successes are recognized and rewarded.</div>
        <div className={styles.subTitle}>TREAT YOUR BUSINESS WITH A NEW THRILL!</div>
        <MainSectionButton onClick={() => dispatch(signUpOpen())}>Free sign up</MainSectionButton>
      </div>
    </div>
  )
}
export default LastSlide
