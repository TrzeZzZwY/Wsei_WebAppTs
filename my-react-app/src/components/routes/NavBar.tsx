import { FC, useContext, useEffect, useState } from 'react';
import { LinkButton } from '../common/LinkButton';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { user } from '../../types/user';
import { ActionButton } from '../common/ActionButton';
import { useTheme } from '../../contexts/DependencyProvider';

interface IProps {

}

export const Navbar: FC<IProps> = props =>{
    const auth = useAuthUser<user>()
    const theme = useTheme();

    return  (
        <>     
            <div className='flex flex-row border-b-4 h-16 border-slate-700 px-5 text-xl'>
                <LinkButton textValue={`Hello ${auth?.name}`} path=''/>
                <ActionButton textValue='Mode' action={() => theme.setTheme(t => !t)}/>
            </div>
        </>
    )
}