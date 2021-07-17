import Map from "components/Map";
import * as React from "react";
import Button from "components/ui/Button";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState, ITask } from "types";

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
            <Map/>
          </div>
      </div>
    </>
  )
}

export default Payment
