import styles from './index.module.scss'
import { FieldConfig, useField, useFormikContext } from 'formik'
import React from 'react'
import Switch from "components/ui/Switch"
import classNames from 'classnames'

interface Props {
  onChange?: () => void
  label?: string
  className?: string
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
    <div className={classNames(styles.root, props.className)}>
      <Switch
          onChange={(val) => handleChange(val)}
          checked={field.value}
          />
          {props.label ?
          <div className={styles.label}>
            {props.label}
          </div> : null}
    </div>
  )
}
