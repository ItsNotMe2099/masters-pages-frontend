import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import {IRootState} from 'types'
import Card from 'components/PublicProfile/components/Card'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import CardLinksForm from 'components/PublicProfile/components/view/CardLinks/Form'
import Loader from 'components/ui/Loader'
import { useTranslation } from 'next-i18next'
import { IOrganization } from 'data/intefaces/IOrganization'
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import { useState } from 'react'

interface Props{
  isEdit: boolean
  organization: IOrganization
}

interface PropsLink{
  type: string
  link: string
}
const CardLinks = (props: Props) => {
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

  const SocialLink = (props: PropsLink) => {
    const imgSource = `/img/CardLinks/icons/${props.type}.svg`
    return(
      <div className={styles.link}>
        <img src={imgSource} alt=''/>
        <a href={`http://${props.link}`} target='_blank'>{props.type}</a>
      </div>
    )
  }

  return (
    <Card isHidden={!isEdit && !organization.about} className={styles.root} isLoading={showForm && formLoading} title={t('personalArea.profile.visitUs')} toolbar={<FormActionButton type={'edit'} title={t('edit')} onClick={handleEditClick}/>}>
      {!showForm ? <div className={styles.links}>
        {organization.socialLinks.map(item =>
          item.link && <SocialLink type={item.type} link={item.link}/>
        )}</div>
         : <CardLinksForm organization={organization} handleSubmit={handleSubmit} onCancel={handleCancel}/>}
      {showForm && formLoading && <div className={styles.loader}><Loader/></div>}
    </Card>
  )
}

export default CardLinks
