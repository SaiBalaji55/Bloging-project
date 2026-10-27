import axiosClient from "./axiosConfig";

export const fetchAnswers = async (questionId)=>{
    const response = await axiosClient.get(`/questions/${questionId}/answers`);
    return response.data;
}

export const createAnswer = async (questionId, answerData)=>{
    const response = await axiosClient.post(`/questions/${questionId}/answers`, answerData);
    return response.data;
}

export const deleteAnswer = async (id)=>{
    const response = await axiosClient.delete(`/answers/${id}`);
    return response.data;
}

export const voteAnswer = async (id, value)=>{
    const response = await axiosClient.post(`/answers/${id}/vote`, {value});
    return response.data;
}

export const acceptAnswer = async (id)=>{
    const response = await axiosClient.patch(`/answers/${id}/accept`);
    return response.data;
}