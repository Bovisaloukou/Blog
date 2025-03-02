import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  email: { type: String, required: true },
  article: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', commentSchema); 