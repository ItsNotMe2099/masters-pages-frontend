import { useRouter } from "next/router";
import * as React from "react";
import styles from './index.module.scss'
import {EventStatus, IEvent, IRootState} from 'types'
import MarkIcon from 'components/svg/MarkIcon'
import AddCircleIcon from 'components/svg/AddCircleIcon'
import { useSelector, useDispatch } from 'react-redux'
import {eventExpenseActualOpen, eventExpensePlannedOpen} from 'components/Modal/actions'
import {getCurrencySymbol} from 'data/currency'
import {useTranslation} from 'react-i18next'
interface Props {
  event: IEvent,
  type: 'actual' | 'planned',
  estimate?: number,
  budget?: number,
  actualBudget?: number,
  totalHours?: number
  priceType?: string,
  price?: {total: number, rate: number}
  actualPrice?: {total: number, rate: number}
  onAddExpense?: (type) => void
  onEditExpense?: (type, key, data) => void,
  isDisabled?: boolean

}
const Expenses = ({event, type, priceType, budget, price, actualPrice, actualBudget, onAddExpense, onEditExpense, isDisabled}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentEventExpenses = useSelector((state: IRootState) => state.event.currentEventExpenses)
  const currentEventActualExpenses = useSelector((state: IRootState) => state.event.currentEventActualExpenses)
  const {t} = useTranslation('common');

  const handleAddExpense = () => {
    if(isDisabled){
      return;
    }
    console.log("handleAddExpense");
    onAddExpense(type)
  }
  const getTotalAmount = () => {
    const itemsAmount = items.length > 0 ? items.map(item => item.amount).reduce( (accumulator, currentValue) => +accumulator + +currentValue) : 0;
   console.log("getTotalAmount", priceType, type);
    if(type === 'actual'){
      return +itemsAmount  + +(priceType === 'rate' ? +actualPrice.total * +actualPrice.rate :  +actualBudget )
    }else{
      return +itemsAmount  + +(priceType === 'rate' ? +price.total * +price.rate :  +budget )

    }
  }
 const items = type === 'actual' ? currentEventActualExpenses : currentEventExpenses;
  return (
    <div className={`${styles.root}`}>
      <div className={styles.header}>
        <div className={styles.title}>{t('task.page.expenses')}</div>
        <div className={styles.add} onClick={handleAddExpense}><AddCircleIcon/></div>
      </div>
      {items.length > 0 && <div className={styles.items}>
        {items.map(item => <div className={styles.row}>
          <div className={styles.label}>{item.type}</div>
          <div className={styles.value}>{item.amount}{getCurrencySymbol(event.task?.currency)}</div>
        </div>)}
      </div>}
     <div className={styles.total}>
        <div className={styles.label}>{`${t('total')}:`}</div>
        <div className={styles.value}>{getTotalAmount()}{getCurrencySymbol(event.task?.currency)}</div>
      </div>
    </div>
  )
}


export default Expenses
