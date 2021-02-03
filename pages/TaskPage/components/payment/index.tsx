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
import { IRootState, ITask } from "types";
import { fetchProfileById } from "components/PublicProfile/actions";
import { fetchTaskById } from "components/TaskPage/actions";

interface Props {
  task: ITask
}


const Payment = (props: Props) => {

  const dispatch = useDispatch()
  const handleAccept = () => {
    
  }



  return (
    <>
      <div className={styles.payment}>
        <div className={styles.grey}>
        <div className={styles.titleLeft}>
          Payment method:
        </div>
        <div className={styles.methodWrapper}>
        <div className={styles.method}>
          <img src="/img/SearchTaskPage/icons/bank.svg" alt=''/>
          <div className={styles.desc}>Bank account</div>
        </div>
        <div className={styles.method}>
          <img src="/img/SearchTaskPage/icons/cash.svg" alt=''/>
          <div className={styles.desc}>Cash</div>
        </div>
        <div className={styles.methodSafe}>
          <img className={styles.last} src="/img/SearchTaskPage/icons/safe.svg" alt=''/>
          <div className={styles.desc}>Safe deal</div>
        </div>
        </div>
        {props.task.budget ?
          <div className={styles.priceWrapper}>
          <div className={styles.price}>
            Fixed price:
          </div>
          <div className={styles.title}>
            less then <span>${props.task.budget}</span>
          </div>
          </div>
          :
          props.task.ratePerHour && <div className={styles.priceWrapper}>
          <div className={styles.price}>
            Hourly:
          </div>
          <div className={styles.title}>
            <span>${props.task.ratePerHour}/h</span>
          </div>
          </div>
          }
          <div className={styles.btnContainer}>
            <Button bold smallFont transparent size='16px 0' onClick={handleAccept}>ACCEPT TASK</Button>
          </div>
          <div className={styles.location}>
            Location:
          </div>
          </div>
          <div className={styles.map}>
          </div>
      </div>
    </>
  )
}

export default Payment
