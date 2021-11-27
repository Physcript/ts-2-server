import bcrypt from 'bcrypt';
import { NextFunction, Request, response, Response } from 'express';

import { IError } from '../interface/User';
import {
	CHK_EMAIL,
	CHK_PASSWORD,
	CHK_PASSWORD_LENGTH,
	CHK_PASSWORD_SPACE,
	CHK_VALID_EMAIL,
	LOGIN_EMAIL,
	LOGIN_MATCH,
	LOGIN_TOKEN,
} from '../modules/user';

export const registerMiddleware = async (req: Request,res: Response,next: NextFunction) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    const error:IError = {}

    if(firstName.trim() === '') error.firstName = 'Firstname Required'
    if(lastName.trim() === '') error.lastName = 'Lastname Required'
    if(password.trim() === '') error.password = 'Password Required'
    if(confirmPassword.trim() === '') error.confirmPassword = 'ConfirmPassword Required'

    CHK_EMAIL(email,res)
        .then(() => {
            CHK_VALID_EMAIL(email,res)
        })
        .then(() => {
            CHK_PASSWORD(password,confirmPassword,res)
        })
        .then(() => {
            CHK_PASSWORD_LENGTH(password,confirmPassword,res)
        })
        .then(() => {
            CHK_PASSWORD_SPACE(password,confirmPassword,res)
        })


    if(Object.keys(error).length >= 1) {
        res.status(400).json({
            error
        })

    } else {
        const encrypt = await bcrypt.hash(password,8)
        res.locals.hash = encrypt
        next()
    }

}


export const loginMiddleware = async (req: Request,res: Response,next: NextFunction) => {
    const { email,password } = req.body

    await LOGIN_EMAIL(email,res)
    await LOGIN_MATCH(password,res)
    await LOGIN_TOKEN(res)
    next()
}
