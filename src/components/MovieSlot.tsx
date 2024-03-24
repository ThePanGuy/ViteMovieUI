import React, {useEffect, useState} from 'react';
import {MovieReactions, User} from "../models/model";
import {addHate, addLike} from "../operations/operation";

interface Props {
    id?: string,
    title?: string
    uploadedBy?: User
    description?: string
    creationDate?: string,
    authenticated?: boolean,
    likes?: number,
    hates?: number,
    uploadedByFilter?: (id: string) => void
}

const MovieSlot: React.FunctionComponent<Props> = ({
                                                       id, title, uploadedBy,
                                                       description, creationDate, authenticated = false,
                                                       likes, hates, uploadedByFilter
                                                   }) => {
    const [passedDays, setPassedDays] = useState<number>(0)
    const [numberOfLikes, setNumberOfLikes] = useState(likes);
    const [numberOfHates, setNumberOfHates] = useState(hates);

    useEffect(() => {
        const currentDate = new Date();
        const uploadDate = new Date(creationDate || "");
        let differenceInTime = currentDate.getTime() - uploadDate.getTime();
        differenceInTime = Math.floor(differenceInTime / (1000 * 3600 * 24));
        setPassedDays(differenceInTime)
    }, [creationDate])

    const updateReactions = (movieReactions: MovieReactions) => {
        setNumberOfLikes(movieReactions.numberOfLikes);
        setNumberOfHates(movieReactions.numberOfHates);
    }

    const likeMovie = () => {
        if (id) {
            addLike(id)
                .then(response => {
                    updateReactions(response)
                })
                .catch(error => alert(error));
        }
    }

    const hateMovie = () => {
        if (id) {
            addHate(id)
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
        uploadedBy?.id && uploadedByFilter && uploadedByFilter(uploadedBy?.id);
    }


    return (
        <React.Fragment>
            <div className={'movie-card'}>
                <h2>{title}</h2>
                <span>Posted by<button className={'link-button'} onClick={handleUploadedBy}>{uploadedBy?.username}</button> {passedDays} day(s) ago</span>
                <p>{description}</p>
                {decideLikesP()}
            </div>
        </React.Fragment>
    )

};

export default MovieSlot;