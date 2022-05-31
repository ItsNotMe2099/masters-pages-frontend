import styles from './index.module.scss'
import { FieldConfig, useField, useFormikContext } from 'formik'
import cx from 'classnames'

import TextareaAutosize from 'react-textarea-autosize'
import React from 'react'
import FieldError from 'components/ui/FieldError'
import Label from 'components/fields/Label'
import {LabelStyleType} from 'types/types'

interface Props {
  label?: string
  placeholder?: string
  disabled?: boolean
  labelType?: LabelStyleType
}

export default function TextAreaField(props: Props & FieldConfig) {
  const { label, placeholder, labelType } = props
  const [field, meta] = useField(props)
  const { setFieldValue } = useFormikContext()
  const hasError = !!meta.error && meta.touched
  return (
    <div className={cx(styles.root, { [styles.hasError]: !!meta.error && meta.touched })}>
      <Label label={label} style={labelType} hasError={hasError} />
        <TextareaAutosize
          {...field}
          minRows={4}
          disabled={props.disabled}
          placeholder={placeholder}
          className={cx(styles.textarea, { [styles.error]: hasError })}
        />
      <FieldError showError={hasError}>{meta?.error}</FieldError>
    </div>
  )
}
