
import { fetchSavedPeople, fetchSavedPeopleRequest, resetSavedPeopleList } from "components/SavedPeople/actions";
import SavedProfileItem from "pages/PersonalArea/components/TabSaved/components/SavedPeople/SavedProfileItem";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {

}
const SavedPeople = (props: Props) => {
  const dispatch = useDispatch()
  const list = useSelector((state: IRootState) => state.savedPeople.list)
  const total = useSelector((state: IRootState) => state.savedPeople.listTotal)
  const [page, setPage] = useState(1)

  console.log("LIST!!!!",list.length)

  useEffect(() => {
    console.log("PAGE!!!!!!",page)
    dispatch(resetSavedPeopleList())
    dispatch(fetchSavedPeople())
  }, [])

  const handleScrollNext = () => {
    setPage(page + 1)
    dispatch(fetchSavedPeopleRequest(page + 1))
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
      {list.map(item => (<SavedProfileItem key={item.id} item={item}/>))}
      </InfiniteScroll>
}
    </>
  )
}

export default SavedPeople
