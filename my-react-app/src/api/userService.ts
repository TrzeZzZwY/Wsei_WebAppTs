import { user, userDto } from '../types/user'
import axios, { AxiosInstance } from "axios";

export class userService{

    private _localStoragePrefix: string = "user";
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
    
    Get(id: string): user | null {
        return this.GetTasksFromLocalStorage().find(proj => proj.id == id) ?? null
    }
    GetAll(): user[] {
        return this.GetTasksFromLocalStorage();
    }
    Crate(model: userDto): void {
        let id: string = crypto.randomUUID();
        let userStory: user = { 
            id: id,
            name: model.name,
            surename: model.surename,
            role: model.role
        }
        
        let userStories = [...this.GetTasksFromLocalStorage(), userStory]

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(userStories));
    }
    Delete(id: string): void {
        let userStories = this.GetTasksFromLocalStorage().filter(tsk => tsk.id != id);

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(userStories));
    }
    Edit(id: string, model: userDto): void {
        let oldUserStory = this.GetTasksFromLocalStorage().find(tsk => tsk.id == id) ?? null
        if(oldUserStory == null) return;
        let userStories = this.GetTasksFromLocalStorage().map(str => {
            if(str.id == id){
                str.name = model.name;
                str.surename = model.surename;
                str.role =model.role
            }
            return str;
        });

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(userStories));
    }

    private GetTasksFromLocalStorage():user[]{
        return JSON.parse(localStorage.getItem(this._localStoragePrefix) ?? "[]")
    }
}
