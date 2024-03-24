import React from 'react';
import MovieForm from "./MovieForm";
import useKeyHandler from "../../hooks/KeyHandlerHook";
import {addMovie} from "../../operations/operation";

interface Props {
    isOpen: boolean
    onClose: any
}

const AddMovieModal: React.FC<Props> = ({isOpen, onClose}) => {
    useKeyHandler('Escape', onClose);

    const onSubmit = (title: string, description: string) => {
        addMovie(title, description)
            .then(() => onClose)
            .catch(() => console.log('Could not create movie'));
    }

    return (
        <div className={'modal' + (isOpen ? ' is-active' : '')}>
            <div className={'modal-background'} onClick={onClose}/>
            <div className={'modal-card'}>
                <header className={'modal-card-head'}>
                    <p className={'modal-card-title'}>Add Movie</p>
                </header>
                <section className={'modal-card-body'}>
                    <MovieForm onSubmit={onSubmit}/>
                </section>
                <footer className={'modal-card-foot'}>
                    <div>
                        <button onClick={onClose}>Close</button>
                    </div>
                </footer>


            </div>
        </div>
    );
};

export default AddMovieModal;