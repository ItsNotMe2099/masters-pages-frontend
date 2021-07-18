import styles from './index.module.scss'
import {useTranslation, withTranslation} from "i18n";
import SignIn from "../../../../../Auth/SignIn/Form";

interface Props {
  meta?: {
    error: any,
    touched: boolean,
  },
}

const ErrorInput = (props: Props) => {

  const {t} = useTranslation();
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}
  if(touched && error) {
    console.log("ShowError", error)
    return (<div className={styles.root}>{t(`validation.${error}`)}</div>)
  }else{
    return (<></>)
  }
}
export default ErrorInput
