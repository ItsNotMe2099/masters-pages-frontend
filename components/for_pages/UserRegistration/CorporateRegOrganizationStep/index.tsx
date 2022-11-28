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
import slugify from "slugify";


interface Props {
  onNextStep: () => void
  initialData?: any
}

export default function CorporateRegOrganizationStep(props: Props) {

  const [isLoading, setIsLoading ] = useState(false)
  const [error, setError] = useState(null)

  const appContext = useAppContext()

  const handleSubmit = async (data) => {
    setError(null)
    setIsLoading(true);
    try {
      const res = await AuthRepository.completeRegistration(data)
      reachGoal('auth:signup:completed')
      await appContext.updateUser()
      await appContext.updateRole(ProfileRole.Corporate)
      props.onNextStep()

    }catch (e){
      setError(e)
    }
    setIsLoading(false)
  }

  const [step, setStep] = useState<number>(1)

  const initialValues = {
    ...props.initialData,
    organization: {
      name: '',
      site: '',
      published: true
    },
    slug: '',
    password: '',
    passwordConfirm: '',
    terms: false
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const authContext = useAuthContext()

  console.log('formik.values', formik.values)

  const isOk = true //temp

  useEffect(() => {
    const result = formik.values.phoneExtension.replace(/\D/g, '').slice(0, 5)
    formik.setFieldValue('slug', slugify(formik.values.name?.toLowerCase()));
  }, [formik.values.organization.name])

  console.log('phoneExtension', formik.values.phoneExtension)

  return (
    <FormikProvider value={formik}>
      <div className={styles.title}>
        Organization account application
      </div>
      <Form className={styles.form}>

        <div className={styles.steps}>
          <img src='/img/Registration/new/corp/steps-line-step3.svg' alt=''/>
        </div>
        <div className={styles.illustration}><img src='/img/Registration/new/corp/step3.svg' alt=''/></div>
        <div className={styles.text}>Almost done.</div>
        <TextField
          className={styles.field}
          name='organization.name' label='Organization name' labelType={LabelStyleType.Cross} validate={Validator.required}/>
        <TextField
          className={styles.altField}
          name='organization.site' label='Organization website' labelType={LabelStyleType.Cross} validate={Validator.required}/>
        <div className={styles.id}>
          <TextField
            className={styles.altField}
            name='slug' label='MastersPages.com ID' labelType={LabelStyleType.Cross} validate={Validator.required}/>
          <HiddenXs>
            <QuestionPopover info={'It will become your address in the format http://www.masterspages.com/orgid'}
                             className={styles.question}/></HiddenXs>
        </div>
        <div className={styles.id}>
          <SwitchField name='organization.published' label='Searchable' className={styles.switch}/>
          <VisibleXs>
            <QuestionPopover info={'It will become your address in the format http://www.masterspages.com/orgid'}
                             className={styles.question}/>
          </VisibleXs>
        </div>
        <PasswordField
          className={styles.field}
          name='password'
          label='Create password'
          labelType={LabelStyleType.Cross}
          validate={Validator.required}
        />
        <PasswordField
          className={styles.altField}
          name='passwordConfirm'
          label='Re-type password'
          labelType={LabelStyleType.Cross}
          validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(formik.values)])}
        />
        <CheckBoxField className={styles.checkbox} name={'terms'} validate={Validator.required} label={<div className={styles.terms}>
          Accept <a href='/Terms'>Terms & Conditions</a>
        </div>}/>
        <FormError error={error}/>
        <div className={styles.btns}>
          <BackButton onClick={() => setStep(step => step - 1)}/>
          <Button
            className=
              {classNames(styles.btn,
                {[styles.active]: formik.values.organization.name !== '' &&
                  formik.values.organization.id !== '' &&
                  formik.values.organization.site !== '' &&
                  formik.values.password === formik.values.passwordConfirm &&
                  formik.values.terms})}
            disabled=
              {formik.values.organization.name === '' &&
                formik.values.organization.id === '' &&
                formik.values.organization.site === '' &&
                formik.values.password !== formik.values.passwordConfirm &&
                !formik.values.terms}>
            Send aplication<NextSvg/>
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
