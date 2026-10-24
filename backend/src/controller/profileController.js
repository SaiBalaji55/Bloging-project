import Question from '../models/questionSchema.js';
import Answer from '../models/answerSchema.js';
import User from '../models/userSchema.js';

export const getTags = async(req, res)=>{
    try{
        const tags = await Question.aggregate([
            {$unwind: "$tags"},
            {$group: {_id:"$tags", count:{$sum:1}}},
            {$sort:{count: -1}}
        ]);
        res.status(200).json(tags);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

// GET /tags/:name/questions
export const getQuestionsByTags = async (req, res) => {
    try {
        // Notice how .populate and .sort are chained directly to Question.find
        const questions = await Question.find({ tags: req.params.name.toLowerCase() })
            .populate('userId', 'name username')
            .sort({ createdAt: -1 }); // Use object syntax instead of the string

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfile = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const getUserQuestions = async (req, res) => {
    try {
        const questions = await Question.find({ userId: req.params.id }).sort('-createdAt');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /users/:id/answers
export const getUserAnswers = async (req, res) => {
    try {
        const answers = await Answer.find({ userId: req.params.id })
            .populate('questionId', 'questionTitle')
            .sort('-createdAt');
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};