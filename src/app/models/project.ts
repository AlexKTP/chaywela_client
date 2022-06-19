import { ProjectType } from "../enums/project-type.enum";
import { User } from "./user";

export interface Project {

    id: number;
    name: string;
    description: string;
    projectType: ProjectType;
    refUser: number;

}