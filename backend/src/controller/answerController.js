import Answer from '../models/answerSchema.js';
import Question from '../models/questionSchema.js';

export const getAnswersForQuestion = async(req,res)=>{
    try{
        const answers = await Answer.find({questionId: req.params.id}).populate('userId', 'name username');
        answers.sort((a, b) => (b.isAccepted - a.isAccepted) || (new Date(a.createdAt) - new Date(b.createdAt)));
        res.status(200).json(answers)
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const submitAnswer = async(req,res)=>{
    const {content} = req.body;
    const questionId = req.params.id;
    const userId = req.user.id;

    if(!content){
        return res.status(400).json({ message: 'Answer content is required' });
    }
    try{
        const question = await Question.findById(questionId);
        if(!question){
            return res.status(404).json({message: 'Question not found'});
        }
        const newAnswer = new Answer({
            userId,
            questionId,
            content
        });

        await newAnswer.save();
        res.status(201).json({message: 'Answer Submitted successfully', answer: newAnswer});
    }catch (error) {
            res.status(500).json({ message: error.message });
    }
}

export const updateAnswer = async(req,res)=>{
    try{
        const answer = await Answer.findById(req.params.id)
        if(!answer){
            return res.status(404).json({ message: 'Answer not found' });
        }
        if(answer.userId.toString()!== req.user.id){
            return res.status(403).json({message: 'Not authorized to edit this answer'})
        }

        const updatedAnswer = await Answer.findByIdAndUpdate(
            req.params.id,
            {$set:{ content: req.body.content}},
            {returnDocument:'after', runValidators: true}
        );
        res.status(200).json({message:'Answer update sucessfully', answer: updateAnswer})
    }catch (error) {
            res.status(500).json({ message: error.message });
    }
}

export const deleteAnswer = async(req,res)=>{
    try{
        const answer = await Answer.findById(req.params.id);
        if(!answer){
            return res.status(404).json({message: 'Answer not found'});
        }
        if(answer.userId.toString() !== req.user.id){
            return res.status(403).json({message: 'Not authorized to delete this answer'});
        }
        await Answer.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Answer deleted sucessfully'})
    }catch (error) {
            res.status(500).json({ message: error.message });
    }
}

export const acceptAnswer = async(req,res)=>{
    try{
        const answer = await Answer.findById(req.params.id);
        if(!answer){
            return res.status(404).json({ message: 'Answer not found' });
        }

        const question = await Question.findById(answer.questionId);
        if(!question){
            return res.status(401).json({message:'Original question not found'})
        }
        if (question.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Only the question author can accept answers' });
        }

        await Answer.updateMany(
            {questionId: answer.questionId},
            {$set: {isAccepted: false}}
        );

        answer.isAccepted = true;
        await answer.save();
        res.status(200).json({ message: 'Answer accepted successfully', answer });
    }catch (error) {
            res.status(500).json({ message: error.message });
    }
}