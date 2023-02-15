import { IField, InputStyleType, IOption } from 'types/types'
import { useField } from 'formik'
import SelectField from 'components/fields/SelectField'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import request from 'utils/request'
import queryString from 'query-string'

interface Props<T> extends IField<T> {
  styleType?: InputStyleType
  role?: string
}

export default function ProfileSearchField(props: Props<string>) {
  const [field, meta, helpers] = useField(props)
  const [options, setOptions] = useState<IOption<string>[]>([])
  const { t, i18n } = useTranslation('common')

  const getSearchProfile = (search = '') => {
    return request({ url: `/api/profile/search?${queryString.stringify({ limit: 100, keywords: search, masterRole: props.role === 'master' ? 'client' : 'master' })}`, method: 'GET' })
      .then((response) => {
        const data = response.data
        setOptions(data ? data?.data?.filter(i => i.slug !== null).map(item => {
          return {
            label: `${item.slug}`,
            value: item.id
          }
        }) : [])
      })
  }
  const handleInputChange = (value: string) => {
    if (value) {
      getSearchProfile(value)
    }
    else{
      setOptions([])
    }
  }

  return (
    <SelectField onInputChange={handleInputChange} options={options} label={props.label} placeholder={props.placeholder} name={props.name} />
  )
}
