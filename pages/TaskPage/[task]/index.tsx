import { changeRole, fetchProfile } from "components/Profile/actions";
import Tabs from "components/ui/Tabs";
import { useEffect, useState } from "react";
import * as React from "react";
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Button from "components/ui/Button";
import { Router, useRouter } from "next/router";
import ProfileSection from "pages/PublicProfile/components/ProfileSection";
import TabPortfolio from "pages/PublicProfile/components/TabPortfolio";
import TabReviews from "pages/PublicProfile/components/TabReviews";
import styles from './index.module.scss'
import { TabSelect } from "components/TabSelect";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import { fetchProfileById } from "components/PublicProfile/actions";
import { fetchTaskById } from "components/TaskPage/actions";
import Avatar from "components/ui/Avatar";
import Profile from "../components/profile";
import Description from "../components/description";
import Payment from "../components/payment";
import { withRestrictAuthSync } from "utils/auth";
import Loader from "components/ui/Loader";

const TaskPage = (props) => {
  const router = useRouter()
  //const { task } = router.query
  const dispatch = useDispatch()
  const task = useSelector((state: IRootState) => state.taskPage.task)
  const loading = useSelector((state: IRootState) => state.taskPage.loading)

  React.useEffect(() => {
    dispatch(fetchTaskById(router.query.task))
    console.log("FETCH!!!!!!!!!")
  },[])
  

  return (
    <>
      <Header {...props}/>
      {task.profile === undefined ?

      <Loader/>

      :
        <div className={styles.root}>
          <div className={styles.left}>
            <Profile task={task}/>
            <Description task={task}/>
          </div>
          <div className={styles.right}>
            <Payment task={task}/>
          </div>
        </div>}
      <Footer/>
      </>
  )
}

export default withRestrictAuthSync(TaskPage)
