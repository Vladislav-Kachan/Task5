import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (fullName, email, password) => {
    const {data} = await $host.post('/users/registration', {fullName, password, email});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post('/users/login', {password,email});   
    localStorage.setItem('token', data);
    return jwt_decode(data);
}

export const getUsers = async () => {
    const {data} = await $authHost.get('/users/table');    
    return data;
}

export const deleteUser = async (email) => {
    const {data} = await $authHost.delete('/users/delete', {data:{email}});
    return data;
}

export const blockUser = async (email) => {
    const {data} = await $authHost.put('/users/block', {email});
    return data;
}

export const unlockUser = async (email) => {
    const {data} = await $authHost.put('/users/unlock', {email});
    return data;
}