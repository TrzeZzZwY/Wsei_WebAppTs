import { ChangeEvent, FC,useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { LinkButton } from '../../common/LinkButton';
import { ActionButton } from '../../common/ActionButton';
import { userStoryContext } from '../../../contexts/DependencyProvider'
import { userStory } from '../../../types/userStory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { user } from '../../../types/user';

interface IProps {

}

export const SideBar: FC<IProps> = props =>{
    const userStorySvc = useContext(userStoryContext);
    const { projectId } = useParams<{ projectId: string }>();

    const [userStories, setUserStories] = useState<userStory[]>([]);
    const [filterUserStories, setFilterUserStories] = useState<string>("-")
    const [userStoriestChanged, setUserStoriesChanged] = useState(false);
    const auth = useAuthUser<user>()

    const validPriorities = ["low", "mid", "high"];
    const validStatuses = ["todo","doing","done"];

    useEffect(() =>{
        setUserStories(userStorySvc.GetAll(projectId!))
    },[userStoriestChanged, projectId, filterUserStories])

    const handleCreateUserStory = (event: React.MouseEvent) =>{
        let name = prompt("Enter user story name:") ?? "";
        let description = prompt("Enter user story description:") ?? "";   
        let priority = prompt("Enter user story priority (low/mid/high):") as "low" | "mid" | "high" ?? "";

        if(auth == null || !validPriorities.includes(priority)) return;
        userStorySvc.Crate({name: name, description: description,priority:priority, projectId: projectId!, state: "todo", ownerId: auth.id });
        setUserStoriesChanged(cng => !cng);
    }

    const handleDeleteUserStory = (id: string) =>{
        let sure = prompt("Are you sure? (y/n):") ?? "";

        if(sure != "y")
            return;

        userStorySvc.Delete(id);
        setUserStoriesChanged(cng => !cng);
    }

    const handleEditUserStory = (id: string) =>{
        let story = userStorySvc.Get(id);
        if(story == null) return

        let status = prompt("Enter user story status (todo/doing/done):") as "todo" | "doing" | "done" ?? "";
        if(auth == null || !validStatuses.includes(status)) return;
    
        story.state = status;
        userStorySvc.Edit(id,story);
        setUserStoriesChanged(cng => !cng);
    }

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let option = event.target.value
        if(option != "-" && !validStatuses.includes(option)) return;

        setFilterUserStories(option);
    }

    return  (
        <>     
            <div className='flex flex-col border-r-4 border-slate-700 px-5 h-full basis-64 gap-4'>
                <div className='text-lg'>
                    <ActionButton textValue='Add new user story' action={handleCreateUserStory}/>
                </div>
                <div className='flex flex-row gap-3'>
                    <span>Select status:</span>
                    <select value={filterUserStories} onChange={handleFilterChange} className='bg-gray-900'>
                        <option value="-">-</option>
                        {
                            validStatuses.map(opt =>
                                <option value={opt} key={opt}>{opt}</option>
                                )
                        }
                    </select>
                </div>
                {
                    userStories.filter(story => {
                        if(filterUserStories == "-" || filterUserStories == story.state)
                            return story;
                    }).map(story =>
                        <div className='flex flex-row gap-1' key={story.id}>
                            <div className='flex basis-3/4 content-center'>
                                <LinkButton textValue={`${story.name} | ${story.priority}`} path={`story/${story.id}`}/>
                            </div>
                            <div className='basis-1/4'>
                                <ActionButton action={() =>{
                                    handleEditUserStory(story.id)
                                }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                                </ActionButton>
                            </div>
                            <div className='basis-1/4'>
                                <ActionButton action={() =>{
                                    handleDeleteUserStory(story.id)
                                }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </ActionButton>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}