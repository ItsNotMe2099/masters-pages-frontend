import SelectInput from 'components/ui/Inputs/SelectInput'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useDispatch } from 'react-redux'
import request from 'utils/request'
import queryString from 'query-string'
import { useTranslation } from 'next-i18next'

interface Props {
  input?: {
    value: any,
    name: any
    onChange: (val) => void
  }
  role?: string
  countryCode?: string,
}

export default function InputProfileContact(props: Props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState()
  const {t, i18n} = useTranslation()
  const [options, setOptions] = useState([])
  const handleOnChange = (value) => {
    props.input.onChange(value)
  }
  useEffect(() => {
    getSearchProfile()
  }, [])
  const getSearchProfile = (search = '') => {
    return request({url: `/api/profile-contacts/all?${queryString.stringify({search, role: props.role,  country: props.countryCode, id: search ? null : props.input.value, limit: 1000, page: 1, lang: i18n.language})}`, method: 'GET'})
      .then((response) => {
        const data = response.data
        setOptions(data ? data?.data?.map(item => {
          return {
            label: `${item.contactProfile.firstName} ${item.contactProfile.lastName}`,
            value: item.contactProfile.id
          }
        }) : [])
      })
  }

  const handleOnSearchChange = useDebouncedCallback((value) => {

    if(!value){
      return
    }
    setValue(value)
    getSearchProfile(value)
  }, 400)

  return (
    <SelectInput {...props} options={options as [{value: string, label: string}]} onSearchChange={(e) => handleOnSearchChange(e)} />
  )
}
