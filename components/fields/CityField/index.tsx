import { IField, InputStyleType, IOption } from 'types/types'
import { useField } from 'formik'
import SelectField from 'components/fields/SelectField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import LocationRepository from 'data/repositories/LocationRepository'
import {InputActionMeta} from 'react-select'

interface Props<T> extends IField<T> {
  styleType?: InputStyleType
  countryCode: string
}

export default function CityField(props: Props<number>) {
  const [field, meta, helpers] = useField(props)
  const [options, setOptions] = useState<IOption<number>[]>([])
  const { t, i18n } = useTranslation('common')
  useEffect(() => {
      fetchData()
  }, [props.countryCode, i18n.language])
  const fetchData = async (search = '') => {
    const data = await LocationRepository.fetchCities({countryCode: props.countryCode, search, lang: i18n.language})
    console.log('FetchData', data)
    setOptions(data?.map(item => ({
        value: item.id,
        label: item.name,
    })) || [])
  }
  const handleMenuOpen = async () => {
    await fetchData()
  }
  const handleInputChange = async (newValue: string, actionMeta: InputActionMeta) => {
    await fetchData(newValue)
  }
  return (
    <SelectField options={options} label={props.label} name={props.name} onMenuOpen={handleMenuOpen} onInputChange={handleInputChange}/>
  )
}
