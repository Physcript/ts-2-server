import mongoose, { Schema } from 'mongoose';

import { IUser } from '../interface/User';

const userSchema: Schema = new Schema({

    firstName: {
        type: String,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true
    },
    loginToken: {
        type: String
    },
    verifiedToken: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }

},{ timestamps: true } )

const User = mongoose.model<IUser>('User',userSchema)
export default User
