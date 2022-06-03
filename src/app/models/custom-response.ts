import { Project } from "./project";
import { Task } from "./task";
import { User } from "./user";

export interface CustomResponse {
    timestamp: Date;
    statusCode: number;
    reason: string;
    message: string;
    developerMessage: string;
    data: { objList?: User[] | Task[] | Project[], obj?: User | Task | Project }

}