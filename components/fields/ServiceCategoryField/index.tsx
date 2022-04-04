import { IField, InputStyleType, IOption } from 'types/types'
import { useField } from 'formik'
import SelectField from 'components/fields/SelectField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import ServiceCategoryRepository from 'data/repositories/ServiceCategoryRepository'
import {IServiceCategory} from 'data/intefaces/IServiceCategory'

interface Props<T> extends IField<T> {
  styleType?: InputStyleType
  categoryId?: number
  valueAsObject?: boolean
}

export default function ServiceCategoryField(props: Props<number | IServiceCategory>) {
  const [field, meta, helpers] = useField(props)
  const [options, setOptions] = useState<IOption<number | IServiceCategory>[]>([])
  const { t, i18n } = useTranslation('common')
  useEffect(() => {
  }, [props.categoryId, i18n.language])
  const fetchData = async (search = '') => {
    const data = await ServiceCategoryRepository.fetchCategories({ id: !search ? (props.valueAsObject ? (field.value as IServiceCategory)?.id : field.value as number) : null, categoryId: props.categoryId, search, lang: i18n.language})
    return data?.map(item => ({
      value:  props.valueAsObject ? item : item.id,
      label: item.name,
    })) || [];
  }
  const handleMenuOpen = async () => {
    await fetchData()
  }
  const handleLoadOptions =  async (initialValue) => {
    const res = await fetchData(initialValue)
    console.log("ResData", res);
     return res;
  }
  return (
    <SelectField key={`${props.categoryId}`} label={props.label} placeholder={props.placeholder} name={props.name} loadOptions={handleLoadOptions}/>
  )
}
