import {IRootState, SkillData} from 'types'
import CardSalesPitch from 'components/PublicProfile/components/view/CardSalesPitch'
import CardWorkExperience from 'components/PublicProfile/components/view/CardWorkExperience'
import CardPortfolio from 'components/PublicProfile/components/view/CardPortfolio'
import CardGallery from 'components/PublicProfile/components/view/CardGallery'
import {useSelector, useDispatch} from 'react-redux'
import React, { useEffect, useState} from 'react'
import {fetchSkillList} from 'components/Skill/actions'
import CardCategorySelector from 'components/PublicProfile/components/view/CardCategorySelector'
import {formatSkillList} from 'utils/skills'
import {fetchProfileTabList} from 'components/ProfileTab/actions'
import {setCurrentSkill} from 'components/Profile/actions'
import {useRouter} from 'next/router'
import CardProfileStat from 'components/PublicProfile/components/view/CardProfileStat'
import CardOrganizationDescription from 'components/PublicProfile/components/view/CardOrganizationDescription'
import ProfilePageLayout from 'components/PublicProfile/components/ProfilePageLayout'
import CardReviews from 'components/PublicProfile/components/view/CardReviews'
import CardRecommendations from 'components/PublicProfile/components/view/CardRecommendations'
import CardPosts from 'components/PublicProfile/components/view/CardPosts'
import {IProfile} from 'data/intefaces/IProfile'
import {useAppContext} from 'context/state'
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import { IOrganization } from 'data/intefaces/IOrganization'
import ProjectRepository from 'data/repositories/ProjectRepository'
import { IProject } from 'data/intefaces/IProject'
import Loader from 'components/ui/Loader'
import ProjectCard from 'components/for_pages/Project/ProjectCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './index.module.scss'
import ProjectModal from 'components/for_pages/Project/ProjectModal'
import {projectOpen, signUpOpen} from 'components/Modal/actions'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import { IProjectSearchRequest } from 'data/repositories/ApplicationRepository'
import ProjectActions from "components/for_pages/Project/ProjectActions";

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
  const [profile, setProfile] = useState<IProfile>(isEdit ? currentProfile : props.profile)
  const [category, setCategory] = useState(null)
  const [organization, setOrganization] = useState<IOrganization | null>(null)
  const reduxSkill = useSelector((state: IRootState) => state.profile.currentSkill)
  const currentSkill = isEdit ? reduxSkill ||  props.skill : props.skill
  const categoriesCurrentProfile = useSelector((state: IRootState) => state.skill.list)
  const [loading, setLoading] = useState<boolean>(true)
  const [projects, setProjects] = useState<IProject[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null)
  const [initialProjectTab, setInitialProjectTab] = useState<string | null>(null)
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)

  const limit = 10
  console.log("organization", organization)
  const handleUpdateOrganization = () => {
    OrganizationRepository.fetchCurrentOrganization().then((data) => {
      if(data){
        setOrganization(data)
      }
    })
  }

  const handleUpdateProfile = () => {
    ProfileRepository.fetchById(profile.id).then((data) => {
      if(data){
        setProfile(data)
      }
    })
    appContext.updateProfile(appContext.role)
  }

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



  useEffect(() => {
    /*if(currentProfile && currentProfile.role === 'corporate'){
    OrganizationRepository.fetchCurrentOrganization().then((data) => {
      if(data){
        setOrganization(data)
      }

    })
  }*/
  //else if(!currentProfile){

  //}
    if(profile.role === 'corporate'){
      OrganizationRepository.fetchOrganizationsList().then((data) => {
        if(data){
          const newData = data.filter(item => item.corporateProfileId === profile.id)
          if(newData[0]){
            OrganizationRepository.fetchOrganization(newData[0].id).then((data) => {
              if(data){
                setOrganization(data)
              }
            })}
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

  const fetchProjects = (page: number, limit: number, keywords?: string, filter?: IProjectSearchRequest) => {
    ProjectRepository.search(page, limit, keywords, filter).then(data => {
      if(data){
        setProjects(data.data);
        setTotal(data.total);
      }
    })
  }
  useEffect(() => {
    fetchProjects(page, limit, '', {corporateProfileId: profile.id})
    setLoading(false);
  }, [router])

  const handleScrollNext = () => {
    setPage(page + 1)
    ProjectRepository.search(page + 1, limit, '', {corporateProfileId: profile.id}).then(data => {
      if(data){
        setProjects(projects => [...projects, ...data.data])
      }
    })
  }

  const handleModalOpen = (project: IProject, type: 'create' | 'view' | 'edit' | 'application') => {
    console.log("handleModalOpen", type)
    switch (type) {
      case "create":
        setInitialProjectTab(null)
        setCurrentProjectId(null)
        break;
      case "view":
        setInitialProjectTab(null)
        setCurrentProjectId(project.id)
        break;
      case "edit":
        setInitialProjectTab(null)
        setCurrentProjectId(project.id);
        dispatch(projectOpen())
        break;
      case "application":
        setInitialProjectTab('application')
        setCurrentProjectId(project.id);
        break;
    }
    dispatch(projectOpen())
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


  return (
    <ProfilePageLayout id='scrollableDiv' onOrganizationUpdate={handleUpdateOrganization} onProfileUpdate={handleUpdateProfile} {...props} organization={organization} isCurrentProfileOpened={isEdit} profile={profile} isEdit={isEdit} subCategory={currentSkill} onCategoryChange={handleCategoryChange}>

      {props.showType ==='news' ? <CardPosts profile={profile}/>  : profile.role === 'client' && props.showType ==='profile' ? <>

          <CardReviews profile={profile} />
          </>
        :
        <>
        {(profile?.role === 'corporate' || !currentProfile) && organization && <CardOrganizationDescription onOrganizationUpdate={handleUpdateOrganization} isEdit={isEdit} organization={organization}/>}
        {(profile?.role === 'corporate' || !currentProfile) && organization &&
          <>
          {loading && total === 0 && <Loader/>}
          {total > 0 && <InfiniteScroll
            dataLength={projects.length} //This is important field to render the next data
            hasMore={projects.length < total}
            next={handleScrollNext}
            loader={<Loader/>}
            scrollableTarget='scrollableDiv'
          >
            {projects.map((project, index) => <div className={styles.project}><ProjectCard key={project.id} project={project} actions={<ProjectActions  onModalOpen={(mode) => handleModalOpen(project, mode)}
                                                                                                                                                        actionsType={'public'} project={project}/>}/></div>)}
          </InfiniteScroll>}
          {currentProjectId && <ProjectModal showType={profile?.role === 'corporate' && profile !== currentProfile ? 'public' : 'client'} organization={organization}  projectId={currentProjectId} isOpen />}
          </>
        }
      {!currentSkill && props.showType ==='profile' && currentProfile && profile?.role !== 'corporate' && <CardProfileStat profile={profile}/>}
          {props.showType === 'recommendations' && <>
            <CardRecommendations profile={profile}/>

          </>}
      {currentSkill  && <>
        <CardCategorySelector categories={categories as SkillData[]} profile={profile} isEdit={isEdit} category={category} subCategory={currentSkill}
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
      {modalKey === 'projectModal'  && <ProjectModal initialTab={initialProjectTab} showType={'public'} projectId={currentProjectId} isOpen/>}
    </ProfilePageLayout>
  )
}
export default PublicProfile
