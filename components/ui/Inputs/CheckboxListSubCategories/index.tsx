import { CheckboxList } from "components/ui/Inputs/CheckboxList";
import SelectInput from "components/ui/Inputs/SelectInput";
import { useCallback, useEffect, useState } from "react";
import { IRootState } from "types";
import request from "utils/request";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategory } from "./actions";
import queryString from 'query-string'
import {useTranslation} from 'i18n'

interface Props {

}

export default function CheckboxListSubCategories(props) {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch()
  const [options, setOptions] = useState([]);
  useEffect( () => {
    if(!props.categoryId){
      setOptions([]);
      return;
    }
     request({url: `/api/service-category?${queryString.stringify({categoryId: props.categoryId, lang: i18n.language, id: props.changeWithValue ?  props.input?.value?.value :  props.input?.value})}`, method: 'GET'})
      .then((response) => {
         const data = response.data;

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
