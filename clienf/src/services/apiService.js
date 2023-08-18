import axios from "axios";
export const API_URL = "http://localhost:3006";
export const TOKEN_KEY = "token";


export const doApiGet = async (_url) => {
    try {
        const { data } = await axios({
            url: _url,
            method: "GET",
            headers: {
                "x-api-key": localStorage[TOKEN_KEY]
            }
        })
        return data;
    }
    catch (err) {
        throw err;
    }
}

export const doApiMethod = async (_url, _method, _bodyData) => {
    try {
        const { data } = await axios({
            url: _url,
            method: _method,
            data: _bodyData,
            headers: {
                "x-api-key": localStorage[TOKEN_KEY]
            }
        })
        return data;
    }
    catch (err) {
        throw err;
    }
}