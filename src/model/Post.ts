

import mongoose, { Schema } from 'mongoose';

import { IPost } from '../interface/Post';

const postSchema: Schema = new Schema({
    body: String,
    email: {
        type: String,
        ref: 'User'
    },
    name: {
        type: String
    }
},{ timestamps: true })

const Post = mongoose.model<IPost>('Post',postSchema)
export default Post
