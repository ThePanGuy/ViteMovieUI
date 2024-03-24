import React, {useEffect, useState} from 'react';
import AddMovieModal from "./AddMovieModal";

interface Props {
    authenticated?: boolean
}

const Actions: React.FC<Props> = ({authenticated = false}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'visible';
        }
    }, []);

    const openModal = () => {
        setIsModalOpen(true)
        document.body.style.overflow = 'hidden';
    }

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'visible';
    }


    return (
        <div className={'side-actions'}>
            <button onClick={openModal}>
                New Movie
            </button>
            <AddMovieModal isOpen={isModalOpen} onClose={closeModal}/>
        </div>
    );
};

export default Actions;