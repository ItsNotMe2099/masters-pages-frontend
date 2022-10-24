import SelectInput from 'components/ui/Inputs/SelectInput'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import request from 'utils/request'
import queryString from  'query-string'
import { useTranslation } from 'next-i18next'
interface Props {

}

export default function InputSubCategory(props) {
  const {t, i18n} = useTranslation()
  const dispatch = useDispatch()
  const [value, setValue] = useState()

  const [options, setOptions] = useState([])
  useEffect(() => {
    getSearchCategory()
    if(props.input.value){

    }

  }, [i18n.language])



  const getSearchCategory = async (search = '') => {
    const response = await request({url: `/api/service-category?${queryString.stringify({search, categoryId: props.categoryId, lang: i18n.language, id: props.changeWithValue ?  props.input?.value?.value :  props.input?.value})}`, method: 'GET'})
    const data = response.data
    const options = data ? data.map(item => {
      return {
        value: item.id,
        label: item.name,
      }
    }) : []
    setOptions(options)
    return options;
  }
  const handleOnOpen = () => {
    getSearchCategory(value)
  }
  const handleOnSearchChange = (value) => {
    setValue(value)
    getSearchCategory(value)
  }

  useEffect(() => {
    if(props.categoryId) {
      getSearchCategory().then(options => {

      })
    }
  }, [props.categoryId])

  return (
    <SelectInput {...props} options={options} onSearchChange={handleOnSearchChange} onOpenDropDown={handleOnOpen} />
  )
}
