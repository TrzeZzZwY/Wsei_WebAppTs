import React, { createContext, useState } from "react";
import { projectService } from '../api/projectService'
import { userStoryService } from "../api/userStoryService";
import { userService } from "../api/userService";
import { taskService } from "../api/taskService";

interface DependencyProviderProps{
  children: React.ReactNode
}

export interface DependencyContext{
  projectService: projectService,
  userStoryService: userStoryService,
  userService: userService,
  taskService: taskService
}

const dependencyContext: DependencyContext = {
  projectService: new projectService(),
  userStoryService: new userStoryService(),
  userService: new userService(),
  taskService: new taskService()
} 

export const Context = React.createContext<DependencyContext>(dependencyContext);


export function DependencyProvider({children}:DependencyProviderProps){
  return (
      <Context.Provider value={dependencyContext}>
        {children}
      </Context.Provider>
    )
}

