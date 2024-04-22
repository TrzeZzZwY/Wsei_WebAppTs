import { FC } from 'react';
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './MainLayout';
import { LinkButton } from '../common/LinkButton';
import { ProjectContent } from './Project/ProjectContent';

interface IProps{

}

export const Router: FC<IProps> = props =>{
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route index path='/' element={<></>}/>
                <Route path='/Project/:projectId'element={<ProjectContent/>}>
                    <Route path='' element={<></>}/>
                </Route>
            </Route>
        </Routes>
    )
}