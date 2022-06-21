import { fetchChaTaskDialog } from 'components/Chat/actions'
import ChatPageLayout from 'components/layout/ChatLayout'
import Modals from 'components/layout/Modals'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import {getAuthServerSide} from 'utils/auth'
import { useDispatch } from 'react-redux'

const ChatPage = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {taskId, profileId} = router.query
  useEffect(() => {
    dispatch(fetchChaTaskDialog(parseInt(taskId as string, 10), parseInt(profileId as string, 10)))
  }, [router.query.chatId])
  return (<>
      <ChatPageLayout {...props} isTaskChat={true}/>
      <Modals/>
    </>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true})
export default ChatPage
