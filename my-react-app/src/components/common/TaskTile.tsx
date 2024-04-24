import { FC, useEffect, useState } from 'react';

interface IProps {
    textValue: string,
    action: () => void
}

export const TaskTile: FC<IProps> = props =>{
    return  (
        <button onClick={props.action}>     
            <div className={`flex flex-row px-3 py-2 border-2 m-4 justify-center hover:text-amber-600 hover:border-amber-600`}>
                <span>{props.textValue}</span>
            </div>
        </button>
    )
}