import {IPagination} from "types/types";
import {IEvent} from "types";

export interface IEventListRequest {
  projectId?: number
  sort?: string,
  start?: string,
  end?: string
}
export interface IEventNearestListRequest  extends IEventListRequest{
  page?: number,
  limit?: number
}
