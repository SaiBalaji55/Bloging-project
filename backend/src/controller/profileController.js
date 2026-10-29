import Question from '../models/questionSchema.js';
import Answer from '../models/answerSchema.js';
import User from '../models/userSchema.js';
import Comment from '../models/commentSchema.js'

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

export const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find().select('-password').sort('-createdAt')
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getDashboardStats = async (req, res) => {
    try {
        // 1. Ultra-safe User ID extraction (handles multiple middleware styles)
        let userId = req.userId || req.user?.id || req.user?._id || (typeof req.user === 'string' ? req.user : null);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: Could not find User ID in token." });
        }

        // Convert to string to avoid matching issues
        const userIdStr = userId.toString();

        // 2. Count Questions safely
        const questionsAsked = await Question.countDocuments({ userId: userIdStr });

        // 3. Count Answers safely (Try/Catch in case the Answer model is missing/broken)
        let answersPosted = 0;
        try {
            if (Answer) {
                answersPosted = await Answer.countDocuments({ userId: userIdStr });
            }
        } catch (err) {
            console.log("⚠️ Skipping answers count - Answer model issue");
        }

        // 4. Safe Aggregation for Views (Try/Catch in case of invalid ObjectId)
        let totalViews = 0;
        try {
            const viewStats = await Question.aggregate([
                { $match: { userId: new mongoose.Types.ObjectId(userIdStr) } },
                { $group: { _id: null, totalViews: { $sum: { $ifNull: ["$views", 0] } } } }
            ]);
            totalViews = viewStats.length > 0 ? viewStats[0].totalViews : 0;
        } catch (aggErr) {
            console.log("⚠️ Skipping views count - Aggregation issue");
        }

        // 5. Send response
        res.status(200).json({
            questionsAsked,
            answersPosted,
            commentsPosted: 0,
            totalViews
        });

    } catch (error) {
        // This will print the EXACT reason it crashed in your Node.js terminal
        console.error("🔥 DASHBOARD CRASH:", error);
        res.status(500).json({ message: "Server error fetching stats: " + error.message });
    }
};