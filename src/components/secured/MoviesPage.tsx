import React from 'react';
import Header from "../Header";
import SecuredMovies from "./SecuredMovies";
import Actions from "./Actions";
import Sorting from "./Sorting";
import {usePaging} from "../../hooks/PagingHook";
import {MoviePage} from "../../models/model";

function MoviesPage() {
    const paging = usePaging<MoviePage>('/secured/movie/page', 12, 0);


    return (
        <div className="App">
            <Header/>
            <div className={'main'}>
                <Sorting paging={paging}/>
                <div className={"flex-container"}>
                    <SecuredMovies paging={paging}/>
                    <Actions/>
                </div>
            </div>
        </div>
    );
}

export default MoviesPage;
