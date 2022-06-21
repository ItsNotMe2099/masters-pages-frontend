import {IProfile} from 'data/intefaces/IProfile'
import {IProject} from 'data/intefaces/IProject'
import {ITask} from 'types'

export interface IChat {
  id: number;
  name: string;
  isGroup: boolean;
  task: ITask;
  taskId: number;
  profile: IProfile;
  profileId: number;
  project: IProject
  projectId: number
  lastMessage: string;
  participant: IProfile;
  participantId: number;
  profiles: IProfile[]
  lastMessageAt: string
  createdAt: string
  totalUnread: number
}
