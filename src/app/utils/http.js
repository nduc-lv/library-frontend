import axios, { AxiosError } from "axios";
import baseURL from "./baseURL";

const postWithAccessToken = async (url, body) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(url, body, {headers: {"Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json"}});
        return response;
    }
    catch (e) {
        if (e instanceof AxiosError) {
            switch (e.response.status) {
                case 403:
                    try {
                        const refreshToken = localStorage.getItem("refreshToken");
                        if (!refreshToken) {
                            localStorage.clear();
                            throw e;
                        }
                        else {
                            const response = await axios.get(`${baseURL}/refresh`, {headers: {"Authorization": `Bearer ${refreshToken}`}});
                            localStorage.setItem("accessToken", response.data.accessToken);
                            const response2 = await axios.post(url, body, {headers: {"Content-Type" : "application/json", "Authorization": `Bearer ${response.data.accessToken}`}});
                            return response2
                        }
                    }
                    catch (e) {
                        localStorage.clear();
                        throw e
                    }
                default:
                    throw e;
            }
        }
    }
}
const getWithAccessToken = async (url) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(url, {headers: {"Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json"}});
        return response;
    }
    catch (e) {
        if (e instanceof AxiosError) {
            switch (e.response.status) {
                case 403:
                    try {
                        const refreshToken = localStorage.getItem("refreshToken");
                        if (!refreshToken) {
                            localStorage.clear();
                            throw e;
                        }
                        else {
                            const response = await axios.get(`${baseURL}/refresh`, {headers: {"Authorization": `Bearer ${refreshToken}`}});
                            localStorage.setItem("accessToken", response.data.accessToken);
                            const response2 = await axios.get(url, {headers: {"Content-Type" : "application/json", "Authorization": `Bearer ${response.data.accessToken}`}});
                            return response2
                        }
                    }
                    catch (e) {
                        localStorage.clear();
                        throw e
                    }
                default:
                    localStorage.clear();
                    throw e;
            }
        }
    }
}
const postWithAccessTokenMultipart = async (url, body) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(url, body, {headers: {"Authorization": `Bearer ${accessToken}`, "Content-Type": "multipart/form-data"}});
        return response;
    }
    catch (e) {
        if (e instanceof AxiosError) {
            switch (e.response.status) {
                case 403:
                    try {
                        const refreshToken = localStorage.getItem("refreshToken");
                        if (!refreshToken) {
                            localStorage.clear();
                            throw e;
                        }
                        else {
                            const response = await axios.get(`${baseURL}/refresh`, {headers: {"Authorization": `Bearer ${refreshToken}`}});
                            localStorage.setItem("accessToken", response.data.accessToken);
                            const response2 = await axios.post(url, body, {headers: {"Content-Type" : "multipart/formdata", "Authorization": `Bearer ${response.data.accessToken}`}});
                            return response2
                        }
                    }
                    catch (e) {
                        localStorage.clear();
                        throw e
                    }
                default:
                    throw e;
            }
        }
    }
}
const http = {
    postWithAccessToken,
    postWithAccessTokenMultipart,
    getWithAccessToken
}
export default http