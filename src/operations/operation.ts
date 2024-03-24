import {get, post} from "../utilities/fetch";
import {MovieReactions} from "../models/model";

export const addLike = (movieId: string): Promise<MovieReactions> => {
    return new Promise<MovieReactions>((resolve, reject) => {
        get('/secured/reaction/like/'+movieId)
            .then((response: MovieReactions) => resolve(response))
            .catch(error => reject(error));
    })
}

export const addHate = (movieId: string): Promise<MovieReactions> => {
    return new Promise<MovieReactions>((resolve, reject) => {
        get('/secured/reaction/hate/'+movieId)
            .then((response: MovieReactions) => resolve(response))
            .catch(error => reject(error));
    })
}

export const addMovie = (title: string, description: string) => {
    return new Promise<any>((resolve, reject) => {
        post('/secured/movie/add', {title, description})
            .then(resolve)
            .catch(reject);
    })
}