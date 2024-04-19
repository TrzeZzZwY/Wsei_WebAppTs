import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
interface IProps {
    textValue: string,
    path: string,
}

export const LinkButton: FC<IProps> = props =>{
    return  (
        <>     
            <Link to={props.path} className={`px-3 py-2 hover:text-sky-700`}>
                {props.textValue}
            </Link>
        </>
    )
}