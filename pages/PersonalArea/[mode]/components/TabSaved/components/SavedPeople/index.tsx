
import { fetchSavedPeople, fetchSavedPeopleRequest } from "components/SavedPeople/actions";
import SavedProfileItem from "pages/PersonalArea/[mode]/components/TabSaved/components/SavedPeople/SavedProfileItem";
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
  const [limit, setLimit] = useState(1)

  console.log("LIST!!!!",list.length)

  useEffect(() => {
    dispatch(fetchSavedPeople())
  }, [])

  const handleScrollNext = () => {
    setLimit(limit + 1)
    dispatch(fetchSavedPeopleRequest(1, limit))
    console.log("handleScrollNext", limit)
  }

  return (
    <>
    <InfiniteScroll
      dataLength={list.length}
      next={handleScrollNext}
      hasMore={total > list.length}
      loader={<div>LOADING...</div>}
      >
      {list.map(item => (<SavedProfileItem key={item.id} item={item}/>))}
      </InfiniteScroll>
    </>
  )
}

export default SavedPeople
