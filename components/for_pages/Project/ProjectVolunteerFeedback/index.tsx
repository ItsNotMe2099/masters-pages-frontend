import Modal from 'components/ui/Modal'
import * as React from 'react'
import {useState} from 'react'
import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {useProjectContext} from "context/project_state";
import {Form, FormikProvider, useFormik} from "formik";
import TextAreaField from "components/fields/TextAreaField";
import Validator from "utils/validator";
import Button from "components/PublicProfile/components/Button";
import RatingField from "components/fields/RatingField";
import FeedbackRepository from "data/repositories/FeedbackRepository";
import FormError from "components/ui/Form/FormError";
import {SnackbarType} from "types/enums";
import {confirmChangeData, confirmModalClose, confirmOpen} from "components/Modal/actions";
import {taskCancel} from "components/TaskUser/actions";
import ApplicationRepository from "data/repositories/ApplicationRepository";
import {useDispatch} from "react-redux";

interface Props {
  projectId: number
}
export const ProjectVolunteerFeedbackModal = (props: Props) => {
  const appContext = useAppContext()
  const projectContext = useProjectContext()

  const args = projectContext.modalArguments;
  const [sending, setSending] = useState<boolean>(false)
  const [error, setError] = useState<string | string[]>(null)
  const dispatch = useDispatch()
  const handleSubmit = async (data) => {
    setError(null)
    try {
      const res = args.feedback ?  await FeedbackRepository.update(args.feedback.id, data) :  await FeedbackRepository.createForMaster({...data, projectId: props.projectId, toProfileId: args.profileId, applicationId: args.applicationId});

      if(args.feedback){
        appContext.feedbackUpdateState$.next(res)
      }else{
        appContext.feedbackCreateState$.next(res)
      }
      projectContext.hideModal();
      appContext.showSnackbar('Your review saved', SnackbarType.success);
    }catch (e) {
      setError(e)
    }
    setSending(false)
  }
  const handleDelete = () => {
    dispatch(confirmOpen({
      description: 'Do you want to delete your review?',
      onConfirm: async () => {
        dispatch(confirmChangeData({loading: true}))
        await FeedbackRepository.delete(args.feedback.id);
        appContext.feedbackDeleteState$.next(args.feedback)
        dispatch(confirmModalClose())
        projectContext.hideModal();
        appContext.showSnackbar('Your review deleted', SnackbarType.success);
      }
    }))
  }
  const initialValues = {
    mark: args?.feedback?.mark ?? null,
    description: args?.feedback?.description ?? null,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  return (
    <Modal size={'medium'} isOpen className={styles.modal} onRequestClose={() => projectContext.hideModal()} loading={false} closeClassName={styles.modalClose}>
      <FormikProvider value={formik}>
        <Form className={styles.root}>
          <RatingField name={'mark'} />
          <div className={styles.text}>

          <TextAreaField name={'description'} placeholder={'Type your review'} validate={Validator.required}/>

          </div>
          <FormError error={error}/>
          <div className={styles.buttons}>

              <Button size={'small'} disabled={sending} color={'red'} type={'submit'}>{args?.feedback ? 'Update Review' : 'Submit Review'}</Button>
            <Button onClick={handleDelete} projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>

          </div>
        </Form>
      </FormikProvider>
    </Modal>
  )
}
