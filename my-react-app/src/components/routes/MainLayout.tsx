import { FC, useContext, useEffect, useState } from 'react';
import { Navbar } from './NavBar';
import { SideBar } from './SideBar';
import { Outlet } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { user, userDto } from '../../types/user';
import { userContext } from '../../contexts/DependencyProvider';

interface IProps {

}

export const MainLayout: FC<IProps> = props =>{
    const signIn = useSignIn<user>();
    const userSvc = useContext(userContext);

    const roles = ["admin","devops","developer"]
    let users = userSvc.GetAll();

    roles.forEach(role => {
        if(!users.map(e => e.role).includes(role as "admin"|"devops"|"developer")){
            let user: userDto = {
                name: role,
                surename: "sur" + role,
                role: role as "admin"|"devops"|"developer"
            }   

            userSvc.Crate(user);
        }
    })

    let admin = userSvc.GetAll().filter(user => user.role == "admin")[0];

    if(signIn({
        auth: {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImYwNmQwMTExNjQwOTEzYzcyNjQ4MTkwYWJmZWExZjYxIn0.eyJleHAiOjk5OTk5OTk5OTk5fQ.SOZLml1nYmIfbipQ22ZDiVPY6Oi3BAyQx0_YAH7NWS0X2BX4abPRgQyM_5UkUpn3HNbzjm-0veQLYtx_kB-GSw',
            type: 'Bearer',
        },
        userState: admin
    })){    
        console.log("succes login")
    }else{
        console.log("failed login")
    }
    return  (
        <>   
            <div className='flex flex-col min-h-screen gap-3'>
                <Navbar/>
                <div className='flex flex-row'>
                    <SideBar/>
                    <Outlet/>
                </div>
            </div>  
        </>
    )
}