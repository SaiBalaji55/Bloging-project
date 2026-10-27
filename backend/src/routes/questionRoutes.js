import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createQuestion, getQuestionById, updateQuestion, deleteQuestion, getAllQuestions } from '../controller/questionController.js';

const router = express.Router();

router.route('/')
    // 1. FIX: Only use getAllQuestions here
    .get(getAllQuestions)
    .post(authMiddleware, createQuestion);

router.route('/:id')
    .get(getQuestionById)
    .patch(authMiddleware, updateQuestion)
    .delete(authMiddleware, deleteQuestion);

export default router;