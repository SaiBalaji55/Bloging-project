import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserSchema', 
        required: true 
    },
    itemId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        refPath: 'itemType' // Dynamically references Question or Answer
    },
    itemType: { 
        type: String, 
        required: true, 
        enum: ['Question', 'Answer'] 
    },
    value: { 
        type: Number, 
        required: true, 
        enum: [1, -1] 
    }
}, {
    timestamps: true
});

// Enforce unique user-and-item combination at the database level
voteSchema.index({ userId: 1, itemId: 1, itemType: 1 }, { unique: true });

export default mongoose.model("Vote", voteSchema);