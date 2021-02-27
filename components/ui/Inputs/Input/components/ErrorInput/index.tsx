import styles from './index.module.scss'
import {withTranslation} from "react-i18next";
import SignIn from "../../../../../Auth/SignIn/Form";

interface Props {
  meta?: {
    error: any,
    touched: boolean,
  },
  t?: (string) => string,
}

const ErrorInput = (props: Props) => {
  const {t} = props;
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}
  if(touched && error) {
    return (<div className={styles.root}>{t(`validation.${error}`)}</div>)
  }else{
    return (<></>)
  }
}
export default withTranslation('common')(ErrorInput)
