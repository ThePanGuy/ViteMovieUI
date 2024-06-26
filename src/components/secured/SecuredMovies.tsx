import {PagingHandler, SingleValueFilterItem} from "../../hooks/PagingHook";
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
            {!paging.isFetching && !paging.isLoading &&
                paging.response?.content.map((moviePage: MoviePage, index) => (
                    <MovieSlot key={'movie-slot-' + index} moviePage={moviePage} uploadedByFilter={uploadedBy}
                               authenticated/>
                ))
            }
            <RenderPaging {...paging}/>
        </div>
    )
};

export default SecuredMovies;