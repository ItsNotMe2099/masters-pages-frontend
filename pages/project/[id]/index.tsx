import {getAuthServerSide} from 'utils/auth'
import request from 'utils/request'
import { SkillData} from 'types'
import PublicProfile from 'components/PublicProfile'
import {IProfile} from 'data/intefaces/IProfile'
import { useAppContext } from 'context/state'
import { useEffect, useState } from 'react'
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import { IOrganization, OrganizationStatus } from 'data/intefaces/IOrganization'
import RegistrationSuccess from 'components/Auth/RegistrationSuccess'
import styles from './index.module.scss'
import ProjectPublicPage from "components/for_pages/Project/ProjectPublicPage";
import {useRouter} from "next/router";
import ProjectRepository from "data/repositories/ProjectRepository";
import {IProject} from "data/intefaces/IProject";

interface Props {
  project: IProject
}

const ProfilePage = (props) => {
  const router = useRouter();
return <ProjectPublicPage initialProject={props.project} projectId={parseInt(router.query.id as string, 10)}/>
}
export const getServerSideProps = async (ctx) => {

  const projectId = ctx.query.id as string
  const project = await ProjectRepository.findPublicById(parseInt(projectId, 10));
  if(!project){
    return {
      notFound: true
    }
  }

  const res = await getAuthServerSide()(ctx as any)
  return {props: {...(res as any).props, project}}
}

export default ProfilePage
