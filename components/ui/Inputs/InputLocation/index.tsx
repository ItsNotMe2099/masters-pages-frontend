import SelectInput from 'components/ui/Inputs/SelectInput'
import { useEffect, useState, useContext } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useDispatch } from 'react-redux'
import request from 'utils/request'
import queryString from 'query-string'
import { useTranslation } from 'next-i18next'
import { I18nContext } from 'next-i18next'


interface Props {
  input?: {
    value: any,
    name: any
    onChange: (val) => void
  }
  countryCode?: string,
}

export default function InputLocation(props: Props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState()
  const {t, i18n} = useTranslation()
  const [options, setOptions] = useState([])
  const { i18n: { language } } = useContext(I18nContext)
  const handleOnChange = (value) => {
    props.input.onChange(value)
  }
  const getSearchCity = (search = '') => {
    return request({url: `/api/location/city?${queryString.stringify({search,  country: props.countryCode, id: search ? null : props.input.value, limit: 1000, page: 1, lang: i18n.language})}`, method: 'GET'})
      .then((response) => {
        const data = response.data
        setOptions(data ? data.map(item => {
          return {
            value: item.id,
            label: item.name,
          }
        }) : [])
      })
  }
  useEffect(() => {
    getSearchCity()
  }, [props.countryCode, language])

  const handleOnSearchChange = useDebouncedCallback((value) => {

    if(!value){
      return
    }
    setValue(value)
    getSearchCity(value)
  }, 400)

  return (
    <SelectInput {...props} options={options as [{value: string, label: string}]} onSearchChange={(e) => handleOnSearchChange(e)} />
  )
}
