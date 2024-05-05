import { Task, TaskDto, isTodo, isDoing, isDone, TaskDoing, TaskDone, TaskTodo } from '../types/task'
import axios, { AxiosInstance } from "axios";

export class taskService{

    private _localStoragePrefix: string = "task";
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
    
    Get(id: string): Task | null {
        return this.GetTasksFromLocalStorage().find(proj => proj.id == id) ?? null
    }

    GetAll(userStoryId: string): Task[] {
        return this.GetTasksFromLocalStorage().filter(e => e.userStoryId == userStoryId);
    }

    Crate(model: TaskDto): void {
        let id: string = crypto.randomUUID();
        let task: Task = { 
            id: id,
            name: model.name,
            description: model.description,
            priority: model.priority,
            userStoryId: model.userStoryId,
            estimate: model.estimate,
            state: "todo",
            createDate: Date.now()
        }
        
        let tasks = [...this.GetTasksFromLocalStorage(), task]

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(tasks));
    }

    Delete(id: string): void {
        let tasks = this.GetTasksFromLocalStorage().filter(tsk => tsk.id != id);

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(tasks));
    }

    Edit(id: string, model: TaskDto): void {
        let oldTask = this.GetTasksFromLocalStorage().find(tsk => tsk.id == id) ?? null
        if(oldTask == null) return;
        let tasks = this.GetTasksFromLocalStorage().map(str => {
            if(str.id == id){
                str.name = model.name;
                str.description = model.description;
                str.priority = model.priority;
                str.userStoryId = model.userStoryId;
                str.estimate = model.estimate;
                if(isTodo(model)){
                    (str as TaskTodo).state = model.state;
                }
                if(isDoing(model)){
                    (str as TaskDoing).state = model.state;
                    (str as TaskDoing).userId = model.userId;
                    (str as TaskDoing).startDate = model.startDate;
                }
                if(isDone(model)){
                    (str as TaskDone).state = model.state;
                    (str as TaskDone).endDate = model.endDate;
                }
            }
            return str;
        });

        localStorage.setItem(this._localStoragePrefix, JSON.stringify(tasks));
    }

    private GetTasksFromLocalStorage():Task[]{
        return JSON.parse(localStorage.getItem(this._localStoragePrefix) ?? "[]")
    }
}
