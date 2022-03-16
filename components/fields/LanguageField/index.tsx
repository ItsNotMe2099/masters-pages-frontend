import { IField, InputStyleType, IOption } from 'types/types'
import { useField } from 'formik'
import SelectField from 'components/fields/SelectField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import ServiceCategoryRepository from 'data/repositories/ServiceCategoryRepository'
import {IServiceCategory} from 'data/intefaces/IServiceCategory'
import {LanguagesList} from 'data/languages'
import * as React from 'react'

interface Props<T> extends IField<T> {
  styleType?: InputStyleType
}

export default function LanguageField(props: Props<number | IServiceCategory>) {
  return (
    <SelectField  label={props.label} name={props.name}
                 options={Object.keys(LanguagesList).map(key => ({value: key, label: LanguagesList[key].name}))}
    />
  )
}
