import FormError from 'components/ui/Form/FormError'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from 'types'
import styles from './index.module.scss'
import {required, phone} from 'utils/validations'
import {connect, useDispatch, useSelector} from 'react-redux'
import { useTranslation } from 'next-i18next'
import InputPhone from '../../../ui/Inputs/InputPhone'
import MainSectionButton from 'components/for_pages/MainUserPage/Button'
import {useAuthContext} from 'context/auth_state'
import {RadioList} from "components/ui/Inputs/RadioList";
import * as React from "react";
import PostForm from "components/Follower/PostModal/PostForm";
import Input from "components/ui/Inputs/Input";
import {PWRecoveryOpen, signUpOpen} from "components/Modal/actions";
import {useRouter} from "next/router";

let SignIn = props => {
  const { t } = useTranslation('common')
  const { handleSubmit} = props
  const authContext = useAuthContext();
  const error = authContext.error;
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="mode"
        component={RadioList}
        grid={2}
        size={'small'}
        labelType="placeholder"
        label={'Mode'}
        options={[
          {label: 'Individual', value: 'phone'},
          {label: 'Corporate', value: 'email'}
        ]}
      />
      {props.mode === 'email' && <Field
        name="login"
        component={Input}
        label={'Email'}
        validate={[required]}
        labelType={'cross'}
      />}
      {props.mode === 'phone' && <Field
        name="login"
        component={InputPhone}
        label={t('auth.signIn.fieldLogin')}
        validate={[required, phone]}
        labelType={'cross'}
      />}
      <Field
        name="password"
        component={InputPassword}
        label={t('auth.signIn.fieldPassword')}
        validate={required}
        labelType={'cross'}
      />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
      <MainSectionButton onClick={handleSubmit} size={'small'}>{t('auth.signIn.title')}</MainSectionButton>
      </div>
      <div className={styles.forgot}>
        <div><a onClick={() => dispatch(PWRecoveryOpen())}> {t('auth.signIn.forgotPassword')}</a></div>
      </div>
      <div className={styles.signUp}>
        <div>{t('auth.signIn.dontHaveAccount')}</div>
        <div><a onClick={() => router.push(props.mode === 'email' ? '/registration/corporate' : '/registration/email')}>{t('auth.signUpLink')}</a></div>
      </div>
    </form>
  )
}

SignIn = reduxForm ({
  form: 'signIn',
}) (SignIn)

const selector = formValueSelector('signIn')
SignIn = connect(state =>
  {
    const mode = selector(state, 'mode')

    return {mode}
  }
)(SignIn)
export default SignIn
