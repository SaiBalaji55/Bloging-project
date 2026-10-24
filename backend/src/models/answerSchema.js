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
    }
}, {
    timestamps: true
});

export default mongoose.model("Answer", answerSchema);