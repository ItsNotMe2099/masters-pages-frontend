import request from 'utils/request'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import {IPagination} from 'types/types'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import {IApplicationCounts} from 'data/intefaces/IApplicationCounts'
import {IFeedbacksToProfile, IProfileNote, IProfileRecommendation} from "types";
import {IProfileFeedbackList} from "components/ProfileFeedback/actions";
import {IFeedBackFormData} from "types/form_data";

export default class ProfileNoteRepository {
  static async findByProfileId(profileId: number): Promise<IProfileNote| null> {
    const res = await request({
      url: `/api/profile-note/byProfile/${profileId}`,
      method: 'GET',
    })
    if (res.err) {
      throw res.err;
    }
    return res.data
  }
  static async create(profileId: number, notes: {createdAt: string, note: string}): Promise<IProfileNote| null> {
    const res = await request({
      url: `/api/profile-note`,
      method: 'POST',
    data: {
      profileId,
        notes
    },
    })
    if (res.err) {
      throw res.err;
    }
    return res.data
  }
  static async update(id: number, data: IFeedBackFormData): Promise<IProfileNote| null> {
    const res = await request({
      url: `/api/profile-note/${id}`,
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
      url: `/api/profile-note/${id}`,
      method: 'DELETE',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

}
