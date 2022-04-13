import { $authHost } from "./index";

export const getMails = async (receiverId) => {
    const {data} = await $authHost.post('/email/getmail',{receiverId});    
    return data;
}

export const updateState = async (id) => {
    const {data} = await $authHost.put('/email/update',{id});    
    return data;
}

export const sendMail = async (userId, receiverId, title, message) => {
    const {data} = await $authHost.post('/email/newmail',{userId, receiverId, title, message});    
    return data;
}