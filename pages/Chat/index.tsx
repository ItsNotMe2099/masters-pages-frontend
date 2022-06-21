import ChatPageLayout from 'components/layout/ChatLayout'
import Modals from 'components/layout/Modals'

import {getAuthServerSide} from 'utils/auth'
import { useDispatch } from 'react-redux'

const ChatPage = (props) => {
  const dispatch = useDispatch()

  return (<>
    <ChatPageLayout {...props} isTaskChat={true}/>
    <Modals/>
    </>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true})
export default ChatPage
