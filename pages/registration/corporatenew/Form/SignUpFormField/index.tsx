import {useField} from 'formik'
import { IField } from 'types/types'
import SignUpForm from './Form'
import { useAuthContext } from 'context/auth_state'
import { AuthRegisterFormData } from 'data/intefaces/IAuth'


interface Props<T> extends IField<T> {
  onSubmit: () => void
}

export default function SignUpFormField(props: Props<string>) {

  const [field, meta, helpers] = useField<string>(props)

  const authContext = useAuthContext()

  const handleSubmit =  async (data: AuthRegisterFormData) => {
    helpers.setValue(data.email)
    authContext.signUp(data)
    props.onSubmit()
  }

  return (
    <SignUpForm onSubmit={handleSubmit}/>
  )
}
