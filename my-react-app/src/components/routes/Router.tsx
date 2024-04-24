import { FC } from 'react';
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './MainLayout';
import { LinkButton } from '../common/LinkButton';
import { ProjectContent } from './Project/ProjectContent';
import { UserStoryContent } from './UserStory/UserStoryContent';

interface IProps{

}

export const Router: FC<IProps> = props =>{
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route index path='/' element={<></>}/>
                <Route path='/Project/:projectId'element={<ProjectContent/>}>
                    <Route path='' element={<></>}/>
                    <Route path='/Project/:projectId/Story/:storyId'element={<UserStoryContent/>}>
                        <Route path='' element={<></>}/>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}