import Vote from '../models/voteSchema.js';
import Question from '../models/questionSchema.js';
import Answer from '../models/answerSchema.js';

// Added itemType to the parameter list
const processVote = async (req, res, itemType) => {
    const { value } = req.body;
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

        if (value === 0) {
            // Changed from findByIdAndDelete to findOneAndDelete
            await Vote.findOneAndDelete({ userId, itemId, itemType });
            return res.status(200).json({ message: 'Vote removed successfully' });
        }

        const vote = await Vote.findOneAndUpdate(
            { userId, itemId, itemType }, 
            { $set: { value } },
            {  upsert: true, returnDocument: 'after' }
        );
        
        res.status(200).json({ 
            message: `Successfully voted on ${itemType.toLowerCase()}`, 
            vote 
        });
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