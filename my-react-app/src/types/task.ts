export type Task = TaskTodo | TaskDoing | TaskDone

interface TaskBase{
    id: string,
    name: string,
    priority: "p0"|"p1"|"p2",
    userStoryId: string,
    estimate: 0|1|2|3|5|8|1|21,
}

interface TaskTodo extends TaskBase{
    state: "todo"
    createDate: number,
}

interface TaskDoing extends TaskBase{
    state: "doing",
    startDate: number, 
}

interface TaskDone extends TaskBase{
    state: "done",
    endDate: number,
}