import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    color: {
        type: String,
        trim: true
    },
    size: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    stock_quantity: {
        type: Number,
        min: 0,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    url_slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
})

export default mongoose.model('ProductVariant', productVariantSchema);