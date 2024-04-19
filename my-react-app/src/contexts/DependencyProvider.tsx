import React, { createContext, useState } from "react";
import { projectService } from '../api/projectService'
import { userStoryService } from "../api/userStoryService";
import { userService } from "../api/userService";

type DependencyProviderProps = {
  children: React.ReactNode
}

export const projectSeriveContext = React.createContext<projectService>(new projectService());
export const userStoryContext = React.createContext<userStoryService>(new userStoryService());
export const userContext = React.createContext<userService>(new userService());

export function DependencyProvider({children}:DependencyProviderProps){
  const [projectSvc, setProjectService] = useState(new projectService())
  const [userStorySvc, setuserStoryService] = useState(new userStoryService())
  const [userSvc, setuserService] = useState(new userService())
  return (
      <>
        <projectSeriveContext.Provider value={projectSvc}>
          <userStoryContext.Provider value={userStorySvc}>
            <userContext.Provider value={userSvc}>
              {children}
            </userContext.Provider>
          </userStoryContext.Provider>
        </projectSeriveContext.Provider>
      </>
    )
}

