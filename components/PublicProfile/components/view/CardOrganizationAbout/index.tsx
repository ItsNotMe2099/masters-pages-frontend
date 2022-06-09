import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import {IRootState} from 'types'
import Card from 'components/PublicProfile/components/Card'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import CardAboutForm from 'components/PublicProfile/components/view/CardOrganizationAbout/Form'
import Loader from 'components/ui/Loader'
import { useTranslation } from 'next-i18next'
import { IOrganization } from 'data/intefaces/IOrganization'
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import { useState } from 'react'

interface Props{
  isEdit: boolean
  organization: IOrganization
  onOrganizationUpdate: () => void
}
const CardOrganizationAbout = (props: Props) => {
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)
  const [showForm, setShowForm] = useState(false)
  const {isEdit, organization, onOrganizationUpdate} = props
  const {t} = useTranslation('common')

  const handleEditClick = () => {
    setShowForm(true)
  }
  const handleCancel = () => {
    setShowForm(false)
  }

  const handleSubmit = async (data) => {
    await OrganizationRepository.updateOrganizationData(organization.id, data)
    setShowForm(false)
    onOrganizationUpdate && onOrganizationUpdate()
  }

  return (
    <Card isHidden={!isEdit && !organization.about} className={styles.root} isLoading={showForm && formLoading} title={t('personalArea.profile.about')} toolbar={isEdit ? [<FormActionButton type={organization.about?.about ? 'edit' : 'create'} title={organization.about?.about ? t('edit') : t('add')} onClick={handleEditClick}/>] : []}>
      {!showForm ? <div className={styles.bioText}>{organization.about?.about && organization.about?.about}</div> : <CardAboutForm organization={organization} handleSubmit={handleSubmit} onCancel={handleCancel}/>}
      {showForm && formLoading && <div className={styles.loader}><Loader/></div>}
    </Card>
  )
}

export default CardOrganizationAbout
