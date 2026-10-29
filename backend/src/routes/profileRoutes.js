import express from 'express';
import {getTags, getQuestionsByTags, getUserProfile, getUserQuestions, getUserAnswers, getAllUsers, getDashboardStats} from '../controller/profileController.js';
import {authMiddleware } from '../middleware/authMiddleware.js';

export const tagRoutes = express.Router();

tagRoutes.get('/', getTags);
tagRoutes.get('/:name/questions', getQuestionsByTags);

export const dashboardRoutes = express.Router();
dashboardRoutes.get('/dashboard', authMiddleware, getDashboardStats)

export const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserProfile);
userRoutes.get('/:id/questions', getUserQuestions);
userRoutes.get('/:id/answers', getUserAnswers);