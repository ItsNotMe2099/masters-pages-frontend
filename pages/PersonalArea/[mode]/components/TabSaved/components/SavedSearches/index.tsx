import { fetchSavedPeople } from "components/SavedPeople/actions";
import { fetchSavedSearches } from "components/SavedSearches/actions";
import Button from "components/ui/Button";
import SavedSearchItem from "pages/PersonalArea/[mode]/components/TabSaved/components/SavedSearches/SavedSearchItem";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import { useSelector, useDispatch } from 'react-redux'
interface Props {
}
const SavedSearches = (props: Props) => {
  const dispatch = useDispatch()
  const list = useSelector((state: IRootState) => state.savedSearch.list)
  useEffect(() => {
    dispatch(fetchSavedSearches())
  }, [])
  return (
      <>
        {list.map(item => <SavedSearchItem key={item.id} item={item}/>)}
      </>
  )
}

export default SavedSearches
