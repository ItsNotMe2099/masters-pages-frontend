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
import ProfileRegistration from "components/for_pages/Registration/ProfileRegistration";
interface Props {
  role: ProfileRole
  onNextStep: (data?: any) => void
  onBack: () => void
}

export default function UserRegProfileDetailsStep(props: Props) {
  const handleRoleClick = (role: ProfileRole) => {
    props.onNextStep({role})
  }

  return (
  <div className={styles.root}>
    <ProfileRegistration role={props.role} onBackClick={props.onBack}/>
  </div>
  )
}
