import Chat from 'components/Chat'
import Loader from 'components/ui/Loader'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import Layout from 'components/layout/Layout'

interface Props {
  isTaskChat?: boolean
}
/*
  Пользовательский чат -> Открыли страницу -> Получили нужны чат
  Задание чат -> Открыли страницу -> Получили нужны чат
  просто чат -> Открыли страницу -> Редирект на первый чат

 */

export default function ChatPageLayout(props: Props) {
  const dispatch = useDispatch()
  const chatLoading = useSelector((state: IRootState) => state.chat.chatLoading)
  const chat = useSelector((state: IRootState) => state.chat.chat)
  return (
    <Layout>
    <div className={styles.root}>
      <div className={styles.chat}>
        {chatLoading && chat === null ? <Loader/> : <Chat {...props}/>}
      </div>
    </div>
    </Layout>
  )
}
