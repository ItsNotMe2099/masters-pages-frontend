import { HTMLInputTypeAttribute, MouseEventHandler } from 'react'
import { FieldConfig } from 'formik'
import {UrlObject} from 'url'

export interface IPagination<T>{
  data: T[]
  total: number
}
export interface IField<T> extends FieldConfig<T> {
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  error?: string
  labelType?: any
  size?: any
}

export interface IButton {
  type?: 'submit' | 'reset' | 'button' | undefined
  form?: string
  spinner?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler
  href?: string | UrlObject
  isExternalHref?: boolean // add target blank and no referrer
}

export interface IOption<T> {
  label: string
  value: T
}
export type InputStyleType = 'default' | 'bottomBorder'
