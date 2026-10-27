import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema', // Adjust if your user model name is different
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 20
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    voteScore: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;