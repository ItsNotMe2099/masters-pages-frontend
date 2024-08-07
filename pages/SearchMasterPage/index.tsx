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
import {removeObjectEmpty} from 'utils/array'
const queryString = require('query-string')
const SearchMasterPage = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    dispatch(resetProfileSearchList())
    if(router.query.filter) {
      dispatch(setFilterProfileSearch(removeObjectEmpty(JSON.parse((router.query as any).filter))))
    }
    if(router.query.sortType) {
      dispatch(setSortProfileSearch((router.query as any).sortType))
    }

  }, [])
  return (
    <>
      {showMap ?
      <SearchProfileMapView  searchRole={'master'} onShowList={() => setShowMap(false)} {...props}/> :
      <SearchProfileListView  searchRole={'master'}  onShowMap={() => setShowMap(true)} {...props}/>}

  </>
  )
}

export const getServerSideProps = getAuthServerSide({redirect: true})
export default SearchMasterPage
