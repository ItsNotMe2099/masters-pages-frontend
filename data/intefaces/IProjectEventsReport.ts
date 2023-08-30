export interface IProjectEventsReport{
  summary: {event_status: string, count: number}[],
  byVolunteer: {
    photo: string | null
    firstName: string,
    lastName: string,
    participantId: number,
    slug: string
    draft: number,
    planned: number,
    confirmed: number,
    declined: number,
    completed: number,
    approved: number,
    rejected: number,
    overdue: number,
    deleted: number
  }[]
  byDate: {
    firstName: string,
    lastName: string,
    participantId: number,
    date: string,
    draft: number,
    planned: number,
    confirmed: number,
    declined: number,
    completed: number,
    approved: number,
    rejected: number,
    overdue: number,
    deleted: number
  }[]
}
