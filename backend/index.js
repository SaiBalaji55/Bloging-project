import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './src/routes/authRoutes.js';
import questionRoutes from './src/routes/questionRoutes.js';
import { questionAnswerRoutes, answerRoutes } from './src/routes/answerRoutes.js';
import { questionVoteRoutes, answerVoteRoutes } from './src/routes/voteRoutes.js';
import { questionCommentRoutes, answerCommentRoutes, commentRoutes } from './src/routes/commentRoutes.js';
import { tagRoutes, userRoutes } from './src/routes/profileRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log(`MongoDb connected sucessfully....`)
}).catch((error)=>{
    console.log(error)
})

app.get('/', (req,res)=>{
    res.send("Bloging Api connection ....")
})

app.use('/api/auth', authRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/questions/:id/answers', questionAnswerRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/questions/:id/vote', questionVoteRoutes);
app.use('/api/answers/:id/vote', answerVoteRoutes);
app.use('/api/questions/:id/comments', questionCommentRoutes);
app.use('/api/answers/:id/comments', answerCommentRoutes);
app.use('/api/comments', commentRoutes);

app.use('/api/tags', tagRoutes);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})