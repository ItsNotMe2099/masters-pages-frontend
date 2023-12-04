import request from 'utils/request'
import { IPagination } from 'types/types'
import { IProfileGalleryItem } from "types"

export default class PostsRepository {

  static async fetchAllPostsByProject(page: number, limit: number = 30, projectId: number): Promise<IPagination<IProfileGalleryItem>> {
    const res = await request({
      url: `/api/profile-gallery?page=${page}&limit=${limit}&projectId=${projectId}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchAllPostsForProjectByProfile(page: number, limit: number = 30, projectId: number, profileId: number): Promise<IPagination<IProfileGalleryItem>> {
    const res = await request({
      url: `/api/news?profileId=${profileId}&limit=${limit}&page=${page}&projectId=${projectId}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  
}
