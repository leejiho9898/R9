import { JobStatus, PayMentsMethod } from "./enums";
import { User } from "./user";

export interface AuthState {
  user: User | null;
}

export interface IJobState {
  writer: User | null;
  title: string;
  deadline: Date;
  detail: string;
  personnel: number;
  age: number;
  workType: string;
  adress: string;
  payment: PayMentsMethod;
  workingDay: string[];
  startTime: Date;
  endTime: Date;
  wage: number;
  status: JobStatus;
}

export interface IReviewState {
  writer: User | null;
  title: string;
  startDate: Date;
  endDate: Date;
  content: string;
  rating: number;
}
