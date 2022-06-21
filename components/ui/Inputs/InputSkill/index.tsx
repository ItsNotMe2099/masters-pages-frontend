import SelectInput from 'components/ui/Inputs/SelectInput'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import request from 'utils/request'
import { useTranslation } from 'next-i18next'
import {getCategoryTranslation} from 'utils/translations'
interface Props {
  useSubCategoryId: boolean
}

export default function InputSkill(props) {
  const {t, i18n} = useTranslation()
  const dispatch = useDispatch()
  const [value, setValue] = useState()

  const [options, setOptions] = useState([])
  useEffect(() => {
    if(props.input.value){
      getSearchCategory()
    }

  }, [i18n.language])

  const getSearchCategory = (search = '') => {
    return request({url: '/api/profile/skill', method: 'GET'})
      .then((response) => {
        const data = response.data
        setOptions(data ? data.filter(i => i.subCategoryId).map(item => {
          return {
            value: props.useSubCategoryId ? item.subCategoryId : item.id,
            label: `${getCategoryTranslation(item.mainCategory, i18n.language)?.name || ''}${getCategoryTranslation(item.category, i18n.language).name}/${getCategoryTranslation(item.subCategory, i18n.language)?.name}`,
          }
        }) : [])
      })
  }
  const handleOnOpen = () => {
    getSearchCategory(value)
  }
  const handleOnSearchChange = (value) => {
    setValue(value)
    getSearchCategory(value)
  }


  return (
    <SelectInput {...props} options={options}  onOpenDropDown={handleOnOpen} />
  )
}
