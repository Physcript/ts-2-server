import { ObjectId } from 'mongoose';

export interface IPost {
    _id: ObjectId,
    body: String,
    email: String,
    createdAt?: Date,
    updatedAt?: Date

}
