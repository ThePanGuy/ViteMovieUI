import React from 'react';
import {PagingHandler} from "../../hooks/PagingHook";

interface Props {
    paging: PagingHandler<any>
}

const Sorting: React.FC<Props> = ({paging}) => {

    const handleClick = (property: string) => {
        paging.sort(property);
    }

    return (
        <div className={"sort"}>
            <p style={{display: "flex"}}>Sort by:
                <button className={'link-button'} onClick={() => handleClick('Likes')}>
                    Likes
                </button> |
                <button className={'link-button'} onClick={() => handleClick('Hates')}>
                    Hates
                </button>|
                <button className={'link-button'} onClick={() => handleClick('Date')}>
                    Date
                </button>
            </p>
        </div>
    );
}

export default Sorting;