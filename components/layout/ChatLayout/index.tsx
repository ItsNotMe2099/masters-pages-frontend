import Chat from "components/Chat";
import Header from "components/layout/Header";
import Loader from "components/ui/Loader";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
  isTaskChat?: boolean
}
/*
  Пользовательский чат -> Открыли страницу -> Получили нужны чат
  Задание чат -> Открыли страницу -> Получили нужны чат
  просто чат -> Открыли страницу -> Редирект на первый чат

 */

export default function ChatPageLayout(props) {
  const dispatch = useDispatch()
  const chatLoading = useSelector((state: IRootState) => state.chat.chatLoading)
  const chat = useSelector((state: IRootState) => state.chat.chat)
  return (
    <div className={styles.root}>
     <Header {...props}/>
      <div className={styles.chat}>
        {chatLoading && chat === null ? <Loader/> : <Chat {...props}/>}
      </div>
    </div>
  )
}
