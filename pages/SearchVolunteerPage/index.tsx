import Modals from 'components/layout/Modals'
import {
  resetProfileSearchList,
  setFilterProfileSearch,
  setSortProfileSearch
} from 'components/ProfileSearch/actions'
import SearchProfileListView from 'components/SearchPage/ListView'
import SearchProfileMapView from 'components/SearchPage/MapView'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {getAuthServerSide} from 'utils/auth'
import { useDispatch } from 'react-redux'
const queryString = require('query-string')
const SearchVolunteerPage = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    dispatch(resetProfileSearchList())
    if(router.query.filter) {
      dispatch(setFilterProfileSearch(JSON.parse((router.query as any).filter)))
    }
    if(router.query.sortType) {
      dispatch(setSortProfileSearch((router.query as any).sortType))
    }

  }, [])
  return (
    <>
      {showMap ?
      <SearchProfileMapView searchRole={'volunteer'} onShowList={() => setShowMap(false)} {...props}/> :
      <SearchProfileListView searchRole={'volunteer'}  onShowMap={() => setShowMap(true)} {...props}/>}
      <Modals/>
  </>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: false})
export default SearchVolunteerPage
