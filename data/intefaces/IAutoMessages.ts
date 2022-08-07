export interface IAutoMessage {
  prevStatus: string
  nextStatus: string
  enabled: boolean
  message: string
}

export interface IAutoMessages {
  id: number
  projectId: number
  applicationStatusChangeMessages?: IAutoMessage[]
  projectStatusChangeMessages?: IAutoMessage[]
}