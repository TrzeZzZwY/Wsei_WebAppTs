import { FC, useEffect, useState } from 'react';
import { LinkButton } from '../common/LinkButton';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { user } from '../../types/user';

interface IProps {

}

export const Navbar: FC<IProps> = props =>{
    const auth = useAuthUser<user>()

    return  (
        <>     
            <div className='flex flex-row border-b-4 h-16 border-slate-700 px-5 text-xl'>
                <LinkButton textValue={`Hello ${auth?.name}`} path=''/>
                <LinkButton textValue='Hallo :D' path=''/>
                <LinkButton textValue='Hallo :D' path=''/>
            </div>
        </>
    )
}