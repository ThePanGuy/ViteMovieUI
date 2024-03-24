import React from 'react';
import {usePaging} from "../hooks/PagingHook";
import {MoviePage} from "../models/model";
import RenderPaging from "./RenderPaging";
import MovieSlot from "./MovieSlot";

const Movies: React.FunctionComponent = () => {
    const paging = usePaging<MoviePage>('/home/movies', 12, 0);

    return (
        <div>
            {!paging.isFetching && !paging.isLoading && paging.response !== undefined && paging.response.content !== undefined &&
                paging.response.content.map((moviePage: MoviePage, index) => {
                    return <MovieSlot key={'movie-slot-' + index} {...moviePage}/>
                })
            }
            <RenderPaging {...paging}/>
        </div>
    )
};

export default Movies;