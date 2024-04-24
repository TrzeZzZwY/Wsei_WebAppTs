import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ActionButton } from '../../common/ActionButton';
import { Context } from '../../../contexts/DependencyProvider'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { user } from '../../../types/user';
import { Task, TaskDto } from '../../../types/task';
import { TaskTile } from '../../common/TaskTile';


interface IProps {

}

export const TaskKanBan: FC<IProps> = props =>{

    const validPriorities = ["p0", "p1", "p2"];
    const validEstimate = [0,1,2,3,5,8,13,21];

    const context = useContext(Context);
    const { taskId } = useParams<{ taskId: string }>();
   

    const [task, setTask] = useState<Task>();
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [tasksChanged, setTasksChanged] = useState(false);


    return  (
        <>   
          
        </>
    )
}