export interface userStory{
    id:string,
    name:string,
    description: string,
    priority: "low"|"mid"|"high"
    projectId: string
    createDate: number
    state: "todo"|"doing"|"done",
    ownerId: string
}

export interface userStoryDto{
    name:string,
    description: string,
    priority: "low"|"mid"|"high"
    projectId: string
    state: "todo"|"doing"|"done",
    ownerId: string
}