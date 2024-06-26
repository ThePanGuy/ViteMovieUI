import React from 'react';
import {usePaging} from "../hooks/PagingHook";
import {MoviePage} from "../models/model";
import RenderPaging from "./RenderPaging";
import MovieSlot from "./MovieSlot";

const Movies: React.FunctionComponent = () => {
    const paging = usePaging<MoviePage>('/home/movies', 12, 0);

    return (
        <div>
            {!paging.isFetching && !paging.isLoading &&
                paging.response?.content.map((moviePage: MoviePage, index) => (
                    <MovieSlot key={'movie-slot-' + index} moviePage={moviePage}/>
                ))
            }
            <RenderPaging {...paging}/>
        </div>
    )
};

export default Movies;