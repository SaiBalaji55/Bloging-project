import axiosClient from "./axiosConfig";

export const fetchTags = async ()=>{
    const response = await axiosClient.get(`/tags`);
    return response.data;
}

export const fetchQuestionsByTag = async(tagName)=>{
    const response = await axiosClient.get(`/questions?tag=${tagName}`);
    return response.data;
}

export const fetchUserProfile = async(userId)=>{
    const response = await axiosClient.get(`/users/${userId}`);
    return response.data;
}

export const fetchUserQuestions = async (userId)=>{
    const response = await axiosClient.get(`/users/${userId}/questions`);
    return response.data;
}

export const fetchUserAnswers = async(userId)=>{
    const response = await axiosClient.get(`/users/${userId}/answers`);
    return response.data;
}

export const fetchAllUsers = async ()=>{
    const response = await axiosClient.get('/users');
    return response.data;
}