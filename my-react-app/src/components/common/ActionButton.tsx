import { FC, useEffect, useState } from 'react';
interface IProps {
    textValue?: string,
    action: (event: React.MouseEvent) => void
    children?: React.ReactNode
}

export const ActionButton: FC<IProps> = props =>{
    return  (
        <>     
            <button onClick={(e) => props.action(e)} className='px-3 py-2 border-2 border-solid rounded-lg hover:border-emerald-900 hover:text-emerald-900'>
                {props.textValue}
                {props.children}
            </button>
        </>
    )
}