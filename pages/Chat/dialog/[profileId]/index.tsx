import Chat from "components/Chat";
import { fetchChat, fetchChatListFirst } from "components/Chat/actions";
import ChatPageLayout from "components/layout/ChatLayout";
import Header from 'components/layout/Header'
import { useRouter } from "next/router";
import { useEffect } from "react";

import { withAuthSync } from 'utils/auth'
import { useSelector, useDispatch } from 'react-redux'

const ChatPage = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    dispatch(fetchChatListFirst());
  }, [router.query.chatId])
  return (
    <ChatPageLayout {...props}/>
  )
}

export default withAuthSync(ChatPage)
