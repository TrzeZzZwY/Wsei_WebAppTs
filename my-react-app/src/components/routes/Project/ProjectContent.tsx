import { FC, useEffect, useState } from 'react';
import { UserStorySideBar } from '../UserStory/UserStorySideBar';
import { Outlet } from 'react-router-dom';

interface IProps {

}

export const ProjectContent: FC<IProps> = props =>{
    return  (
        <>   
            <div className='flex flex-row basis-full'>
                <UserStorySideBar/>
                <Outlet/>
            </div>
        </>
    )
}