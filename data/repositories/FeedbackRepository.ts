import request from 'utils/request'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import {IPagination} from 'types/types'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import {IApplicationCounts} from 'data/intefaces/IApplicationCounts'
import {IFeedbacksToProfile, IProfileRecommendation} from "types";
import {IProfileFeedbackList} from "components/ProfileFeedback/actions";
import {IFeedBackFormData} from "types/form_data";

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
export default class FeedbackRepository {

  static async createForMaster(data: IFeedBackFormData): Promise<IFeedbacksToProfile| null> {
    const res = await request({
      url: `/api/feedback/master`,
      method: 'POST',
      data,
    })
    if (res.err) {
      throw res.err;
    }
    return res.data
  }
  static async update(id: number, data: IFeedBackFormData): Promise<IFeedbacksToProfile| null> {
    const res = await request({
      url: `/api/feedback/${id}`,
      method: 'PUT',
      data,
    })
    if (res.err) {
      throw res.err;
    }
    return res.data
  }

  static async delete(id: number): Promise<any> {
    const res = await request({
      url: `/api/feedback/${id}`,
      method: 'DELETE',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

}
