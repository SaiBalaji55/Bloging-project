import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion } from '../controller/questionController.js';

const router = express.Router();

router.route('/')
    .get(getQuestions)
    .post(authMiddleware, createQuestion);

router.route('/:id')
    .get(getQuestionById)
    .patch(authMiddleware, updateQuestion)
    .delete(authMiddleware, deleteQuestion);

export default router