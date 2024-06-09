import { FC, useContext, useEffect, useState } from 'react';
import { Navbar } from './NavBar';
import { ProjectSideBar } from './Project/ProjectSideBar';
import { Navigate, Outlet } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { user, userDto } from '../../types/user';
import { Context, useTheme } from '../../contexts/DependencyProvider';

interface IProps {

}

export const MainLayout: FC<IProps> = props =>{
    const signIn = useSignIn<user>();
    const context = useContext(Context);
    const theme = useTheme();
    
    useEffect(()=>{
    },[theme.darkMode])

    const roles = ["admin","devops","developer"];
    let users = context.userService.GetAll();
    roles.forEach(role => {
        if(!users.map(e => e.role).includes(role as "admin"|"devops"|"developer")){
            let user: userDto = {
                name: role,
                surename: "sur" + role,
                role: role as "admin"|"devops"|"developer"
            }   

            context.userService.Crate(user);
        }
    })

    const token = context.jwtService.GetToken();
    if(!token){
       return <Navigate to="/login"/>
    } 

    const base64Url = token.token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const tokenPayload = JSON.parse(atob(base64));

    const login = tokenPayload.login as string;

    let user = context.userService.GetAll().filter(user => user.name == login)[0];
    if(signIn({
        auth: {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImYwNmQwMTExNjQwOTEzYzcyNjQ4MTkwYWJmZWExZjYxIn0.eyJleHAiOjk5OTk5OTk5OTk5fQ.SOZLml1nYmIfbipQ22ZDiVPY6Oi3BAyQx0_YAH7NWS0X2BX4abPRgQyM_5UkUpn3HNbzjm-0veQLYtx_kB-GSw',
            type: 'Bearer',
        },
        userState: user
    })){    
        console.log("succes login")
    }else{
        console.log("failed login")
    }
    return  (
        <>   
            <div className={`${theme.darkMode ? "dark" : ""} bg-neutral-100 dark:bg-slate-900 dark:text-slate-100 flex flex-col min-h-screen gap-3`}>
                <Navbar/>
                <div className='flex flex-row min-h-screen'>
                    <ProjectSideBar/>
                    <Outlet/>
                </div>
            </div>  
        </>
    )
}