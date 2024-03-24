import {PagingHandler, SingleValueFilterItem, usePaging} from "../../hooks/PagingHook";
import {MoviePage} from "../../models/model";
import React from "react";
import RenderPaging from "../RenderPaging";
import MovieSlot from "../MovieSlot";

interface Props {
    paging: PagingHandler<MoviePage>
}

const SecuredMovies: React.FunctionComponent<Props> = ({paging}) => {

    const uploadedBy = (id: string) => {
        const filter: SingleValueFilterItem = {name: 'uploadedBy', value: id}
        paging.filter(filter)
    }

    return (
        <div className={'main-content'}>
            {!paging.isFetching && !paging.isLoading && paging.response !== undefined && paging.response.content !== undefined &&
                paging.response.content.map((moviePage: MoviePage, index) => {
                    return <MovieSlot key={'movie-slot-' + index} {...moviePage} uploadedByFilter={uploadedBy} authenticated/>
                })
            }
            <RenderPaging {...paging}/>
        </div>
    )
};

export default SecuredMovies;