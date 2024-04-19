import { FC } from 'react';
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './MainLayout';
import { LinkButton } from '../common/LinkButton';
import { ProjectLayout } from './Project/ProjectLayout';

interface IProps{

}

export const Router: FC<IProps> = props =>{
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route index path='/' element={<></>}/>
                <Route path='/Project/:projectId'element={<ProjectLayout/>}>
                    <Route path='' element={<></>}/>
                </Route>
            </Route>
        </Routes>
    )
}