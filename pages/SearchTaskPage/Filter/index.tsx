import { fetchTaskSearchList, resetTaskSearchList, setFilterTaskSearch } from "components/TaskSearch/actions";
import { useRouter } from "next/router";
import SearchTaskForm from "pages/SearchTaskPage/Filter/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
const queryString = require('query-string')
interface Props {
  initialValues?: any
}
const SearchTaskFilter = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter();
  const [showMap, setShowMap] = useState(false)
  const handleFilterChange = (data) => {
    console.log("Change", data)
    dispatch(setFilterTaskSearch(data));
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList())
    router.push(`/SearchTaskPage?${queryString.stringify({filter: JSON.stringify(data)})}`, undefined, { shallow: true })
  }
  return <SearchTaskForm {...props} onChange={handleFilterChange} initialValues={props.initialValues}/>
}
export default SearchTaskFilter
