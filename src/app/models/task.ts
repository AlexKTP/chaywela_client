import { Status } from "../enums/status.enum";

export interface Task {

    id: number;
    title: string;
    description: string;
    status: Status;
    duration: number;
    difficulty: number;
    progress: number;
    estimatedTime: number;
    project: number;

}