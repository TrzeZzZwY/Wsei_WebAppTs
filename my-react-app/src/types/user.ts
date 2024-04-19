export interface user{
    id: string,
    name: string
    surename: string
    role: "admin"|"devops"|"developer"
}

export interface userDto{
    name: string
    surename: string
    role: "admin"|"devops"|"developer"
}