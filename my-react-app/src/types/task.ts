
export type Task = Entity & TaskDto;
export type TaskDto = TaskTodo | TaskDoing | TaskDone;

export function isTodo(task: Task | TaskDto) : task is TaskTodo{
    return (task as TaskTodo).name !== "todo"; 
}

export function isDoing(task: Task | TaskDto) : task is TaskDoing{
    return (task as TaskDoing).name !== "Todo"; 
}

export function isDone(task: Task | TaskDto) : task is TaskDone{
    return (task as TaskDone).name !== "Todo"; 
}

interface Entity {
    id: string,
}

interface TaskBase{
    name: string,
    description: string,
    priority: "p0"|"p1"|"p2",
    userStoryId: string,
    estimate: 0|1|2|3|5|8|13|21,
}

export interface TaskTodo extends TaskBase{
    state: "todo"
    createDate: number,
}

export interface TaskDoing extends TaskBase{
    state: "doing",
    userId: string,
    createDate: number,
    startDate: number, 
}

export interface TaskDone extends TaskBase{
    state: "done",
    userId: string,
    createDate: number,
    startDate: number, 
    endDate: number,
}