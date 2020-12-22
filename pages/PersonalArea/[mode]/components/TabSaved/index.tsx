import Tabs from "components/ui/Tabs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSavedSearches } from "components/SavedSearches/actions";
import { fetchSavedPeople } from "components/SavedPeople/actions";
import SavedPeople from "./components/SavedPeople";
import SavedSearches from "./components/SavedSearches";
interface Props {

}
const TabSaved = (props: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const searches = useSelector((state: IRootState) => state.savedSearch.list)
  const people = useSelector((state: IRootState) => state.savedPeople.list)

  const { mode, tab, tabSubPage } = router.query
  const savedPeople = [{name: "Jacob Jones", category1: "Art and design", category2: "Fitness", category3: "Courier", number: 15},
  {name: "Jacob Jones", category1: "Art and design", category2: "Fitness", category3: "Courier", number: 15},
  {name: "Jacob Jones", category1: "Art and design", category2: "Fitness", category3: "Courier", number: 15},
  {name: "Jacob Jones", category1: "Art and design", category2: "Fitness", category3: "Courier", number: 15}
  ]
  const savedSearches = [{type: "Master search", category: "Art and design", subCategory: "Logo design", location: "Toronto", rating: "5 stars only", number: 3},
  {type: "Task search", category: "Art and design", subCategory: "Logo design", location: "Toronto", rating: "5 stars only", number: 3},
  {type: "Master search", category: "Art and design", subCategory: "Logo design", location: "Toronto", rating: "5 stars only", number: 3}
  ]

  const tabs = [
    {name: 'People', key: 'people'},
    {name: 'Search', key: 'search'},
    {name: 'Tasks', key: 'tasks'},
  ].map(item => {
    return{
      ...item,
      link: `/PersonalArea/${mode}/${tab}/${item.key}`
    }})

    useEffect(() => {
      dispatch(fetchSavedSearches())
      dispatch(fetchSavedPeople())
    }, [])

  return (
    <div className={styles.root}>
      <Tabs style={'round'} tabs={tabs.map((tab => {

        return {...tab, }
      }))} activeTab={tabSubPage as string}/>
      <div className={styles.tasks}>
        {tabSubPage === "people" &&
          <>{people.map(item => <SavedPeople 
            name={item.name} 
            firstCategory={item.category1}
            secondCategory={item.category2}
            thirdCategory={item.category3}
            number={item.number}
            />)}</>
        }
        {tabSubPage === "search" &&
          <>
          {searches.map(item => <SavedSearches
            type={item.type} 
            category={item.category}
            subCategory={item.subCategory}
            location={item.location}
            rating={item.rating}
            number={item.number}
            />)}
          </>
        }
      </div>
    </div>
  )
}

export default TabSaved
