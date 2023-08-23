import { IField, InputStyleType, IOption } from 'types/types'
import { useField } from 'formik'
import SelectField from 'components/fields/SelectField'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import { getCategoryTranslation } from 'utils/translations'

interface ICategories {
  mainCategoryId: number
  categoryId: number
  subCategoryId: number
}

interface Props<T> extends IField<T> {
  styleType?: InputStyleType
}

export default function SkillsField(props: Props<string>) {
  const [field, meta, helpers] = useField(props)
  const [options, setOptions] = useState<IOption<ICategories>[]>([])
  const { t, i18n } = useTranslation('common')
  useEffect(() => {
    fetchData()
  }, [])
  

  console.log('dsfewff', field.value)

  const fetchData = async (search = '') => {
    const data = await ProfileRepository.fetchSkills()
    console.log('fetchSkills', data)
    setOptions(data?.map(item => ({
      value: { mainCategoryId: item.mainCategory.id, categoryId: item.category.id, subCategoryId: item.subCategory.id },
      label: `${getCategoryTranslation(item.mainCategory, i18n.language)?.name}/${getCategoryTranslation(item.category, i18n.language)?.name}/${getCategoryTranslation(item.subCategory, i18n.language)?.name}`
    })) || [])
  }

  const handleMenuOpen = () => {
    if (options.length === 0) {
      fetchData()
    }
  }

  return (
    <SelectField options={options} label={props.label} placeholder={props.placeholder} name={props.name}  onMenuOpen={handleMenuOpen} />
  ) 
}
