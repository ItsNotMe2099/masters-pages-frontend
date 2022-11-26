import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from 'context/auth_state'
import Button from 'components/ui/Button'
import TextField from 'components/fields/TextField'
import { LabelStyleType } from 'types/types'
import Validator from 'utils/validator'
import PhoneField from 'components/fields/PhoneField'
import classNames from 'classnames'
import AuthRepository from 'data/repositories/AuthRepository'
import { reachGoal } from 'utils/ymetrika'
import { useAppContext } from 'context/state'
import { ProfileRole } from 'data/intefaces/IProfile'
import NextSvg from 'components/svg/NextSvg'
import BackButton from 'components/BackButton'
import SwitchField from "components/fields/SwitchField";
import PasswordField from "components/fields/PasswordField";
import CheckBoxField from "components/fields/CheckBoxField";
import ModeField from "components/fields/ModeField";
import {getImage} from "utils/profileRole";
import FieldError from "components/ui/FieldError";
interface ItemProps {
  role: ProfileRole
  onClick: (role: ProfileRole) => void
}
const Item = (props: ItemProps) => {

  const getClass = (role: ProfileRole) => {
    return classNames(
      {
        [styles.master]: role === ProfileRole.Master,
        [styles.volunteer]: role === ProfileRole.Volunteer,
        [styles.client]: role === ProfileRole.Client
      }
    )
  }

  return (
    <div className=
           {classNames(styles.item, getClass(props.role))}
         onClick={() => props.onClick(props.role)}>
      <div className={styles.img}>
        <img src={getImage(props.role)} alt=''/>
      </div>
      <Button className={classNames(styles.btn)}

              onClick={() => props.onClick(props.role)}
      >
        {props.role} mode <NextSvg/>
      </Button>
    </div>
  )
}
interface Props {
  onNextStep: (data?: any) => void
}

export default function UserRegProfileRoleStep(props: Props) {
  const handleRoleClick = (profileRole: ProfileRole) => {
    props.onNextStep({profileRole})
  }

  return (
  <div className={styles.root}>
    <div className={styles.title}>
      New Profile
    </div>
    <div className={styles.text}>Your MastersPages account has 3 modes. You<br/> can switch between modes at any time.</div>
    <div className={styles.choose}>
      CHOOSE YOUR STARTING MODE
    </div>
    <div className={styles.modes}>
        <Item role={ProfileRole.Master} onClick={handleRoleClick}/>
        <Item role={ProfileRole.Client} onClick={handleRoleClick}/>
        <Item role={ProfileRole.Volunteer} onClick={handleRoleClick}/>
    </div>
  </div>
  )
}
