import { NextFunction, Request, Response } from 'express';

import { CHK_EMPTY_POST } from '../modules/post';

export const createPostMiddleware = async (req: Request,res: Response,next: NextFunction) => {
    const { body } = req.body
    await CHK_EMPTY_POST(body,res)
    console.log(res.locals.error)
    if(res.locals.error == null) {
        next()
    }else {
        res.status(400).json({
            error: res.locals.error
        })
    }
}
