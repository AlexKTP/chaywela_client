import { Status } from "../enums/status.enum";
import { Project } from "./project";

export interface Task {
    
    id: number;
    title: string;
    description: string;
    status: Status;
    duration: number;
    difficulty: number;
    progress: number;
    estimatedTime: number;
    project: Project;
    
}