import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { ActionButton } from '../../common/ActionButton';
import { Context } from '../../../contexts/DependencyProvider'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { user } from '../../../types/user';
import { Task, TaskDoing, TaskDone, TaskDto, TaskTodo, isDoing } from '../../../types/task';
import { TaskTile } from '../../common/TaskTile';
import { FormInput } from '../../common/FormInput';
import { FormSelect } from '../../common/FormSelect';

interface IProps {

}

export const TaskKanBan: FC<IProps> = props =>{
    const validPriorities = ["p0", "p1", "p2"];
    const validEstimate = [0,1,2,3,5,8,13,21];

    const context = useContext(Context);
    const {storyId } = useParams<{ storyId: string }>();
    const auth = useAuthUser<user>()
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTaskId] = useState<Task | null>(null);
    const [tasksChanged, setTasksChanged] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const [selectedEstimate, setSelectedEstimate] = useState<0 | 1 | 2 | 3 | 5 | 8 | 13 | 21>(0)
    const [selectedPriority, setSelectedPriority] = useState<"p0" | "p1" | "p2">("p2")
    const [users, setUsers] = useState<user[]>([])
    useEffect(() =>{
        setTasks(context.taskService.GetAll(storyId!));
        setUsers(context.userService.GetAll());
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

        if(task){
            setSelectedTaskId(task);
            setSelectedEstimate(task.estimate)
            setSelectedPriority(task.priority)
            setSelectedUserId(null)
            isDoing(task) && setSelectedUserId(task.userId)
        }
    } 

    const handleFormSubmit = (event: any) =>{
        event.preventDefault();

        const data = {
            id: event.target.Id.value,
            name: event.target.Name.value,
            description: event.target.Description.value,
            priority: event.target.Priority.value,
            estimate: event.target.Estimate.value,
            user: event.target.User.value,
        }
        
        if(data.user != "-"){
            const task:TaskDoing = {
                name: data.name,
                description: data.description,
                priority: data.priority,
                estimate: data.estimate,
                userId: data.user,
                startDate: Date.now(),
                state: "doing",
                userStoryId: storyId!,
                createDate: 0
            }

            context.taskService.Edit(data.id, task)
        }else{
            const task:TaskTodo = {
                name: data.name,
                description: data.description,
                priority: data.priority,
                estimate: data.estimate,
                state: "todo",
                userStoryId: storyId!,
                createDate: 0
            }

            context.taskService.Edit(data.id, task)
        }
        setTasksChanged(cng => !cng);
    }

    const handleChangePriority = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        let option = event.target.value
        if(option != "-" && !validPriorities.includes(option)) return;

        setSelectedPriority(option as "p0" | "p1" | "p2");
    }
    const handleChangeEstimate = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        let option = event.target.value
        if(option != "-" && !validEstimate.includes(+option)) return;

        setSelectedEstimate(+option as 0 | 1 | 2 | 3 | 5 | 8 | 13 | 21);
    }
    const handleChangeUserId = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        let option = event.target.value
        if(option == "-")
            setSelectedUserId(null)
        setSelectedUserId(option);
    }
    const handleFinishTask = (taskId: string)=>{
        let task = context.taskService.Get(taskId);

        if(task && isDoing(task)){
            const finishedTask: TaskDone = {
                name: task.name,
                description: task.description,
                priority: task.priority,
                estimate: task.estimate,
                userId: task.userId,
                state: "done",
                userStoryId: task.userStoryId!,
                createDate: 0,
                startDate: task.startDate,
                endDate: Date.now()
            }
            context.taskService.Edit(taskId, finishedTask)
            setTasksChanged(cng => !cng);
        }
    }

    const handleDeleteTask = (taskId: string)=>{
        let sure = prompt("Are you sure? (y/n):") ?? "";

        if(sure != "y")
            return;

        context.taskService.Delete(taskId);
        setTasksChanged(cng => !cng);
    }
    return  (
        <>   
            <div className='flex flex-row basis-2/3 dark:bg-slate-700 p-3'>
                <div className='flex flex-col basis-1/3 border-2'>
                    <div className='flex flex-row justify-center'>
                        <span>TODO</span>
                    </div>
                    {tasks.filter(e => e.state == "todo").map( task =>
                        <div className='flex flex-row justify-center' key={task.id}>
                            <TaskTile textValue={`${task.name} | ${task.priority}`} action={() => handleTileClick(task.id)} />
                        </div>
                    )}
                </div>
                <div className='flex flex-col basis-1/3 border-r-2 border-t-2 border-b-2'>
                    <div className='flex flex-row justify-center'>
                        <span>DOING</span>
                    </div>
                    {tasks.filter(e => e.state == "doing").map( task =>
                        <div className='flex flex-row justify-center' key={task.id}>
                            <TaskTile textValue={`${task.name} | ${task.priority}`} action={() => handleTileClick(task.id)} />
                        </div>
                    )}
                </div>
                <div className='flex flex-col basis-1/3 border-r-2 border-t-2 border-b-2'>
                    <div className='flex flex-row justify-center'>
                        <span>DONE</span>
                    </div>
                    {tasks.filter(e => e.state == "done").map( task =>
                        <div className='flex flex-row justify-center' key={task.id}>
                            <TaskTile textValue={`${task.name} | ${task.priority}`} action={() => handleTileClick(task.id)} />
                        </div>
                    )}
                </div>
            </div> 
            <div className='flex flex-col basis-1/3 dark:bg-slate-600 p-3 gap-2'>
                <ActionButton textValue='Add new Task' action={handleAddTask}/>
                {
                    selectedTask ?     
                    <>
                        <form className='flex flex-col border-2 mt-3' onSubmit={handleFormSubmit}>
                            <input name='Id' value={selectedTask.id} hidden/>
                            <FormInput name='Name' value={selectedTask.name} type='text' />
                            <FormInput name='Description' value={selectedTask.description} type='textarea' />
                            <FormSelect name='Priority' value={selectedPriority} values={validPriorities.map(e => [e,e])} onChange={handleChangePriority}/>
                            <FormSelect name='Estimate' value={`${selectedEstimate}`} values={validEstimate.map(e => [`${e}`,`${e}`])} onChange={handleChangeEstimate}/>
                            <FormSelect name='User' value={selectedUserId} values={users.map(e => [e.id,e.name])} onChange={handleChangeUserId}/>
                            <input className='m-2 dark:bg-slate-800 hover:bg-emerald-700 p-2 border-2 border-solid border-emerald-700 rounded-md' type="submit" value="Save" />
                        </form>
                        
                        <ActionButton textValue='Delete task' action={() => handleDeleteTask(selectedTask.id)}/>

                        {
                            isDoing(selectedTask) && selectedTask.userId ?
                            <ActionButton textValue='Finish task' action={() => handleFinishTask(selectedTask.id)}>

                            </ActionButton> 
                            :
                            <></>
                        }
                    </>   

               
                    :
                    <>
                    </>
                }

            </div> 
        </>
    )
}