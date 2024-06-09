import React, { Dispatch, createContext, useState } from "react";
import { projectService } from '../api/projectService'
import { userStoryService } from "../api/userStoryService";
import { userService } from "../api/userService";
import { taskService } from "../api/taskService";
import { jwtService } from "../api/jwtService";

interface DependencyProviderProps{
  children: React.ReactNode
}

export interface DependencyContext{
  projectService: projectService,
  userStoryService: userStoryService,
  userService: userService,
  taskService: taskService,
  jwtService: jwtService,
  Theme: boolean
}

const dependencyContext: DependencyContext = {
  projectService: new projectService(),
  userStoryService: new userStoryService(),
  userService: new userService(),
  taskService: new taskService(),
  jwtService: new jwtService(),
  Theme: true
} 

interface ThemeContextProps{
  darkMode: boolean,
  setTheme: Dispatch<React.SetStateAction<boolean>>
}

export const ThemeContext = React.createContext<ThemeContextProps>({darkMode: true} as ThemeContextProps);

export const Context = React.createContext<DependencyContext>(dependencyContext);

export const useTheme = () => React.useContext(ThemeContext);

export function DependencyProvider({children}:DependencyProviderProps){

  const [theme,setTheme] = useState(true);
  return (
      <Context.Provider value={dependencyContext}>
        <ThemeContext.Provider value={{
          darkMode: theme,
          setTheme: setTheme
        }}>
          {children}
        </ThemeContext.Provider>
      </Context.Provider>
    )
}

