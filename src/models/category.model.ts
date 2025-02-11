import mongoose from "mongoose";

const Category = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    url_slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    parent_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, { timestamps: true });

export default mongoose.model('Category', Category);