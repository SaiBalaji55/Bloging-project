import Vote from '../models/voteSchema.js';
import Question from '../models/questionSchema.js';
import Answer from '../models/answerSchema.js';

const processVote = async (req, res, itemType) => {
    // 1. CHANGE 'const' TO 'let' SO WE CAN MODIFY IT
    let { value } = req.body; 
    const itemId = req.params.id;
    const userId = req.user.id;

    if (![1, -1, 0].includes(value)) {
        return res.status(400).json({ message: 'Vote value must be 1, -1, or 0' });
    }

    try {
        const TargetModel = itemType === 'Question' ? Question : Answer;
        const itemExists = await TargetModel.findById(itemId);

        if (!itemExists) {
            return res.status(404).json({ message: `${itemType} not found` });
        }

        const existingVote = await Vote.findOne({ userId, itemId, itemType });
        const previousValue = existingVote ? existingVote.value : 0;

        // 2. THE MAGIC FIX: TOGGLE VOTE OFF
        // If the user clicks the exact same vote button again, remove their vote
        if (value === previousValue) {
            value = 0;
        }

        // Calculate how much the total score should change
        const scoreChange = value - previousValue;

        // Save or remove the vote document
        if (value === 0) {
            await Vote.findOneAndDelete({ userId, itemId, itemType });
        } else {
            await Vote.findOneAndUpdate(
                { userId, itemId, itemType }, 
                { $set: { value } },
                { upsert: true }
            );
        }

        // Update the total score on the Question or Answer
        await TargetModel.findByIdAndUpdate(itemId, {
            $inc: { voteScore: scoreChange }
        });
        
        res.status(200).json({ message: `Successfully voted on ${itemType.toLowerCase()}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const voteOnQuestion = async (req, res) => {
    return processVote(req, res, 'Question');
}

export const voteOnAnswer = async (req, res) => {
    return processVote(req, res, 'Answer');
}