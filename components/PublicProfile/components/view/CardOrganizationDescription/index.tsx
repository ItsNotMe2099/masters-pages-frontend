import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import {IRootState} from 'types'
import Card from 'components/PublicProfile/components/Card'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import CardDescriptionForm from 'components/PublicProfile/components/view/CardOrganizationDescription/Form'
import Loader from 'components/ui/Loader'
import { useTranslation } from 'next-i18next'
import { IOrganization } from 'data/intefaces/IOrganization'
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import { useState } from 'react'
import Button from '../../Button'
import { getMediaPath, isMediaImage, isMediaVideo } from 'utils/media'
import Player from 'components/ui/video/Player'

interface Props{
  isEdit: boolean
  organization: IOrganization
  onOrganizationUpdate: () => void
}

const CardOrganizationDescription = (props: Props) => {
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
    await OrganizationRepository.updateOrganizationData(organization.id, {...data, visible: true})
    setShowForm(false)
    onOrganizationUpdate && onOrganizationUpdate()
  }

  const fileName = (file: string) => {
    const name = file.split('.').splice(0, 1)
    return name
  }

  const getImageSrc = (file: string) => {

    const srcValue = file
    if(!srcValue){
      return
    }
    const extension = srcValue.split('.').pop().toUpperCase()
    //return `${srcValue.indexOf('blob:') === 0 ? srcValue : (`${process.env.NEXT_PUBLIC_API_URL || ''}/api/s3/${srcValue}`)}`
    switch(extension){
      case 'TXT':
        return '/img/DocField/doc.svg'
      case 'DOC':
        return '/img/DocField/doc.svg'
      case 'PDF':
        return '/img/DocField/pdf.svg'
    }
  }

  const webSiteLink = organization?.socialLinks?.find(item => item.type === 'web')
  const instLink = organization?.socialLinks?.find(item => item.type === 'instagram')

  return (
    <Card isHidden={!isEdit && !organization.description} className={styles.root} isLoading={showForm && formLoading} title={t('personalArea.profile.desc')} toolbar={isEdit ? <FormActionButton type={'edit'} title={t('edit')} onClick={handleEditClick}/> : null}>
      {!showForm ? 
        <div className={styles.desc}>
          <div className={styles.left}>
            <div className={styles.text}>{organization.description?.description}</div>
            {organization.attachmentsObjects?.length > 0 &&
            <div className={styles.attachments}>
              {organization.attachmentsObjects?.map(item => 
                  <a className={styles.item} href={getMediaPath(item.urlS3)} download={fileName(item.name || item.urlS3)}><div className={styles.image}><img src={getImageSrc(item.urlS3)} alt=''/></div><span>{item.name}</span></a>
              )}
            </div>}
            <div className={styles.btns}>
              {webSiteLink?.link && <Button projectBtn='default' href={webSiteLink?.link}>VISIT WEBSITE</Button>}
              {instLink?.link && <Button projectBtn='default' href={instLink?.link}>INSTAGRAM</Button>}
            </div>
            </div>
            {organization.photo && <div className={styles.right}>
            {(organization.photo && isMediaVideo(organization.photo)) && <div className={styles.video}>
            <Player className={styles.player}
            source={getMediaPath(organization.photo)}/></div>}
          {(organization.photo && isMediaImage(organization.photo)) && <img className={styles.image} src={getMediaPath(organization.photo)} />}
              </div>}
          </div>
         : <CardDescriptionForm organization={organization} handleSubmit={handleSubmit} onCancel={handleCancel}/>}
      {showForm && formLoading && <div className={styles.loader}><Loader/></div>}
    </Card>
  )
}

export default CardOrganizationDescription
