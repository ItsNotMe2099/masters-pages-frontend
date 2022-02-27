import {LanguageCode} from 'components/PublicProfile/components/view/CardLanguages'
import {IProfile} from 'data/intefaces/IProfile'
import {IServiceCategory} from 'data/intefaces/IServiceCategory'
import {IUserFile} from 'types'

export enum ProjectExecutionType {
  Online = 'online',
  Offline = 'offline',
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

export interface IProject {
  id: number;
  corporateProfile: IProfile;
  corporateProfileId: number;
  title: string;
  executionType: ProjectExecutionType;
  description: string;
  replyOptions: ProjectReplyType[];
  locations: Location[];
  photoObject: IUserFile;
  photo: string;
  benefits: string;
  startDate: Date;
  endDate: Date;
  applicationsClothingDate: Date;
  webLink: string;
  inquiries: string;
  applicationsLimits: number;
  vacanciesLimits: number;
  attachments: string[];
  attachmentsObjects: IUserFile[];
  skills: ProjectSkill[];
  requirements: string;
  education: string;
  languages: LanguageCode;
  minAge: number;
  maxAge: number;
  status: ProjectStatus;
  createdAt: Date;
}
