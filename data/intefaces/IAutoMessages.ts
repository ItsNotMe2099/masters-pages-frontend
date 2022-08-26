export interface IAutoMessage {
  prevStatus: string
  nextStatus: string
  enabled: boolean
  message: string
}

export interface IEventMessage {
  event: string
  enabled: boolean
  message: string
}

export interface IAutoMessages {
  id?: number
  projectId: number
  applicationStatusChangeMessages?: IAutoMessage[]
  projectStatusChangeMessages?: IAutoMessage[]
  eventMessages: IEventMessage[]
}