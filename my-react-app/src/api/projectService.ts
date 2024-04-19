import { project, projectDto } from '../types/project'
import axios, { AxiosInstance } from "axios";

export class projectService{

    private _localStoragePrefix: string = "projects";
    private axiosInstance:AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create(
            {
                baseURL: "https://jsonplaceholder.typicode.com/",
                headers: {
                    "Content-Type" : "application/json; charset=UTF-8"
                }
            }
        )
    }

    async Get(projectId: string): Promise<project>{
        return axios.get<project>(`project\\${projectId}`)
        .then(respose => respose.data);
    }

    async Delete(projectId: string){
        return axios.delete<project>(`project\\${projectId}`)
        .then(response => response.data);
    }

    async Post(project: projectDto){
        const post = {
            name: project.name,
            decsription: project.description
        }
        return axios.post<project>(`project`,post)
        .then(response => response.data);
    }

    async Put(project: projectDto, projectId: string){
        return axios.put<project>(`project/${projectId}`,project)
        .then(response => response.data);
    }

    GetLS(id: string): project | null {
        return this.GetProjectsFromLocalStorage().find(proj => proj.id == id) ?? null
    }

    GetAllLS(): project[] {
        return this.GetProjectsFromLocalStorage();
    }

    CrateLS(model: projectDto): void {
        let id: string = crypto.randomUUID();
        let project: project = { id: id, name: model.name, description: model.description }
        
        let projects = [...this.GetProjectsFromLocalStorage(), project]

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(projects));
        console.log("item created")
    }

    DeleteLS(id: string): void {
        let projects = this.GetProjectsFromLocalStorage().filter(proj => proj.id != id);

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(projects));
    }

    PutLS(id: string, model: projectDto): void {
        let oldProject = this.GetProjectsFromLocalStorage().find(proj => proj.id == id) ?? null
        if(oldProject == null) return;

        let projects = this.GetProjectsFromLocalStorage().map(proj => {
            if(proj.id == id){
                proj.name = model.name;
                proj.description = model.description;
            }
            return proj;
        });

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(projects));
    }

    private GetProjectsFromLocalStorage():project[]{
        return JSON.parse(localStorage.getItem(this._localStoragePrefix) ?? "[]")
    }
}
