import {LanguageCode} from 'components/PublicProfile/components/view/CardLanguages'
import {IProfile} from 'data/intefaces/IProfile'
import {IServiceCategory} from 'data/intefaces/IServiceCategory'
import {IUserFile} from 'types'
import { ISkill} from 'data/intefaces/ISkill'

export enum ProjectExecutionType {
  Online = 'online',
  Offline = 'offline',
  Combo = 'combo',
}

export enum ProjectReplyType {
  VolunteerProfile = 'volunteerProfile',
  Resume = 'resume',
  CoverLetter = 'coverLetter',
  ProfileLink = 'profileLink',
}

export enum ProjectStatus {
  Draft = 'draft',
  Published = 'published',
  Execution = 'execution',
  Paused = 'paused',
  Canceled = 'canceled',
  Completed = 'completed',
}

export class ProjectSkill {
  id: number;
  projectId: number;
  mainCategory: IServiceCategory;
  mainCategoryId: number;
  category: IServiceCategory;
  categoryId: number;
  subCategory: IServiceCategory;
  subCategoryId: number;
  createdAt: string;

}
export interface IProjectLocation{
  id: number
  type: 'online' | 'offline',
  location: string
  address: string
  isOnline?: boolean
}

export interface IProject {
  id: number;
  corporateProfile: IProfile;
  corporateProfileId: number;
  title: string;
  executionType: ProjectExecutionType;
  description: string;
  replyOptions: ProjectReplyType[];
  locations?: IProjectLocation[];
  skills?: ISkill[]
  photoObject: IUserFile;
  photo: string;
  benefits: string;
  startDate: string;
  endDate: string;
  applicationsClothingDate: string;
  webLink: string;
  inquiries: string;
  applicationsLimits: number;
  vacanciesLimits: number;
  attachments: string[];
  attachmentsObjects: IUserFile[];
  requirements: string;
  education: string;
  languages: LanguageCode[];
  minAge: number;
  maxAge: number;
  status: ProjectStatus;
  profile: IProfile
  createdAt: Date;
  updatedAt: string
}


export interface IProjectNotification {
  notificationNewApplicationCount: number,
  notificationApplicationShortlistCount: number,
  notificationApplicationInvitedCount: number,
  notificationApplicationCompleteRequestCount: number,
  notificationApplicationCompletedCount: number,
  notificationApplicationExecutionCount: number,
  notificationApplicationRejectedByVolunteerCount: number,
  notificationApplicationRejectedByCompanyCount: number,
  notificationProjectChatMessagesCount:number
  notificationProjectGroupChatMessagesCount: number,
}



  notificationNewApplicationCount: number,
  notificationApplicationShortlistCount: number,
  notificationApplicationInvitedCount: number,
  notificationApplicationCompleteRequestCount: number,
  notificationApplicationCompletedCount: number,
  notificationApplicationExecutionCount: number,
  notificationApplicationRejectedByVolunteerCount: number,
  notificationApplicationRejectedByCompanyCount: number,
