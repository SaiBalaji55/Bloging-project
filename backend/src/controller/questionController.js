import Question from '../models/questionSchema.js';

export const createQuestion = async(req, res)=>{
    const {questionType, questionTitle, questionDescription, tags, postingDestination}= req.body;
    const userId = req.user.id;

    if(!questionType || !questionTitle || !questionDescription || !tags || !postingDestination){
        return res.status(400).json({message: 'Compulsory details are required'})
    }

    try{
        const newQuestion = new Question({
            userId,
            questionType,
            questionTitle,
            questionDescription,
            tags,
            postingDestination
        })

        await newQuestion.save();
        res.status(201).json({ message: `${questionTitle} will be posted successfully` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getQuestions = async(req,res)=>{
    try{
        const {page=1, limit =10, search, questionType, tag, sort ='-createAt'} = req.query;
        const query = {};

        if(search){
            query.questionTitle = {$regex: search, $options: 'i'};
        }
        if(questionType){
            query.questionType = questionType;
        }
        if(tag){
            query.tags = tag.toLowerCase();
        }
        const skip = (page-1)*limit;

        const questions = await Question.find(query).populate('userId', 'name username').sort(sort).skip(Number(skip)).limit(Number(limit));

        const total = await Question.countDocuments(query);
        res.status(200).json({
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            questions
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getQuestionById = async(req,res)=>{
    try{
        const question = await Question.findById(req.params.id).populate('userId', 'name username');
        if(!question){
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const updateQuestion = async(req, res)=>{
    try{
        const question = await Question.findById(req.params.id);

        if(!question){
            return res.status(404).json({ message: 'Question not found' });
        }
        if(question.userId.toString()!== req.user.id){
            return res.status(403).json({ message: 'Not authorized to edit this question' });
        }

        const updateQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {returnDocument: 'after', runValidators: true}
        );

        res.status(200).json({ message: 'Question updated successfully', question: updateQuestion });
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Verify the user owns the question
        if (question.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this question' });
        }

        await Question.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
