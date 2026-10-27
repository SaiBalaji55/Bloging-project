import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { voteOnAnswer, voteOnQuestion } from '../controller/voteController.js';

export const questionVoteRoutes = express.Router({mergeParams: true});
questionVoteRoutes.post('/', authMiddleware, voteOnQuestion);

export const answerVoteRoutes = express.Router({mergeParams: true});
answerVoteRoutes.post('/', authMiddleware, voteOnAnswer)