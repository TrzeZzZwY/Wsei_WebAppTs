import { FC, useEffect, useState } from 'react';
import { SideBar } from './SideBar';
import { Outlet } from 'react-router-dom';

interface IProps {

}

export const ProjectLayout: FC<IProps> = props =>{
    return  (
        <>   
            <div className='flex flex-row basis-96'>
                <SideBar/>
                <Outlet/>
            </div>
        </>
    )
}