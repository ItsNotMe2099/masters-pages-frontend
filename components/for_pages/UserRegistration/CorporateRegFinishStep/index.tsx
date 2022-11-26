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
import HiddenXs from "components/ui/HiddenXS";
import QuestionPopover from "components/ui/QuestionPopover";
import SwitchField from "components/fields/SwitchField";
import VisibleXs from "components/ui/VisibleXS";
import PasswordField from "components/fields/PasswordField";
import CheckBoxField from "components/fields/CheckBoxField";
import FormError from "components/ui/Form/FormError";


interface Props {

}

export default function CorporateRegFinishStep(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        THANK YOU FOR THE APPLICATION
      </div>
      <div className={styles.illustration}><img src='/img/Registration/new/corp/success.svg' alt=''/></div>
      <div className={styles.text}>Regular application processing time is 2 business days. <br/>
        <div>We will review the application and notify you once your account is open.</div></div>
      <div className={styles.btns}>
        <div className={styles.wrapper}>
          <Button
            type='button'
            href='/guestpage'
            className={styles.btn}>
            Guest access<NextSvg/>
          </Button>
          <div className={styles.desc}>
            Search volunteers
          </div>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.wrapper}>
          <Button
            type='button'
            href='/corporate'
            className={styles.btn}>
            Organizations site<NextSvg/>
          </Button>
          <div className={styles.desc}>
            Tutorial, videos and sample profiles
          </div>
        </div>
      </div>
    </div>
  )
}
