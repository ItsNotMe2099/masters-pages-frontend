import {IRootState, SkillData} from 'types'
import CardSalesPitch from 'components/PublicProfile/components/view/CardSalesPitch'
import CardWorkExperience from 'components/PublicProfile/components/view/CardWorkExperience'
import CardPortfolio from 'components/PublicProfile/components/view/CardPortfolio'
import CardGallery from 'components/PublicProfile/components/view/CardGallery'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {fetchSkillList} from 'components/Skill/actions'
import CardCategorySelector from 'components/PublicProfile/components/view/CardCategorySelector'
import {formatSkillList} from 'utils/skills'
import {fetchProfileTabList} from 'components/ProfileTab/actions'
import {setCurrentSkill} from 'components/Profile/actions'
import {useRouter} from 'next/router'
import CardProfileStat from 'components/PublicProfile/components/view/CardProfileStat'
import CardDescription from 'components/PublicProfile/components/view/CardDescription'
import ProfilePageLayout from 'components/PublicProfile/components/ProfilePageLayout'
import CardReviews from 'components/PublicProfile/components/view/CardReviews'
import CardRecommendations from 'components/PublicProfile/components/view/CardRecommendations'
import CardPosts from 'components/PublicProfile/components/view/CardPosts'
import {IProfile} from 'data/intefaces/IProfile'
import {useAppContext} from 'context/state'
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import { IOrganization } from 'data/intefaces/IOrganization'
import ProjectRepository, { IProjectSearchRequest } from 'data/repositories/ProjectRepository'
import { IProject, ProjectStatus } from 'data/intefaces/IProject'
import Loader from 'components/ui/Loader'
import ProjectCard from 'components/for_pages/Project/ProjectCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './index.module.scss'
import ProjectModal from 'components/for_pages/Project/ProjectModal'

interface Props {
  profile: IProfile,
  skill: SkillData,
  showType: 'reviews' | 'recommendations' | 'profile' | 'news'
}

const PublicProfile = (props) => {
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const currentProfile = appContext.profile
  const isEdit = currentProfile && currentProfile.id === props.profile.id
  const profile = isEdit ? currentProfile : props.profile
  const [category, setCategory] = useState(null)
  const [organization, setOrganization] = useState<IOrganization | null>(null)
  const reduxSkill = useSelector((state: IRootState) => state.profile.currentSkill)
  const currentSkill = isEdit ? reduxSkill ||  props.skill : props.skill
  const categoriesCurrentProfile = useSelector((state: IRootState) => state.skill.list)
  const [loading, setLoading] = useState<boolean>(true)
  const [projects, setProjects] = useState<IProject[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [currentProject, setCurrentProject] = useState<IProject | null>(null)
  const [initialProjectTab, setInitialProjectTab] = useState<string | null>(null)

  const categories = isEdit ? categoriesCurrentProfile : formatSkillList(profile.skills)
  const router = useRouter()
  console.log(router)
  useEffect(() => {
    if(currentSkill && isEdit){

      for (const category of categories) {
        const exists = category.skills.find(skill => skill.id === currentSkill.id)
        if (exists) {
          setTimeout(() => {
            dispatch(setCurrentSkill(exists))
            setCategory(category)
          }, 100)

          return
        }

      }
    }
  }, [categories])
  useEffect(() => {
    if (!currentSkill) {
      return
    }
    dispatch(fetchProfileTabList({
      profileId: profile.id,
      categoryId: currentSkill.categoryId,
      subCategoryId: currentSkill.subCategoryId
    }))
  }, [currentSkill])

  useEffect(() => {
    if(!currentSkill){
      return
    }
    const subCategoryId = currentSkill.subCategoryId


    const categories = formatSkillList(profile.skills)
    console.log('UseEffect1',subCategoryId, currentSkill, categories.length)
    if (currentSkill && categories.length > 0) {


      for (const category of categories) {
        const exists = category.skills.find(skill => skill.subCategoryId === subCategoryId)

        if (exists) {
          console.log('UseEffect2', exists)
          dispatch(setCurrentSkill(exists))
          setCategory(category)

          break
        }
        console.log('UseEffect3',subCategoryId, category)

      }
    }
  }, [props.skill])

  console.log('PRO', currentProfile)


  useEffect(() => {
    if(currentProfile){
    OrganizationRepository.fetchCurrentOrganization().then((data) => {
      if(data){
        setOrganization(data)
      }
      
    })
  }
  else{
    OrganizationRepository.fetchOrganizationsList().then((data) => {
      if(data){
        data.filter(item => item.corporateProfile.id === +router.asPath.slice(3))
        OrganizationRepository.fetchOrganization(data[0].id).then((data) => {
          if(data){
            setOrganization(data)
          }
        })
      }
    })
  }
    if (isEdit) {
      dispatch(fetchSkillList())
    }
  }, [isEdit])

  const handleCategoryChange = (category, subCategory) => {
    console.log('handleCategoryChange', category, subCategory)
    setCategory(category)
    if (subCategory?.subCategoryId) {
      dispatch(setCurrentSkill(subCategory))

      router.replace(`/sk${subCategory.id}`, undefined, {shallow: false})
    }
  }

  const fetchProjects = (page?: number, limit?: number) => {
    ProjectRepository.fetchByStatus(ProjectStatus.Published, page, limit).then(data => {
      if(data){
        setProjects(data.data);
        setTotal(data.total);
      }
    })
  }
  useEffect(() => {
    fetchProjects(page, 10)
    setLoading(false);
  }, [])

  const handleScrollNext = () => {
    setPage(page + 1);
    fetchProjects(page + 1, 10);
  }
  const handleRefresh = () => {

  }
  const getQueryFilter = () => {
    try {
      if((router.query as any).filter) {
        return JSON.parse((router.query as any).filter)
      }
    }catch (e) {

    }
    return {}
  }
  const handleProjectViewOpen = (project: IProject) => {
    setInitialProjectTab('description')
    setCurrentProject(project);
  }
  const handleProjectApplyOpen = (project: IProject) => {
    setInitialProjectTab('application')
    setCurrentProject(project);

  }

  return (
    <ProfilePageLayout {...props} organization={organization} isCurrentProfileOpened={isEdit} profile={profile} isEdit={isEdit} subCategory={currentSkill} onCategoryChange={handleCategoryChange}>

      {props.showType ==='news' ? <CardPosts profile={profile}/>  : profile.role === 'client' && props.showType ==='profile' ? <>

          <CardReviews profile={profile} />
          </>
        :
        <>
        {(currentProfile?.role === 'corporate' || !currentProfile) && organization && <CardDescription isEdit={isEdit} organization={organization}/>}
        {(currentProfile?.role === 'corporate' || !currentProfile) && organization && 
          <>
          {loading && total === 0 && <Loader/>}
          {total > 0 && <InfiniteScroll
            dataLength={projects.length} //This is important field to render the next data
            hasMore={projects.length < total}
            next={handleScrollNext}
            loader={<Loader/>}
          >
            {projects.map((project, index) => <div className={styles.project}><ProjectCard key={project.id} actionsType={'corporate'} project={project} onApplyClick={handleProjectApplyOpen} onViewOpen={handleProjectViewOpen}/></div>)}
          </InfiniteScroll>}
          {currentProject && <ProjectModal showType={'client'} projectId={currentProject?.id} isOpen onClose={() => setCurrentProject(null)}/>}
          </>
        }
      {!currentSkill && props.showType ==='profile' && currentProfile?.role !== 'corporate' && <CardProfileStat profile={profile}/>}
          {props.showType === 'recommendations' && <>
            <CardRecommendations profile={profile}/>

          </>}
      {currentSkill  && <>
        <CardCategorySelector categories={categories} profile={profile} isEdit={isEdit} category={category} subCategory={currentSkill}
                              onCategoryChange={handleCategoryChange}/>
        {props.showType === 'profile' && category && <><CardSalesPitch profile={profile} isEdit={isEdit} skill={currentSkill}/>
        <CardWorkExperience profile={profile} isEdit={isEdit} skill={currentSkill}/>
        <CardPortfolio profile={profile} isEdit={isEdit} skill={currentSkill}/>
        <CardGallery profile={profile} isEdit={isEdit} skill={currentSkill}/></>}
      </>}
          {props.showType === 'reviews' && <>
            <CardReviews profile={profile} skill={currentSkill}/>
          </>}
     </>}
    </ProfilePageLayout>
  )
}
export default PublicProfile
