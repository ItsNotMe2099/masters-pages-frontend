import { fetchChat, sendMessage } from "components/Chat/actions";
import TextArea from "components/ui/Inputs/TextArea";
import Loader from "components/ui/Loader";
import { useEffect, useState } from "react";
import { IChat, IChatMessage, IChatMessageType, IRootState } from "types";
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux';
interface Props {

}

export default function ChatNewMessage(props: Props) {
  const dispatch = useDispatch()
  const {chat, messageSentError, messageIsSending, messageSentSuccess} = useSelector((state: IRootState) => state.chat)
  const [message, setMessage] = useState('');
  const handleSendMessage = () => {
    if(message && chat) {
      dispatch(sendMessage({ message, chatId: chat.id }))
    }
  }
  const handleChange = (e) => {
    console.log("HandleChange", e.currentTarget.value)
    setMessage(e.currentTarget.value);
  }
  useEffect(() => {
    if(messageSentSuccess){
      setMessage('')
    }
  }, [messageSentSuccess])
  return (
   <div className={styles.root}>
     <div className={styles.action}><img src={'/img/icons/camera_small.svg'}/></div>
    <form className={styles.form} onSubmit={handleSendMessage}>
     <div className={styles.message}>
       <TextArea
         label="Enter your message"
         labelType={'placeholder'}
         meta={{}}
         input={{value: message, onChange: handleChange}}
         className={styles.messageField}
       />
     </div>
     {!messageIsSending ?    <div className={styles.button} onClick={handleSendMessage}>
       <img src={'/img/icons/new-message.svg'}/>
     </div> : <div className={styles.loader}><Loader/></div>}
    </form>
   </div>
  )
}
