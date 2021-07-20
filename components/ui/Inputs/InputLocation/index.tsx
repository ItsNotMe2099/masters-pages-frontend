import { fetchLocationCity } from "components/ui/Inputs/InputLocation/actions";
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
  input?: {
    value: any,
    name: any
    onChange: (val) => void
  }
  countryCode?: string,
}

export default function InputLocation(props: Props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const {t, i18n} = useTranslation();
  const [options, setOptions] = useState([]);
  const handleOnChange = (value) => {
    console.log("OnChangeLocValue", value)
    props.input.onChange(value);
  }
  const getSearchCity = (search = '') => {
    console.log("SearchVal", props.input.value);
    return request({url: `/api/location/city?${queryString.stringify({search,  country: props.countryCode, id: search ? null : props.input.value, limit: 1000, page: 1, lang: i18n.language})}`, method: 'GET'})
      .then((response) => {
        const data = response.data;
        console.log("Response", data)
        setOptions(data ? data.map(item => {
          return {
            value: item.geonameid,
            label: item.name,
          }
        }) : [])
      })
  }
  useEffect(() => {
    getSearchCity();
  }, [props.countryCode])

  const handleOnSearchChange = useDebouncedCallback((value) => {

    console.log("search change", value)
    if(!value){
      return;
    }
    setValue(value)
    getSearchCity(value);
  }, 400);

  return (
    <SelectInput {...props} options={options as [{value: string, label: string}]} onSearchChange={(e) => handleOnSearchChange.callback(e)} />
  )
}
