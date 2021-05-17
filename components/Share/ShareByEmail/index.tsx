import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import ShareByEmailForm from 'components/Share/ShareByEmail/Form'
import {shareByEmailRequest} from 'components/Share/actions'

interface Props {
  subCategoryId?: number
}

export default function ShareByEmail(props: Props) {
  const dispatch = useDispatch()

  const handleSubmit = (data) => {
    dispatch(shareByEmailRequest(data));
  }
  return (
    <div className={styles.root}>
      <ShareByEmailForm onSubmit={handleSubmit}/>
    </div>
  )
}
