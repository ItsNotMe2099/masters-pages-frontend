import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import {IRootState} from 'types'
import Card from 'components/PublicProfile/components/Card'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import CardDescriptionForm from 'components/PublicProfile/components/view/CardDescription/Form'
import Loader from 'components/ui/Loader'
import { useTranslation } from 'next-i18next'
import { IOrganization } from 'data/intefaces/IOrganization'
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import { useState } from 'react'
import Button from '../../Button'
import { getMediaPath } from 'utils/media'

interface Props{
  isEdit: boolean
  organization: IOrganization
}

const CardDescription = (props: Props) => {
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)
  const [showForm, setShowForm] = useState(false)
  const {isEdit} = props
  const {t} = useTranslation('common')
  const [organization, setOrganization] = useState(props.organization)

  const handleEditClick = () => {
    setShowForm(true)
  }
  const handleCancel = () => {
    setShowForm(false)
  }

  const handleSubmit = async (data) => {
    await OrganizationRepository.updateOrganizationData(organization.id, data)
    setShowForm(false)
    OrganizationRepository.fetchCurrentOrganization().then((data) => {
      if(data){
        setOrganization(data)
      }
    })
  }

  const webSiteLink = organization.socialLinks.filter(item => item.type === 'web')
  const instLink = organization.socialLinks.filter(item => item.type === 'instagram')

  return (
    <Card isHidden={!isEdit && !organization.about} className={styles.root} isLoading={showForm && formLoading} title={t('personalArea.profile.desc')} toolbar={<FormActionButton type={'edit'} title={t('edit')} onClick={handleEditClick}/>}>
      {!showForm ? 
        <div className={styles.desc}>
          <div className={styles.left}>
            <div className={styles.text}>{organization.description.description}</div>
            <div className={styles.attachments}>
              {organization.attachments.map(item => 
                <div></div>
              )}
            </div>
            <div className={styles.btns}>
              <Button projectBtn='default' href={webSiteLink[0].link}>VISIT WEBSITE</Button>
              <Button projectBtn='default' href={instLink[0].link}>INSTAGRAM</Button>
            </div>
            </div>
            <div className={styles.right}><img src={getMediaPath(organization.photo)} alt=''/></div>
          </div>
         : <CardDescriptionForm organization={organization} handleSubmit={handleSubmit} onCancel={handleCancel}/>}
      {showForm && formLoading && <div className={styles.loader}><Loader/></div>}
    </Card>
  )
}

export default CardDescription
