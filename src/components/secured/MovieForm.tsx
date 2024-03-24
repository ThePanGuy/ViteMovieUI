import React, {useState} from 'react';

interface MovieFormProps {
    onSubmit: (title: string, description: string) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({onSubmit}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(title, description);
        // Optionally, you can reset the form fields after submission
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={handleTitleChange} required/>
            </label>
            <br/>
            <label>
                Description:
                <input type="text" value={description} onChange={handleDescriptionChange} required/>
            </label>
            <br/>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MovieForm;