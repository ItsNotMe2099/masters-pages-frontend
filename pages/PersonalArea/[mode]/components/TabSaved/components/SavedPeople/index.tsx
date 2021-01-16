
import { fetchSavedPeople } from "components/SavedPeople/actions";
import SavedProfileItem from "pages/PersonalArea/[mode]/components/TabSaved/components/SavedPeople/SavedProfileItem";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import { useSelector, useDispatch } from 'react-redux'

interface Props {

}
const SavedPeople = (props: Props) => {
  const dispatch = useDispatch()
  const list = useSelector((state: IRootState) => state.savedPeople.list)
  useEffect(() => {
    dispatch(fetchSavedPeople())
  }, [])
  return (
    <>
      {list.map(item => <SavedProfileItem key={item.id} item={item}/>)}
    </>
  )
}

export default SavedPeople
