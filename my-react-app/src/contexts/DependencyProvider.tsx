import React, { createContext, useState } from "react";
import { projectService } from '../api/projectService'
import { userStoryService } from "../api/userStoryService";
import { userService } from "../api/userService";

interface DependencyProviderProps{
  children: React.ReactNode
}

export interface DependencyContext{
  projectService: projectService,
  userStoryService: userStoryService,
  userService: userService
}

const dependencyContext: DependencyContext = {
  projectService: new projectService(),
  userStoryService: new userStoryService(),
  userService: new userService()
} 

export const Context = React.createContext<DependencyContext>(dependencyContext);


export function DependencyProvider({children}:DependencyProviderProps){
  return (
      <Context.Provider value={dependencyContext}>
        {children}
      </Context.Provider>
    )
}

