import Input from "components/ui/Inputs/Input";
import BaseInput from "components/ui/Inputs/Input/components/BaseInput";
import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import { useState } from 'react'
import styles from './index.module.scss'

interface Props {
  label: string
  meta: any
  input: string
  type: string
}

export default function InputPassword(props: Props) {
  const [isShown, setIsShown] = useState(false)
  return (
    <Input {...props} type={isShown ? 'text' :'password'} icon={
      isShown ?
        (<a onClick={() => setIsShown(false)}><img src='img/field/show.svg' alt=''/></a>)
        :
        (<a onClick={() => setIsShown(true)}><img src='img/field/hide.svg' alt=''/></a>)
    }/>
  )
}
