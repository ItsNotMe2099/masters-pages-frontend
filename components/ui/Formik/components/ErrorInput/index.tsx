import styles from './index.module.scss'

interface Props {
  error?: any,
  touched?: boolean,
}

export default function ErrorInput(props: Props) {
  const { error, touched } = props;
  if(touched && error) {
    return (<div className={styles.root}>{error}</div>)
  }else{
    return (<></>)
  }
}
