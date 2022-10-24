import styles from './index.module.scss'
import { FieldConfig, useField, useFormikContext } from 'formik'
import cx from 'classnames'

import TextareaAutosize from 'react-textarea-autosize'
import React from 'react'
import FieldError from 'components/ui/FieldError'
import Label from 'components/fields/Label'
import {LabelStyleType} from 'types/types'
import MessageSendSvg from "components/svg/MessageSendSvg";

interface Props {
  label?: string
  placeholder?: string
  disabled?: boolean
  labelType?: LabelStyleType
  onSubmit: () => void
}

export default function MessageField(props: Props & FieldConfig) {
  const { label, placeholder, labelType } = props
  const [field, meta, helpers] = useField(props)
  const { setFieldValue } = useFormikContext()
  const hasError = !!meta.error && meta.touched
  const handleChange = (e) => {
    console.log("handleChange", e.currentTarget.value)
    helpers.setValue(e.currentTarget.value)
  }
  return (
    <div className={cx(styles.root, { [styles.hasError]: !!meta.error && meta.touched })}>
         <TextareaAutosize
          value={field.value}
          onChange={handleChange}
          minRows={1}
          maxRows={4}
          disabled={props.disabled}
          placeholder={placeholder}
          className={cx(styles.textarea, { [styles.error]: hasError })}
        />
      <div className={styles.button} onClick={props.onSubmit}><MessageSendSvg/></div>
    </div>
  )
}
