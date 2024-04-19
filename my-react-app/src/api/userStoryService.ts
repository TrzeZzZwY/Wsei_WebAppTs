import { userStory, userStoryDto } from '../types/userStory'
import axios, { AxiosInstance } from "axios";

export class userStoryService{

    private _localStoragePrefix: string = "userStories";
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
    
    Get(id: string): userStory | null {
        return this.GetTasksFromLocalStorage().find(proj => proj.id == id) ?? null
    }
    GetAll(projectId: string): userStory[] {
        return this.GetTasksFromLocalStorage().filter(tsk => tsk.projectId == projectId);
    }
    Crate(model: userStoryDto): void {
        let id: string = crypto.randomUUID();
        let userStory: userStory = { 
            id: id,
            name: model.name, 
            description: model.description, 
            priority: model.priority, 
            projectId: model.projectId ,
            createDate: Date.now(),
            state: model.state,
            ownerId: model.ownerId
        }
        
        let userStories = [...this.GetTasksFromLocalStorage(), userStory]

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(userStories));
    }
    Delete(id: string): void {
        let userStories = this.GetTasksFromLocalStorage().filter(tsk => tsk.id != id);

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(userStories));
    }
    Edit(id: string, model: userStoryDto): void {
        let oldUserStory = this.GetTasksFromLocalStorage().find(tsk => tsk.id == id) ?? null
        if(oldUserStory == null) return;
        let userStories = this.GetTasksFromLocalStorage().map(str => {
            if(str.id == id){
                str.name = model.name;
                str.description = model.description;
                str.priority = model.priority;
                str.state = model.state;
                str.ownerId = model.ownerId;
            }
            return str;
        });

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(userStories));
    }

    private GetTasksFromLocalStorage():userStory[]{
        return JSON.parse(localStorage.getItem(this._localStoragePrefix) ?? "[]")
    }
}
