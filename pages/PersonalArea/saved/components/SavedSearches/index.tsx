import { fetchSavedSearches, fetchSavedSearchesRequest, resetSavedSearchesList } from "components/SavedSearches/actions";
import Button from "components/ui/Button";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";
import SavedSearchItem from 'pages/PersonalArea/saved/components/SavedSearches/SavedSearchItem'
interface Props {
}
const SavedSearches = (props: Props) => {
  const dispatch = useDispatch()
  const list = useSelector((state: IRootState) => state.savedSearch.list)
  const total = useSelector((state: IRootState) => state.savedSearch.listTotal)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(resetSavedSearchesList())
    dispatch(fetchSavedSearches())
  }, [])

  const handleScrollNext = () => {
    setPage(page + 1)
    dispatch(fetchSavedSearchesRequest(page + 1))
  }

  return (
      <>
      {total > 0 &&
    <InfiniteScroll
      dataLength={list.length}
      next={handleScrollNext}
      hasMore={total > list.length}
      loader={<div>LOADING...</div>}
      >
        {list.map(item => <SavedSearchItem key={item.id} item={item}/>)}
        </InfiniteScroll>}
      </>
  )
}

export default SavedSearches
