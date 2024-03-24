import Header from "../Header";
import React, {ChangeEvent, useState} from "react";
import {register} from "../../operations/authOperation";
import {useAuth} from "../AuthContext";
import {useNavigate} from "react-router-dom";

export function SignUpPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState<string | null>(null);


    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register(formData.username, formData.password);

            await auth.login(formData.username, formData.password);

            navigate('/movies');
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError(null);
    }


    return (
        <>
            <Header loggedIn={false}/>
            <form onSubmit={submit}>
                <input name={'username'} type={'text'} value={formData.username} onChange={handleChange} placeholder={'Username'}/>
                <input name={'password'} type={'password'} value={formData.password} onChange={handleChange} placeholder={'Password'}/>
                <input name={'confirmPassword'} type={'password'} value={formData.confirmPassword} onChange={handleChange} placeholder={'Confirm Password'}/>
                <button>Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}