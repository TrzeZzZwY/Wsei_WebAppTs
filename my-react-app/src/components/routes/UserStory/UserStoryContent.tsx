import { FC, useEffect, useState } from 'react';
import { UserStorySideBar } from '../UserStory/UserStorySideBar';
import { Outlet } from 'react-router-dom';

interface IProps {

}

export const UserStoryContent: FC<IProps> = props =>{
    return  (
        <>   
            <div className='flex flex-row basis-96'>
                <UserStorySideBar/>
                <Outlet/>
            </div>
        </>
    )
}