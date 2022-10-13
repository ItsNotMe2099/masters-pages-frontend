import request from 'utils/request'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import {IPagination} from 'types/types'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import {IApplicationCounts} from 'data/intefaces/IApplicationCounts'
import {IProfileRecommendation} from "types";

export interface IProjectSearchRequest{
  keywords?: string,
  mainCategoryId?: number
  subCategoryId?: number
  categoryId?: number
  executionType?: string
  age?: number
  education?: number
  languages?: string[]
  corporateProfileId?: number
  projectId?: number
}
export default class ProfileRecommendationRepository {
  static async fetchStatus(profileIds: number[]): Promise<IProfileRecommendation[] | null> {
    const res = await request({
      url: `/api/profile-recommendations/my`,
      method: 'POST',
      data:{
        profileIds
      }
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async create(profileId: number): Promise<IProfileRecommendation| null> {
    const res = await request({
      url: `/api/profile-recommendations`,
      method: 'POST',
      data:{
        profileId
      }
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async delete(profileId: number): Promise<any> {
    const res = await request({
      url: `/api/profile-recommendations/${profileId}`,
      method: 'DELETE',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

}
