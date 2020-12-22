import { changePassword } from "components/Auth/ChangePassword/actions";
import { signInSubmit } from "components/Auth/SignIn/actions";
import Button from 'components/ui/Button'
import Modal from "components/ui/Modal";
import { IRootState } from "types";
import SignIn from './Form'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function ChangePassword(props: Props) {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.changePassword.loading)

  const handleSubmit = (data) => {
    console.log("handleSubmit", data)
    dispatch(changePassword(data));
  }
  return (
    <Modal{...props} title={'Change Password'} loading={isLoading}>
         <SignIn onSubmit={handleSubmit}/>

    </Modal>
  )
}
