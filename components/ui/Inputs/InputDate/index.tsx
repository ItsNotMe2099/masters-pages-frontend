import styles from "./index.module.scss";
import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import {format} from 'date-fns'
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
  <label className={styles.label}>{props.label}</label>

      <DatePicker
        className={styles.datePicker}
        onChange={(value) => {
          console.log("HandleDateChange", format(value, 'y-MM-dd'));
          onChange(format(value, 'y-MM-dd'));
        }}
        format={'dd.MM.y'}
        value={value ? new Date(value) : value}
      />
      <ErrorInput {...props} />
    </div>
  )
}
