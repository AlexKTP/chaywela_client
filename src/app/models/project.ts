import { ProjectType } from "../enums/projectType.enum";
import { User } from "./user";

export interface Project {

    id: number;
    name: string;
    description: string;
    projectType: ProjectType;
    user: User;
    
}