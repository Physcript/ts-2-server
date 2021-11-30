import { Request, Response } from 'express';

import { IPost } from '../interface/Post';
import Post from '../model/Post';

export const createPost = async (req: Request,res: Response) => {
    const { body } =  req.body
    const { email,firstName,lastName } = res.locals.user
    const name = `${lastName} ${firstName}`

    const post = {
        body,
        email,
        name
    }

    const newPost = new Post({
        body: post.body,
        email: post.email,
        name: post.name
    })

    await newPost.save()


    res.status(201).json({ data: 'create post'})
}
