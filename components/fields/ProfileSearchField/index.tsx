import { IField, InputStyleType, IOption } from 'types/types'
import { useField } from 'formik'
import SelectField from 'components/fields/SelectField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
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
  useEffect(() => {
    getSearchProfile()
  }, [])
  const getSearchProfile = (search = '') => {
    return request({url: `/api/profile/search?${queryString.stringify({slug: search})}`, method: 'GET'})
      .then((response) => {
        const data = response.data
        setOptions(data ? data?.data?.map(item => {
          return {
            label: `${item.firstName} ${item.lastName}`,
            value: item.id
          }
        }) : [])
      })
  }
  const handleMenuOpen =  () => {
    if(options.length === 0) {
       getSearchProfile()
    }
  }

  return (
    <SelectField options={options} label={props.label} placeholder={props.placeholder} name={props.name} onMenuOpen={handleMenuOpen} />
  )
}
