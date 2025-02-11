import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    url_slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    tags: {
        type: [String],
        default: []
    }

}, { timestamps: true });

export default mongoose.model('Product', productSchema);