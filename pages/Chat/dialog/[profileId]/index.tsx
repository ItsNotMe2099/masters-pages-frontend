import Chat from "components/Chat";
import { fetchChat, fetchChaTaskDialog, fetchChatDialog, fetchChatListFirst } from "components/Chat/actions";
import ChatPageLayout from "components/layout/ChatLayout";
import Header from 'components/layout/Header'
import Modals from "components/layout/Modals";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { withAuthSync } from 'utils/auth'
import { useSelector, useDispatch } from 'react-redux'

const ChatPage = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { profileId} = router.query;
  useEffect(() => {
    dispatch(fetchChatDialog(parseInt(profileId as string, 10)));

  }, [router.query.chatId])
  return (<>
      <ChatPageLayout {...props} isTaskChat={false}/>
      <Modals/>
    </>
  )
}

export default withAuthSync(ChatPage)
