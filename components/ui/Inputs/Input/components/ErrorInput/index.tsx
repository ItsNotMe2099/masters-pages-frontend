import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'

interface Props {
  meta?: {
    error: any,
    touched: boolean,
  },
}

const ErrorInput = (props: Props) => {

  const {t} = useTranslation()
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}
  if(touched && error) {
    return (<div className={styles.root}>{t(`validation.${error}`)}</div>)
  }else{
    return (<></>)
  }
}
export default ErrorInput
