import SelectInput from "components/ui/Inputs/SelectInput";
import { useCallback, useEffect, useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategory, resetSubCategory } from "./actions";
import {getCategoryTranslation} from 'utils/translations'
import request from 'utils/request'
import queryString from  'query-string';
import {useTranslation} from 'i18n'
interface Props {

}

export default function InputSubCategory(props) {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch()
  const [value, setValue] = useState();

  const [options, setOptions] = useState([]);
  useEffect(() => {
    if(props.input.value){
      getSearchCategory();
    }

  }, [i18n.language])

  const getSearchCategory = (search = '') => {
    return request({url: `/api/service-category?${queryString.stringify({search, categoryId: props.categoryId, lang: i18n.language, id: props.changeWithValue ?  props.input?.value?.value :  props.input?.value})}`, method: 'GET'})
      .then((response) => {
        const data = response.data;
        setOptions(data ? data.map(item => {
          return {
            value: item.id,
            label: item.name,
          }
        }) : [])
      })
  }
  const handleOnOpen = () => {
    getSearchCategory(value);
  }
  const handleOnSearchChange = (value) => {
    setValue(value)
    getSearchCategory(value);
  }

  useEffect(() => {

  }, [props.categoryId])

  return (
    <SelectInput {...props} options={options} onSearchChange={handleOnSearchChange} onOpenDropDown={handleOnOpen} isCategory={true} isTask={true}/>
  )
}
