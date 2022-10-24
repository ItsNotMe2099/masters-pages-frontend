import {SocialLink} from 'data/intefaces/ISocialLink'
import {LanguageCode} from 'components/PublicProfile/components/view/CardLanguages'
import {IFeedbacksToProfile, IUserFile} from 'types'
import {IProfile} from 'data/intefaces/IProfile'
import {IProject} from 'data/intefaces/IProject'

export enum ApplicationStatus {
  Draft = 'draft',
  Applied = 'applied',
  Shortlist = 'shortlist',
  Invited = 'invited',
  Execution = 'execution',
  Completed = 'completed',
  CompleteRequest = 'completeRequest',
  RejectedByCompany = 'rejectedByCompany',
  RejectedByVolunteer = 'rejectedByVolunteer',
}
export interface IApplicationNote{
  createdAt: string
  note: string
}
export class IApplication {
  id: number;
  project: IProject;
  projectId: number;
  profile: IProfile;
  profileId: number;
  status: ApplicationStatus;
  coverLetter?: string;
  resume?: string;
  coverLetterFileObject: IUserFile;
  coverLetterFile: string;
  resumeFileObject: IUserFile;
  resumeFile: string;
  notification: Notification;
  isRead: boolean
  education: string;
  age: number;
  languages: LanguageCode[];
  socialLinks: SocialLink[];
  appliedAt: Date;
  statsWithCompanyApplicationsCount: number;
  statsWithCompanyProjectsCount: number;
  createdAt: Date;
  updatedAt: Date;
  feedbacks?: IFeedbacksToProfile[]
  notes: IApplicationNote[]
}
