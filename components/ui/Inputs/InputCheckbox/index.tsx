import styles from './index.module.scss'
import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'
import Checkbox from 'react-custom-checkbox'
import classNames from 'classnames'

interface Props {
  label: string
  meta?: any
  input: any
  type?: string
  className?: string
}

export default function InputCheckbox(props: Props) {
  const {input: {value, onChange}} = props
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}

  return (
    <div className={classNames(styles.root, props.className)}>
      <Checkbox
        checked={value}
        icon={<img src={'/img/icons/checkbox-checked.svg'} style={{ width: 21 }} alt="" />}
        borderColor={(error && touched) ? '#C60D0D' : '#e6e6e6'}
        borderRadius={2}
        size={21}
        labelClassName={`${styles.label} ${(error && touched) && styles.labelError}`}
        labelStyle={{}}
        label={props.label}
        onChange={onChange}
      />
      <ErrorInput {...props} />
    </div>
  )
}
