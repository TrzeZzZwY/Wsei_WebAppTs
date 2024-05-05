import { FC, useEffect, useState } from 'react';
interface IProps {
    name: string,
    value: string | null,
    values: [string,string][],
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const FormSelect: FC<IProps> = props =>{
    return  (
        <div className='m-3 p-2 flex flex-row'>
            <label className='basis-1/5'>{props.name}: </label>
            <select name={props.name} value={props.value ? props.value : "-"} onChange={props.onChange} className='bg-gray-900 basis-4/5 bg-slate-800 p-2 border-1 rounded-md'>
                <option value="-">-</option>
                {
                    props.values.map(opt =>
                        <option value={opt[0]} key={opt[0]}>{opt[1]}</option>
                        )
                }
            </select>
        </div>
    )
}