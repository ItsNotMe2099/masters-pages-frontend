import Tabs from "components/ui/Tabs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

import {useTranslation, withTranslation} from "react-i18next";
import {getAuthServerSide} from 'utils/auth'
import TabReviews from 'pages/PersonalArea/reviews'
import Layout from 'components/layout/Layout'
import SavedPeople from 'pages/PersonalArea/saved/components/SavedPeople'
import SavedSearches from 'pages/PersonalArea/saved/components/SavedSearches'
import SavedTasks from 'pages/PersonalArea/saved/components/SavedTasks'
interface Props {
  t?: (string) => string,
}
const TabSaved = (props: Props) => {
  const { t } = useTranslation('common');
  const router = useRouter()
  const dispatch = useDispatch()
  const searches = useSelector((state: IRootState) => state.savedSearch.list)
  const people = useSelector((state: IRootState) => state.savedPeople.list)
  const tasks = useSelector((state: IRootState) => state.savedTasks.list)
  const { mode, tab, tabSubPage } = router.query

  const tabs = [
    {name: t('personalArea.tabSaved.menu.people'), key: 'people'},
    {name: t('personalArea.tabSaved.menu.search'), key: 'search'},
    {name: t('personalArea.tabSaved.menu.tasks'), key: 'tasks'},
  ].map(item => {
    return{
      ...item,
      link: `/PersonalArea/${tab}/${item.key}`
    }})


  return (
    <Layout>
    <div className={styles.root}>
      <Tabs style={'round'} tabs={tabs.map((tab => {

        return {...tab, }
      }))} activeTab={tabSubPage as string}/>
      <div className={styles.tasks}>
        {tabSubPage === "people" &&
          <SavedPeople/>
        }
        {tabSubPage === "search" &&
        <SavedSearches/>
        }
        {tabSubPage === "tasks" &&
          <>
          <SavedTasks/>
          </>
        }
      </div>
    </div>
    </Layout>
  )
}

export default TabSaved

export const getServerSideProps = getAuthServerSide({redirect: true});
