import axiosClient from "./axiosConfig";

export const fetchQuestions = async (searchQuery = '')=>{
    const url = searchQuery ? `/questions?search=${encodeURIComponent(searchQuery)}`:`/questions`;
    const response = await axiosClient.get(url);
    return response.data;
}

export const fetchQuestionById = async(id)=>{
    const response = await axiosClient.get(`/questions/${id}`);
    return response.data;
}

export const createQuestion = async (questionData) =>{
    const response = await axiosClient.post(`/questions`, questionData);
    return response.data;
}

export const updateQuestion = async (id, questionData)=>{
    const response = await axiosClient.patch(`/questions/${id}`, questionData);
    return response.data;
}

export const deleteQuestion = async (id)=>{
    const response = await axiosClient.delete(`/questions/${id}`);
    return response.data;
}

export const voteQuestion = async (id, voteValue)=>{
    const response = await axiosClient.post(`/questions/${id}/vote`, {value: voteValue});
    return response.data;
}