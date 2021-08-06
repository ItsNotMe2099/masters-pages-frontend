import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import styles from './index.module.scss'

interface Props {
  meta: any,
  placeholder?: string
  input
  label
  labelType?: string
  className?:string
  onKeyDown?: (e) => void
}

export default function TextArea(props: Props) {
  const { error, touched } = props.meta
  const { input, label } = props
  return (
    <div className={`${styles.root} ${props.className}`}>
      <textarea
        className={`${styles.textarea} ${(error && touched) && styles.textareaError}`}
        placeholder={label}
        {...input}
        onKeyDown={props.onKeyDown}
      />
      <ErrorInput {...props}/>
    </div>
  )
}
