import {Constants} from "../utilities/constants";
import {post} from "../utilities/fetch";

export const login = async (username: string, password: string) => {
    const response = await fetch(`${Constants.getApiUrl()}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username, password: password}),
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }

    return await response.json();
};


export const register = async (username: string, password: string) => {
    try {
        const response = await post('home/sign-up', {username, password});
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
}

export const refreshToken = async (refreshToken: string | null) => {
    const response = await fetch(`${Constants.getApiUrl()}/home/token/refresh`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: refreshToken ? `Bearer ${refreshToken}` : ''
        }
    });

    if (!response.ok) {
        throw response;
    }
    console.log('Token refreshed');
    return await response.json();
};