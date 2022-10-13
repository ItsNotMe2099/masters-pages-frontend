import styles from './index.module.scss'
import { FieldConfig, useField, useFormikContext } from 'formik'
import React from 'react'
import Switch from "components/ui/Switch";

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
          />
    </div>
  )
}
