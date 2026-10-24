import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserSchema', // Adjust to your exact User model name
        required: true 
    },
    itemId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        refPath: 'itemType'
    },
    itemType: { 
        type: String, 
        required: true, 
        enum: ['Question', 'Answer'] 
    },
    content: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 500
    }
}, {
    timestamps: true
});

export default mongoose.model("Comment", commentSchema);