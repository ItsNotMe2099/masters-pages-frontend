import { IField, InputStyleType, IOption } from 'types/types'
import { useField } from 'formik'
import SelectField from 'components/fields/SelectField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import LocationRepository from 'data/repositories/LocationRepository'

interface Props<T> extends IField<T> {
  styleType?: InputStyleType
  className?: string
}

export default function LocationField(props: Props<string>) {
  const [field, meta, helpers] = useField(props)
  const [options, setOptions] = useState<IOption<any>[]>([])
  const { t, i18n } = useTranslation('common')

  useEffect(() => {
    if(field.value){
      fetchData()
    }

  }, [i18n.language])
  const fetchData = async (search = '') => {
    const data = await LocationRepository.fetchLocations({search, lang: i18n.language})
    console.log('fetchCountries111', data)
    setOptions(data?.map(item => ({
        value: item.id,
        label: item.name,
    })) || [])
  }
  const handleMenuOpen =  () => {
    if(options.length === 0) {
       fetchData()
    }
  }

  return (
    <SelectField className={props.className} options={options} label={props.label} placeholder={props.placeholder} name={props.name} onMenuOpen={handleMenuOpen} />
  )
}
