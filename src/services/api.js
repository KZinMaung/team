import axios from "axios";

export const host = "http://localhost:3001";
export const call = async(method, path, data)=>{
    const response = await axios[method](`${host}/${path}`, data);
    return response;
}

export const setAccessToken = (token) =>{
    if (token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else{
        delete axios.defaults.headers.common["Authorization"];
    }
};