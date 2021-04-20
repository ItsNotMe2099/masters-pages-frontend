import { fetchSavedPeople } from "components/SavedPeople/actions";
import { fetchSavedTasks, fetchSavedTasksRequest, resetSavedTasksList } from "components/SavedTasks/actions";
import Button from "components/ui/Button";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";
import SavedTaskItem from 'pages/PersonalArea/saved/components/SavedTasks/SavedTaskItem'

interface Props {
}
const SavedTasks = (props: Props) => {
  const dispatch = useDispatch()
  const list = useSelector((state: IRootState) => state.savedTasks.list)
  const total = useSelector((state: IRootState) => state.savedTasks.listTotal)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(resetSavedTasksList())
    dispatch(fetchSavedTasks())
  }, [])

  const handleScrollNext = () => {
    setPage(page + 1)
    dispatch(fetchSavedTasksRequest(page + 1))
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
        {list.map(item => <SavedTaskItem key={item.id} item={item}/>)}
        </InfiniteScroll>}
      </>
  )
}

export default SavedTasks
