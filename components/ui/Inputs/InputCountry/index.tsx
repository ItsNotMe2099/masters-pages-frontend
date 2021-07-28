import {  fetchLocationCountries } from "components/ui/Inputs/InputCountry/actions";
import SelectInput from "components/ui/Inputs/SelectInput";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import { useDebouncedCallback } from "use-debounce";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import request from 'utils/request'
import queryString from 'query-string'
import {useTranslation} from 'i18n'

interface Props {

}

export default function InputCountry(props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const [options, setOptions] = useState([]);
  const {t, i18n} = useTranslation();
  const handleOnChange = (value) => {
    props.input.onChange(value);
  }
  useEffect(() => {
    if(props.input.value){
      getSearchCountry();
    }

  }, [i18n.language])
  const getSearchCountry = (search = '') => {
    return request({url: `/api/location/country?${queryString.stringify({search, limit: 1000, page: 1, lang: i18n.language})}`, method: 'GET'})
      .then((response) => {
        const data = response.data;
        setOptions(data ? data.map(item => {
          return {
            value: item.country_code,
            label: item.name,
          }
        }) : [])
      })
  }
  const handleOnSearchChange = useDebouncedCallback((value) => {

    if(!value){
      return;
    }
    setValue(value)
    getSearchCountry(value)
  }, 300);
  const handleOnOpen = () => {
    getSearchCountry(value);
  }
  return (
    <SelectInput {...props} options={options} onOpenDropDown={handleOnOpen} onSearchChange={(e) => handleOnSearchChange.callback(e)} isLocation={true}/>
  )
}
