import styles from './index.module.scss'
import {useEffect} from "react";
import {IRootState} from "../../../types";
import { useSelector, useDispatch } from 'react-redux'
import { fetchFeedbacksMainPageRequest} from "../../ProfileFeedback/actions";
import ReviewMainPage from "../../ReviewMainPage";
import {useTranslation, Trans} from "i18n";
interface Props {}

export default function CommentsSection(props: Props) {
  const dispatch = useDispatch()
  const list = useSelector((state: IRootState) => state.profileFeedback.listLatest)
  const {t} = useTranslation('common')

  useEffect(() => {
    dispatch( fetchFeedbacksMainPageRequest());
  }, [])
  return (
    <div className={styles.root}>
      <div className={styles.commentBg}></div>
      <div className={styles.commentContainer}>

        <div className={styles.head}>{t('reviews')}</div>
      <div className={styles.floaters}>
        <img className={styles.icon} src="/img/icons/posComments.svg" alt=''/>
        <div className={styles.text}>
          <div>
            <div className={styles.percent}>95%</div>
            <Trans i18nKey="split.positive" className={styles.greenText}>положительных<br/>отзывов</Trans>
          </div>
          <div>
            <div className={styles.normText}>374 189 отзывов оставили клиенты за последние 12 месяцев. Из них 354 608 - положительные</div>
          </div>
        </div>
      </div>
        {list.map(feedback =>  <ReviewMainPage feedback={feedback}/>)}
      </div>
      <div className={styles.orderingContainer}>

      </div>
    </div>
  )
}
