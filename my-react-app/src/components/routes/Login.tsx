import { FC, useContext, useEffect, useState } from 'react';
import { Navbar } from './NavBar';
import { ProjectSideBar } from './Project/ProjectSideBar';
import { Navigate, Outlet, redirect } from 'react-router-dom';
import { Context } from '../../contexts/DependencyProvider'
import { jwt } from '../../types/jwt';

export const Login = () =>{
    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [redirect, setRedirect] = useState<boolean>(false);
    const context = useContext(Context);

    useEffect(() =>{
    },[redirect])

    const handleSubmit = (event: any)=>{
        event.preventDefault();
        
        if(!login || !password) return;

        context.jwtService.login(login,password).then( data =>{
            if(data){
                console.log(data)
                setRedirect(true)
            }
        }
        );
    }

    if(redirect)
        return <Navigate to="/"/>

    return  (
        <div className='flex flex-row items-center justify-center m-10'>   
           <form className='flex flex-col gap-5' onSubmit={handleSubmit} method='post'>
                <div className='felx flex-row gap-4'>
                    <label htmlFor='login'>login: </label>
                    <input className='border' type="text" name="login" value={login} onChange={e => setLogin(e.target.value)}/>
                </div>
                <div className='felx flex-row gap-4'>
                    <label htmlFor='password'>password: </label>
                    <input className='border' type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <input type="submit" value="Login" />
           </form>
        </div>
    )
}