import express from 'express';
import {getTags, getQuestionsByTags, getUserProfile, getUserQuestions, getUserAnswers} from '../controller/profileController.js';

export const tagRoutes = express.Router();

tagRoutes.get('/', getTags);
tagRoutes.get('/:name/questions', getQuestionsByTags);

export const userRoutes = express.Router();

userRoutes.get('/:id', getUserProfile);
userRoutes.get('/:id/questions', getUserQuestions);
userRoutes.get('/:id/answers', getUserAnswers);