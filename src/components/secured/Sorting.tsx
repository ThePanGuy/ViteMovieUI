import React from 'react';
import {PagingHandler} from "../../hooks/PagingHook";

interface Props {
    paging: PagingHandler<any>
}

const Sorting: React.FC<Props> = ({paging}) => {

    const handleSort = (property: string) => {
        paging.sort(property);
    }

    return (
        <div className={"sort"}>
            <div style={{display: "flex", marginTop: "1em", marginBottom: "1em"}}>Sort by:{/*
            */}
                <button className={'link-button'} onClick={() => handleSort('likes')}>
                    Likes
                </button>
                |{/*
                */}
                <button className={'link-button'} onClick={() => handleSort('hates')}>
                    Hates
                </button>
                |{/*
                */}
                <button className={'link-button'} onClick={() => handleSort('creationDate')}>
                    Date
                </button>
            </div>
        </div>
    );
}

export default Sorting;