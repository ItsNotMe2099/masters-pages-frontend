import Modals from "components/layout/Modals";
import { setFilterTaskSearch, setSortTaskSearch } from "components/TaskSearch/actions";
import { useRouter } from "next/router";
import SearchTaskListView from "pages/SearchTaskPage/ListView";
import SearchTaskMapView from "pages/SearchTaskPage/MapView";
import { useEffect, useState } from "react";
import { withAuthSync } from "utils/auth";
import { useDispatch, useSelector } from 'react-redux'
const queryString = require('query-string')
const SearchTaskPage = (props) => {
  const dispatch = useDispatch()
  const router = useRouter();
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {

  }, [])
  return (
    <>
      {showMap ?
      <SearchTaskMapView onShowList={() => setShowMap(false)} {...props}/> :
      <SearchTaskListView onShowMap={() => setShowMap(true)} {...props}/>}
      <Modals/>
  </>
  )
}
export default withAuthSync(SearchTaskPage)
