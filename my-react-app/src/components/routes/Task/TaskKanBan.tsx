import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { ActionButton } from '../../common/ActionButton';
import { Context } from '../../../contexts/DependencyProvider'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { user } from '../../../types/user';
import { Task, TaskDto, isDoing } from '../../../types/task';
import { TaskTile } from '../../common/TaskTile';
import { FormInput } from '../../common/FormInput';
import { FormSelect } from '../../common/FormSelect';

interface IProps {

}

export const TaskKanBan: FC<IProps> = props =>{
    const validPriorities = ["p0", "p1", "p2"];
    const validEstimate = [0,1,2,3,5,8,13,21];

    const context = useContext(Context);
    const { storyId } = useParams<{ storyId: string }>();
    const auth = useAuthUser<user>()
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTaskId] = useState<Task | null>(null);
    const [tasksChanged, setTasksChanged] = useState(false);

    const [users, setUsers] = useState<user[]>([])
    useEffect(() =>{
        setTasks(context.taskService.GetAll(storyId!));
        setUsers(context.userService.GetAll());
        setSelectedTaskId(null);
    },[storyId, tasksChanged])

    const handleAddTask = () =>{
        let name = prompt("Enter task name:") ?? "";
        let description = prompt("Enter task description:") ?? "";
        let priority = prompt("Enter taks priority (p0/p1/p2):") as "p0" | "p1" | "p2" ?? "";
        let estimate = +(prompt("Enter taks priority (0/1/2/3/5/8/13/21):") ?? 0);
        
        if(auth == null || !validPriorities.includes(priority) || !validEstimate.includes(estimate)) return;
        let taskDto: TaskDto = {
            name: name,
            description: description,
            priority: priority,
            estimate: estimate as 0|1|2|3|5|8|13|21,
            state: "todo",
            createDate: Date.now(),
            userStoryId: storyId!
        }
        context.taskService.Crate(taskDto);
        setTasksChanged(cng => !cng);
    }

    const handleTileClick = (taskId: string) =>{
        let task = context.taskService.Get(taskId);

        task && setSelectedTaskId(task);
    } 

    return  (
        <>   
            <div className='flex flex-row basis-2/3 bg-slate-700 p-3'>
                <div className='flex flex-col basis-1/3 border-2'>
                    <div className='flex flex-row justify-center'>
                        <span>TODO</span>
                    </div>
                    {tasks.filter(e => e.state == "todo").map( task =>
                        <div>
                            <TaskTile textValue={`${task.name} | ${task.priority}`} action={() => handleTileClick(task.id)} />
                        </div>
                    )}
                </div>
                <div className='flex flex-col basis-1/3 border-r-2 border-t-2 border-b-2'>
                    <div className='flex flex-row justify-center'>
                        <span>DOING</span>
                        {tasks.filter(e => e.state == "doing").map( task =>
                        <TaskTile textValue={`${task.name} | ${task.priority}`} action={() => handleTileClick(task.id)} />
                    )}
                    </div>
                </div>
                <div className='flex flex-col basis-1/3 border-r-2 border-t-2 border-b-2'>
                    <div className='flex flex-row justify-center'>
                        <span>DONE</span>
                        {tasks.filter(e => e.state == "done").map( task =>
                        <TaskTile textValue={`${task.name} | ${task.priority}`} action={() => handleTileClick(task.id)} />
                    )}
                    </div>
                </div>
            </div> 
            <div className='flex flex-col basis-1/3 bg-slate-600 p-3 gap-2'>
                <ActionButton textValue='Add new Task' action={handleAddTask}/>
                {
                    selectedTask ?        
                    <form className='flex flex-col border-2 mt-3'>
                        <input name='Id' value={selectedTask.id} hidden/>
                        <FormInput name='Name' value={selectedTask.name} type='text' />
                        <FormInput name='Description' value={selectedTask.description} type='textarea' />
                        <FormSelect name='Priority' value={selectedTask.priority} values={validPriorities.map(e => [e,e])} onChange={() => {}}/>
                        <FormSelect name='Estimate' value={selectedTask.estimate.toString()} values={validEstimate.map(e => [`${e}`,`${e}`])} onChange={() => {}}/>
                        <FormSelect name='User' value={isDoing(selectedTask) ? selectedTask.userId : ""} values={users.map(e => [e.id,e.name])} onChange={() => {}}/>
                        <input className='m-2 bg-slate-800 hover:bg-emerald-700 p-2 border-1 rounded-md' type="submit" value="Save" />
                    </form>
                    :
                    <>
                    </>
                }

            </div> 
        </>
    )
}