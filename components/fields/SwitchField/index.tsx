import styles from './index.module.scss'
import { FieldConfig, useField, useFormikContext } from 'formik'
import React from 'react'
import Switch from 'react-switch'

interface Props {
  onChange?: () => void
}

export default function SwitchField(props: Props & FieldConfig) {
  const [field, meta] = useField(props)
  const { setFieldValue } = useFormikContext()
  const hasError = !!meta.error && meta.touched

  const handleChange = (val) => {
    props.onChange && props.onChange()
    setFieldValue(field.name, val)
  }

  return (
    <div className={styles.root}>
      <Switch
          onChange={(val) => handleChange(val)}
          checked={field.value}
          handleDiameter={26}
          uncheckedIcon={false}
          checkedIcon={false}
          height={30}
          width={51}
          offColor="#C4C4C4"
          onColor="#6EDC5F"
          offHandleColor="#fff"
          onHandleColor="#fff"
          className={styles.switch}
          />
    </div>
  )
}
