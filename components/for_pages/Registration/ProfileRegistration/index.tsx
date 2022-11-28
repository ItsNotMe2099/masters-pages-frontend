import {ProfileRole} from 'data/intefaces/IProfile'
import styles from './index.module.scss'
import classNames from 'classnames'
import InputCategoryFormField from 'components/fields/InputCategoryFormField'
import TextField from 'components/fields/TextField'
import HiddenXs from 'components/ui/HiddenXS'
import QuestionPopover from 'components/ui/QuestionPopover'
import SwitchField from 'components/fields/SwitchField'
import BackButton from 'components/BackButton'
import Button from 'components/ui/Button'
import NextSvg from 'components/svg/NextSvg'
import {LabelStyleType} from 'types/types'
import Validator from 'utils/validator'
import {getImage} from 'utils/profileRole'
import {useDispatch} from 'react-redux'
import {modalFormOpen} from 'components/Modal/actions'
import {Form, FormikProvider, useFormik} from 'formik'
import {useState} from "react";
import ProfileRepository from "data/repositories/ProfileRepostory";
import {useAppContext} from "context/state";
import FormError from "components/ui/Form/FormError";
import {useRouter} from "next/router";
import slugify from "slugify";

interface Props {
  role: ProfileRole
  onBackClick?: () => void
}

export default function ProfileRegistration(props: Props) {
  const appContext = useAppContext();
  const router = useRouter()
  const [error, setError] = useState(null)
  const [sending, setSending] = useState(false)
  const handleSubmit = async (data) => {
      console.log("Submit", data)
    setError(null)
    setSending(true)
    try{
        const res = await ProfileRepository.create(props.role, {
          slug: data.slug,
          firstName: appContext.user.firstName,
          lastName: appContext.user.lastName,
          email: appContext.user.email,
          phone: appContext.user.phone,
          ...(data?.categories?.subCategory ? {
            preferredSubCategories: [data?.categories.subCategory.id]
          } : {})
        });
        await appContext.updateRole(props.role);

      router.push('/me')
    }catch (e) {
      setError(e);
    }
    setSending(false)
  }
  const getClass = (role: ProfileRole) => {
    return classNames(
      {
        [styles?.master]: role === ProfileRole.Master,
        [styles?.volunteer]: role === ProfileRole.Volunteer,
        [styles?.client]: role === ProfileRole.Client
      }
    )
  }

  const formik = useFormik({
    initialValues: {
      slug: appContext?.user?.firstName ? `${slugify(appContext.user.firstName)}-${slugify(appContext.user.lastName)}` : '',
      categories: {
        "mainCategory": {
          "id": 7855,
          "createdAt": "2022-09-05T10:00:13.642Z",
          "updatedAt": "2022-09-05T10:00:13.642Z",
          "iconUrl": null,
          "color": null,
          "isMain": true,
          "isGeneral": false,
          "importId": null,
          "parentId": null,
          "sort": 0,
          "deletedAt": null,
          "translations": [
            {
              "id": 15712,
              "createdAt": "2022-09-05T10:00:13.642Z",
              "updatedAt": "2022-09-05T10:00:13.642Z",
              "languageCode": "en",
              "name": "General",
              "description": "General",
              "baseId": 7855
            }
          ],
          "languageCode": "en",
          "name": "General",
          "description": "General",
          "baseId": 7855
        },
        "category": {
          "id": 7856,
          "createdAt": "2022-09-05T10:02:28.101Z",
          "updatedAt": "2022-09-05T10:02:28.101Z",
          "iconUrl": null,
          "color": null,
          "isMain": false,
          "isGeneral": false,
          "importId": null,
          "parentId": 7855,
          "sort": 0,
          "deletedAt": null,
          "translations": [
            {
              "id": 15713,
              "createdAt": "2022-09-05T10:02:28.101Z",
              "updatedAt": "2022-09-05T10:02:28.101Z",
              "languageCode": "en",
              "name": "General",
              "description": "General",
              "baseId": 7856
            }
          ],
          "languageCode": "en",
          "name": "General",
          "description": "General",
          "baseId": 7856
        },
        "subCategory": {
          "id": 7857,
          "createdAt": "2022-09-05T10:02:41.705Z",
          "updatedAt": "2022-09-05T10:02:41.705Z",
          "iconUrl": null,
          "color": null,
          "isMain": false,
          "isGeneral": false,
          "importId": null,
          "parentId": 7856,
          "sort": 0,
          "deletedAt": null,
          "translations": [
            {
              "id": 15715,
              "createdAt": "2022-09-05T10:02:41.705Z",
              "updatedAt": "2022-09-05T10:02:41.705Z",
              "languageCode": "en",
              "name": "General",
              "description": "General",
              "baseId": 7857
            }
          ],
          "languageCode": "en",
          "name": "General",
          "description": "General",
          "baseId": 7857
        },
        "id": ""
      },
      published: true
    },
    onSubmit: handleSubmit
  })

  const dispatch = useDispatch()

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={classNames(styles.final, getClass(props.role))}>
          <div className={styles.illustration}><img src={getImage(props.role)} alt=''/></div>
          <div className={styles.label}>{props.role} mode</div>
          {props.role !== ProfileRole.Client ?
            <div className={styles.id}>
              <InputCategoryFormField setFieldValue={(id) => null} label='Profile' name='categories'
                                      validate={Validator.categories}/>
              <HiddenXs>
                <QuestionPopover
                  info={'You can keep your activities in one GENERAL profile or you can add additional profiles for each professional category that you prefer to distinguish with separate descriptions and statistics. We suggest to start with the "general" profile and add new additional profiles later when needed in the PROFILE menu.'}
                  className={styles.question}/></HiddenXs>
            </div> : null
          }
          <div className={styles.id}>
            <TextField
              editable
              onClick={() => dispatch(modalFormOpen())}
              className={styles.altField}
              name='slug' label='MastersPages.com ID' labelType={LabelStyleType.Cross} validate={Validator.required}/>
            <HiddenXs>
              <QuestionPopover info={'It will become your address in the format http://www.masterspages.com/orgid'}
                               className={styles.question}/></HiddenXs>
          </div>
          <SwitchField name='published' label='Searchable' className={styles.switch}/>
          <FormError error={error}/>
          <div className={styles.btns}>
            {props.onBackClick && <BackButton onClick={props.onBackClick} role={props.role}/>}
            <Button
              disabled={sending}
              type={'submit'}
              className=
                {classNames(styles.btn)}>
              Create profile<NextSvg/>
            </Button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  )
}
