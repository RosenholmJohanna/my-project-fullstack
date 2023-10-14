const mongoose = require('mongoose');

export const PostSchema = new mongoose.Schema({
    title: {
      type: String
    },
    message: {
      type: String, 
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: () => new Date() 
    },
    likes: {
      type: Number,
      default: 0
     },
     disLikes: {
      type: Number,
      default: 0
     },
    answers: [{
      answer: {
        type: String 
      },
      createdAt: {
        type: Date,
        default: () => new Date() 
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     },
      like: {
        type: Number,
        default: 0
      }
    }],
    questionSavedBy: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
       }
     ]
})
  