import { useRouter } from 'next/router'
import SearchTaskListView from 'components/for_pages/SearchTaskPage/ListView'
import SearchTaskMapView from 'components/for_pages/SearchTaskPage/MapView'
import { useEffect, useState } from 'react'
import {getAuthServerSide} from 'utils/auth'
import { useDispatch } from 'react-redux'
import ProjectSearchListView from 'components/for_pages/ProjectSearch/ListView'
const queryString = require('query-string')
const SearchTaskPage = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {

  }, [])
  return (
    <>
      {showMap ?
      <SearchTaskMapView onShowList={() => setShowMap(false)} {...props}/> :
      <ProjectSearchListView onShowMap={() => setShowMap(true)} {...props}/>}

  </>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true})
export default SearchTaskPage
