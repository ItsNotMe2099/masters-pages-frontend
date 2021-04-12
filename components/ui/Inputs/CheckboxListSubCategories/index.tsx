import { CheckboxList } from "components/ui/Inputs/CheckboxList";
import SelectInput from "components/ui/Inputs/SelectInput";
import { useCallback, useEffect, useState } from "react";
import { IRootState } from "types";
import request from "utils/request";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategory } from "./actions";

interface Props {

}

export default function CheckboxListSubCategories(props) {
  const dispatch = useDispatch()
  const [options, setOptions] = useState([]);
  useEffect( () => {
    console.log("CategoryId updated")
    if(!props.categoryId){
      setOptions([]);
      return;
    }
     request({url: `/api/service-category/${props.categoryId}/subcategory?lang=ru`, method: 'GET'})
       .then((response) => {
         const data = response.data;
         console.log("Response", data)

         setOptions(data ? data.map(item => {
           return {
             value: item.id,
             label: item.name,
           }
         }) : [])
       })
  }, [props.categoryId])
  return (
    <CheckboxList {...props} options={options}/>
  )
}
