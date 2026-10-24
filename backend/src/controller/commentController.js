import Comment from '../models/commentSchema.js';
import Question from '../models/questionSchema.js';
import Answer from '../models/answerSchema.js';

export const getQuestionComments = async(req,res)=>{
    try{
        const comments = await Comment.find({
            itemId: req.params.id,
            itemType: 'Question'
        }).populate('userId', 'name username').sort({createdAt: 1});
        res.status(200).json(comments);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const addComment = async (req, res, itemType)=>{
    const {content} = req.body;
    const itemId = req.params.id;
    const userId = req.user.id;

    if(!content){
        return res.status(400).json({message: 'Comment content is required'});
    }

    try{
        const TargetModel = itemType === 'Question' ? Question:Answer;
        const itemExists = await TargetModel.findById(itemId);

        if(!itemExists){
            return req.status(404).json({message: `${itemType} not found`});
        }

        const newComment = new Comment({userId, itemId, itemType, content});
        await newComment.save();
        res.status(201).json({message: 'Comment added successfully', comment: newComment})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const addQuestionComment = (req,res)=> addComment(req,res, 'Question');

export const addAnswerComment = (req,res)=> addComment(req,res, 'Answer');

export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        
        if (comment.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to edit this comment' });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: { content: req.body.content } },
            { returnDocument: 'after', runValidators: true } // Removed new: true
        );

        res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /comments/:id
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        if (comment.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};