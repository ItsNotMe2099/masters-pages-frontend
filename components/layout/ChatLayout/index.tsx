import Chat from "components/Chat";
import Header from "components/layout/Header";
import Loader from "components/ui/Loader";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

interface Props {

}
/*
  Пользовательский чат -> Открыли страницу -> Получили нужны чат
  Задание чат -> Открыли страницу -> Получили нужны чат
  просто чат -> Открыли страницу -> Редирект на первый чат

 */

export default function ChatPageLayout(props: Props) {
  const dispatch = useDispatch()
  const chatPageLoading = useSelector((state: IRootState) => state.chat.chatPageLoading)
  return (
    <div className={styles.root}>
     <Header {...props}/>
      <div className={styles.chat}>
        {chatPageLoading ? <Loader/> : <Chat/>}
      </div>
    </div>
  )
}
