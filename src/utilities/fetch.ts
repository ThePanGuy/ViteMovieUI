import {Constants} from "./constants";
import {refreshToken} from "../operations/authOperation";

interface CustomResponse {
    status: number,
    ok: boolean,
    json: { message: String }
}

function getAuthToken(): string | null {
    return localStorage.getItem('access_token');
}

export function get<T>(uri: string): Promise<T | any> {
    const request = new Request(Constants.getApiUrl() + uri, headers('GET'));
    const refreshRequest = new Request(Constants.getApiUrl() + uri, headers('GET'));
    return new Promise((resolve, reject) => fetch(request)
        .then(response => handleRefreshToken(response, refreshRequest))
        .then(parseResponse)
        .then((response: CustomResponse) => {
            if (response.ok) {
                return resolve(response.json)
            }
            // extract the error from the servers json
            return reject(response.json.message);
        })
        .catch(error => reject(networkErrorResponse(error))))
}

export async function post<T>(uri: string, data: any): Promise<T | any> {
    const request = new Request(Constants.getApiUrl() +uri, headers('POST', JSON.stringify(data)));
    const refreshRequest = new Request(Constants.getApiUrl() +uri, headers('POST', JSON.stringify(data)));
    return new Promise((resolve, reject) => fetch(request)
        .then(response => handleRefreshToken(response, refreshRequest))
        .then(parseResponse)
        .then((response: CustomResponse) => {
            if (response.ok) {
                return resolve(response.json);
            }
            // extract the error from the server's json
            return reject(response.json.message);
        }).catch((error) => reject(networkErrorResponse(error))))

}

function headers(method: string, data?: any): RequestInit {
    return {
        body: data, // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, same-origin, *omit
        headers: {
            'content-type': 'application/json',
            Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : ''
        },
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'client', // *client, no-referrer,
    }
}

async function handleRefreshToken(response: Response, request: Request) {
    if (response.status === 403 && getAuthToken()) {
        try {
            const data = await refreshToken(localStorage.getItem('refresh_token'));
            localStorage.setItem('access_token', data.access_token);
            request.headers.set('Authorization', `Bearer ${data.access_token}`);
            const res = await fetch(request)
            return res;
        } catch (error) {
            if (error instanceof Response) {
                return error;
            }
            throw error;
        }
    }
    return response;
}

function parseResponse(response: Response): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
        response.json()
            .then((json: any) => {
                if (response.status === 403) {
                    document.location.href = '/login'
                } else if (response.status === 404) {
                    document.location.href = '/error-not-found'
                } else if (response.status === 401) {
                    document.location.href = '/error-no-access'
                } else if (response.status === 426) {
                    resolve({
                        status: response.status,
                        ok: false,
                        json: {message: "There was an issue with the current request. It seems entity is locked by another user"},
                    })
                } else if (response.status === 500) {
                    resolve({
                        status: response.status,
                        ok: false,
                        json: {message: "There is an issue connecting to the services. Please refresh or contact support"},
                    })
                }
                resolve({
                    status: response.status,
                    ok: response.ok,
                    json: json,
                })
            }).catch(error => reject(error));
    });
}

const networkErrorResponse = (error: any) => {
    return {
        status: error.status,
        ok: false,
        json: {message: error.message}
    }
}