
import { NextFunction, Request, Response } from 'express';

import User from '../model/User';

export const register = async (req: Request,res: Response) => {

    const { firstName,lastName,email } = req.body
    const user = new User({
        firstName,
        lastName,
        email,
        password: res.locals.hash
    })
    await user.save()
    res.status(200).json({ msg:'Register' })
}
export const login = (req: Request,res: Response) => {
    res.status(200).json({ data: res.locals.token })
}
