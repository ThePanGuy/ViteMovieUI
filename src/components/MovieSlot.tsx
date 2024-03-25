import React, {useEffect, useState} from 'react';
import {MoviePage, MovieReactions} from "../models/model";
import {addHate, addLike} from "../operations/operation";

interface Props {
    moviePage: MoviePage,
    uploadedByFilter?: (id: string) => void
}

const MovieSlot: React.FunctionComponent<Props> = ({
                                                       moviePage,
                                                       authenticated = false,
                                                       uploadedByFilter
                                                   }) => {
    const [passedDays, setPassedDays] = useState<number>(0)
    const [numberOfLikes, setNumberOfLikes] = useState(moviePage.likes);
    const [numberOfHates, setNumberOfHates] = useState(moviePage.hates);

    useEffect(() => {
        const currentDate = new Date();
        const uploadDate = new Date(moviePage.creationDate ?? "");
        let differenceInTime = currentDate.getTime() - uploadDate.getTime();
        differenceInTime = Math.floor(differenceInTime / (1000 * 3600 * 24));
        setPassedDays(differenceInTime)
    }, [moviePage.creationDate])

    const updateReactions = (movieReactions: MovieReactions) => {
        setNumberOfLikes(movieReactions.numberOfLikes);
        setNumberOfHates(movieReactions.numberOfHates);
    }

    const likeMovie = () => {
        if (moviePage.id) {
            addLike(moviePage.id)
                .then(response => {
                    updateReactions(response)
                })
                .catch(error => alert(error));
        }
    }

    const hateMovie = () => {
        if (moviePage.id) {
            addHate(moviePage.id)
                .then(response => {
                    updateReactions(response)
                })
                .catch(error => alert(error));
        }
    }

    const decideLikesP = () => {
        if (authenticated) {
            return <p>{numberOfLikes}
                <button className={'link-button'} onClick={likeMovie}>likes</button>
                | {numberOfHates}
                <button className={'link-button'} onClick={hateMovie}>hates</button>
            </p>
        } else {
            return <p>{numberOfLikes} Likes | {numberOfHates} Hates</p>
        }
    }

    const handleUploadedBy = () => {
        moviePage.userId && uploadedByFilter && uploadedByFilter(moviePage.userId);
    }


    return (
        <div className={'movie-card'}>
            <h2>{moviePage.title}</h2>
            <span>Posted by<button className={'link-button'}
                                   onClick={handleUploadedBy}>{moviePage.username}</button>
                {passedDays} day(s) ago</span>
            <p>{moviePage.description}</p>
            {decideLikesP()}
        </div>
    )

};

export default MovieSlot;