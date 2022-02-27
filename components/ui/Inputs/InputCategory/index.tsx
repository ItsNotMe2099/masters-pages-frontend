import SelectInput from 'components/ui/Inputs/SelectInput'
import { useEffect, useState } from 'react'
import request from 'utils/request'
import { useDispatch } from 'react-redux'

interface Props {

}

export default function InputCategory(props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState()
  const [options, setOptions] = useState([])
  const handleOnChange = (value) => {
    props.input.onChange(value)
  }
  const getSearchCategory = ({id = '',search = ''}) => {
   return request({url: `/api/service-category?search=${search || ''}&id=${id || ''}&lang=ru`, method: 'GET'})
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
    getSearchCategory({id: props.input.value?.value || props.input.value})
  }, [])
  const handleOnSearchChange = (value) => {
    if(!value){
      return
    }
    setValue(value)
    getSearchCategory({search: value})
  }

  return (
    <div>
      <SelectInput {...props} options={options} onSearchChange={handleOnSearchChange}/>
    </div>
  )
}
