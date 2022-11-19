import styles from './index.module.scss'
import {useField} from 'formik'
import { IField } from 'types/types'
import SignUpForm from './Form'
import { useAuthContext } from 'context/auth_state'


interface Props<T> extends IField<T> {
  onSubmit: () => void
}

export default function SignUpFormField(props: Props<any[]>) {

  const [field, meta, helpers] = useField<any[]>(props)

  const authContext = useAuthContext()

  const handleSubmit =  async (data) => {
    helpers.setValue([...(field.value || []), data])
    authContext.signUp(data)
    props.onSubmit()
  }

  return (
    <SignUpForm onSubmit={handleSubmit}/>
  )
}
