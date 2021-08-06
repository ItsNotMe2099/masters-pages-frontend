import styles from "./index.module.scss";
import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
interface Props {
  label: string
  meta: any
  input: any
  type: string
}

export default function InputDate(props: Props) {
  const {input: {value, onChange}} = props;
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}

  return (
    <div className={styles.root}>
      <DatePicker
        onChange={onChange}
        value={value}
      />
      <ErrorInput {...props} />
    </div>
  )
}
