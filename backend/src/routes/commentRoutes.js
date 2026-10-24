import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { 
    getQuestionComments, addQuestionComment, addAnswerComment, 
    updateComment, deleteComment 
} from '../controller/commentController.js';

// For /questions/:id/comments
export const questionCommentRoutes = express.Router({ mergeParams: true });
questionCommentRoutes.route('/')
    .get(getQuestionComments)
    .post(authMiddleware, addQuestionComment);

// For /answers/:id/comments
export const answerCommentRoutes = express.Router({ mergeParams: true });
answerCommentRoutes.post('/', authMiddleware, addAnswerComment);

// For /comments/:id
export const commentRoutes = express.Router();
commentRoutes.route('/:id')
    .patch(authMiddleware, updateComment)
    .delete(authMiddleware, deleteComment);