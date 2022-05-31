import { RadioList } from 'components/ui/Inputs/RadioList'
import { useEffect, useState } from 'react'
import request from 'utils/request'
import { useDispatch } from 'react-redux'

interface Props {

}

export default function RadioListSubCategories(props) {
  const dispatch = useDispatch()
  const [options, setOptions] = useState([])
  useEffect( () => {
     request({url: `/api/service-category/${props.categoryId}/subcategory?lang=ru`, method: 'GET'})
       .then((response) => {
         const data = response.data

         setOptions(data ? data.map(item => {
           return {
             value: item.id,
             label: item.name,
           }
         }) : [])
       })
  }, [props.categoryId])
  return (
    <RadioList {...props} options={options}/>
  )
}
