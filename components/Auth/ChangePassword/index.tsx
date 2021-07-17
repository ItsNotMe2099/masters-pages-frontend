import {changePassword, changePasswordReset} from "components/Auth/ChangePassword/actions";
import { signInSubmit } from "components/Auth/SignIn/actions";
import Button from 'components/ui/Button'
import Modal from "components/ui/Modal";
import { IRootState } from "types";
import SignIn from './Form'
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation, withTranslation} from "react-i18next";
import {useEffect} from 'react'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void,
}

const ChangePassword = (props: Props) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.changePassword.loading)

  useEffect(() => {
    dispatch(changePasswordReset());
  }, [])
  const handleSubmit = (data) => {
    console.log("handleSubmit", data)
    dispatch(changePassword(data));
  }
  return (
    <Modal{...props} title={t('auth.changePassword.title')} loading={isLoading}>
         <SignIn onSubmit={handleSubmit}/>

    </Modal>
  )
}
export default ChangePassword
