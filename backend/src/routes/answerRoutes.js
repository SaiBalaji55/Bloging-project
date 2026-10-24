import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { 
    getAnswersForQuestion, 
    submitAnswer, 
    updateAnswer, 
    deleteAnswer, 
    acceptAnswer 
} from '../controller/answerController.js';

// Router for /questions/:id/answers
export const questionAnswerRoutes = express.Router({ mergeParams: true });
questionAnswerRoutes.route('/')
    .get(getAnswersForQuestion)
    .post(authMiddleware, submitAnswer);

// Router for /answers
export const answerRoutes = express.Router();
answerRoutes.route('/:id')
    .patch(authMiddleware, updateAnswer)
    .delete(authMiddleware, deleteAnswer);

answerRoutes.route('/:id/accept')
    .patch(authMiddleware, acceptAnswer);