import { FC, useContext, useEffect, useState } from 'react';
import { LinkButton } from '../common/LinkButton';
import { ActionButton } from '../common/ActionButton';
import { project } from '../../types/project';
import { projectSeriveContext } from '../../contexts/DependencyProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface IProps {

}

export const SideBar: FC<IProps> = props =>{

    const projectSvc = useContext(projectSeriveContext);
    const [projects, setProjects] = useState<project[]>([]);
    const [projectChanged, setProjectChanged] = useState(false);

    useEffect(() =>{
        setProjects(projectSvc.GetAllLS())
    },[projectChanged])

    const handleCreateProject = (event: React.MouseEvent) =>{
        let name = prompt("Enter project name:") ?? "";
        let description = prompt("Enter project description:") ?? "";

        if(!(ValidateProjectName(name) && ValidateProjectDescription(description))){
            alert("Invalid inputs");
            return;
        }

        projectSvc.CrateLS({name: name, description: description});
        setProjectChanged(cng => !cng);
    }

    const handleDeleteProject = (id: string) =>{
        let sure = prompt("Are you sure? (y/n):") ?? "";

        if(sure != "y")
            return;

        projectSvc.DeleteLS(id);
        setProjectChanged(cng => !cng);
    }

    return  (
        <>     
            <div className='flex flex-col border-r-4 border-slate-700 px-5 h-full basis-80 gap-4'>
                <div className='text-lg'>
                    <ActionButton textValue='Add new project' action={handleCreateProject}/>
                </div>

                {
                    projects.map(proj =>
                        <div className='flex flex-row' key={proj.id}>
                            <div className='flex basis-1/2 content-center'>
                                <LinkButton textValue={proj.name} path={`Project/${proj.id}`}/>
                            </div>
                            <div className='basis-1/2'>
                            
                            <ActionButton action={() =>{
                                handleDeleteProject(proj.id)
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
const ValidateProjectName = (name: string) => {
    return 1 == 1 &&
        name.length > 0 &&
        name.length < 50 
}

const ValidateProjectDescription = (description: string) => {
    return 1 == 1 &&
        description.length < 250 
}