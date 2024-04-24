import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
interface IProps {
    name: string,
    type: string,
    value: string,
}

export const FormInput: FC<IProps> = props =>{
    return  (
        <div className='m-3 p-2 flex flex-row'>
            <label className='basis-1/5'>{props.name}: </label>
            {props.type == "textarea" ?
            <textarea className='basis-4/5 bg-slate-800 p-2 border-1 rounded-md resize-none' maxLength={300} rows={6} cols={40} name={props.name} value={props.value}/>
            :
            <input className='basis-4/5 bg-slate-800 p-2 border-1 rounded-md' name={props.name} type={props.type} value={props.value}/>
            }
        </div>
    )
}