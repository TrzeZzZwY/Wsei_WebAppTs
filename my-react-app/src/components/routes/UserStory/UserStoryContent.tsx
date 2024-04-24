import { FC, useEffect, useState } from 'react';
import { TaskKanBan } from '../Task/TaskKanBan';
import { Outlet } from 'react-router-dom';


interface IProps {

}

export const UserStoryContent: FC<IProps> = props =>{
    return  (
        <>   
            <div className='flex flex-row basis-full'>
                <TaskKanBan/>
                <Outlet/>
            </div>
        </>
    )
}