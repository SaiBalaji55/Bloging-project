import axiosClient from "./axiosConfig";

export const fetchQuestionComments = async (questionId) =>{
    const response = await axiosClient.get(`/questions/${questionId}/comments`);
    return response.data;
}

export const createQuestionComment = async (questionId, content)=>{
    const response = await axiosClient.post(`/questions/${questionId}/comments`, {content});
    return response.data;
}

export const createAnswerComment = async (answerId, content)=>{
    const response = await axiosClient.post(`/answers/${answerId}/comments`, {content});
    return response.data;
}

export const updateComment = async (id, content)=>{
    const response = await axiosClient.patch(`/comments/${id}`, {content});
    return response.data;
}

export const deleteComment = async (id)=>{
    const response = await axiosClient.delete(`/comments/${id}`);
    return response.data;
}