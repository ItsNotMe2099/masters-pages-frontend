import Input from "components/ui/Inputs/Input";
import * as React from "react";
import { Field, reduxForm,formValueSelector } from 'redux-form'
import { required } from "utils/validations";
import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {useTranslation} from "react-i18next";
import Button from 'components/ui/Button'
import {IRootState} from 'types'
import Logo from 'components/Logo'
import FormError from 'components/ui/Form/FormError'
import {resetInviteForm} from 'components/Invite/actions'

const queryString = require('query-string')
interface Props {
  customLink?: string
  subCategoryId?: number,
  onSubmit?
  handleSubmit?
  reset?
}
let InviteForm = (props: Props) => {
  const {t} = useTranslation('common')
  const dispatch = useDispatch()

  const { handleSubmit, subCategoryId, reset, customLink } = props
  const error = useSelector((state: IRootState) => state.invite.formError);
  const loading = useSelector((state: IRootState) => state.invite.formLoading);
  const success = useSelector((state: IRootState) => state.invite.formIsSuccess);

  const profile = useSelector((state: IRootState) => state.profile.currentProfile);
  const inviteUrl = `${ typeof window !== 'undefined' ? window?.location.protocol + "//" + window?.location.host : '/'}/${subCategoryId ? `sk${subCategoryId}` : `id${profile.id}${customLink ? `/${customLink}` : ''}`}`;
  const handleReset = () => {
    reset()
    dispatch(resetInviteForm());
  }
  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div className={styles.background}><img src={'/img/icons/envelope.svg'}/></div>
    <div className={styles.container}>
      {success && <div className={styles.success}>
        <div className={styles.successText}>{profile.role === 'client' ? t('shareByEmail.masterInvited') : t('shareByEmail.clientInvited') }</div>
        <div className={styles.btnContainer}>
          <Button type={'button'} red size="14px 65px" onClick={handleReset}>{t('shareByEmail.inviteAnother')} {profile.role === 'client' ? 'master' : 'client' }</Button>
        </div>
      </div>}
      {!success && <div className={styles.form}>
        <div className={styles.formWrapper}>

      <div className={styles.fields}>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>{t('shareByEmail.mailTo')}</div>
        <div className={styles.fieldValue}>
        <Field
          name="email"
          size={'small'}
          disabled={loading}
          noMargin={true}
          placeholder={t('email')}
          component={Input}
          validate={required}
        />
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>{t('subject')}</div>
        <div className={styles.fieldValue}>
        {t('shareByEmail.invitesYou')}
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>{t('shareByEmail.dear')}</div>
        <div className={styles.fieldValue}>

        <Field
          name="name"
          size={'small'}
          disabled={loading}
          noMargin={true}
          placeholder={'Name'}
          component={Input}
          validate={required}
        />
        </div>
      </div>
        </div>
      <div className={styles.message}>
        {profile.firstName} {profile.lastName} {profile.role === 'client' ? 'would like to invite you to join him/her on MastersPages and see you among his/hers valued clients.' : 'would like to invite you see his/hers profile on MastersPages.'}<br/>
        •  {t('shareByEmail.toSee')} <a href={inviteUrl} target={'_blank'}> {profile.firstName} {profile.lastName} </a>{t('shareByEmail.profile')}<br/>
        •  {t('shareByEmail.toLearn')} <a href='masterspages.com' target={'_blank'}>MastersPages</a><br/>
        •  {t('shareByEmail.ifYouGot')} <a href={'mailto:abuse@masterspages.com'}>abuse@masterspages.com</a>.<br/>
        <br/>
        {t('shareByEmail.trulyYours')}<br/>
        <div className={styles.logo}><Logo/></div>
        {t('shareByEmail.selfEmployed')}
      </div>
          <FormError error={error}/>
        <div className={styles.btnContainer}>
          <Button disabled={loading} red size="14px 65px">{t('shareByEmail.invite')} {profile.role === 'client' ? 'master' : 'client' }</Button>
        </div>

      </div>
      </div>}
    </div>

      </form>
  )
}

InviteForm   = reduxForm ({
  form: 'InviteForm',
}) (InviteForm )

const selector = formValueSelector('InviteForm') // <-- same as form name
export default InviteForm
