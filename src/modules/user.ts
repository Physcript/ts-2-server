import bcrypt from 'bcrypt';
import { Response, response } from 'express';
import jwt from 'jsonwebtoken';
import validator from 'validator';

import config from '../config/config';
import { IUser } from '../interface/User';
import User from '../model/User';

export const CHK_EMAIL = async (arg1: string, res: Response) => {
    const user = await User.findOne({email: arg1})
    if(user) {
        res.status(400).json({
            error: "Email already exist"
        })
    }
}

export const CHK_VALID_EMAIL = async (arg1: string, res: Response) => {

    if(!validator.isEmail(arg1)) {
        res.status(400).json({
            error: "Invalid Email"
        })
    }
}

export const CHK_PASSWORD = async ( arg1: string, arg2: string,res: Response ) => {
    if(arg1.trim() !== arg2.trim()) {
        res.status(400).json({
            error: {
                "password": 'Password not match',
                "confirmPassword": "Password not match"
            }
        })
    }
}
export const CHK_PASSWORD_SPACE = async ( arg1: string, arg2: string,res: Response ) => {
    if(arg1.includes(' ') || arg2.includes(' ') ) {
        res.status(400).json({
            error: {
                "password": 'Invalid Password',
                "confirmPassword": "Invalid Password"
            }
        })
    }
}

export const CHK_PASSWORD_LENGTH = async ( arg1: string, arg2: string,res: Response ) => {
    if(arg1.trim().length < 6) {
        res.status(400).json({
            error: {
                "password": 'Password minimum of 6 character',
                "confirmPassword": "Password minimum of 6 character"
            }
        })
    }
}

export const LOGIN_EMAIL = async (arg1: string, res: Response) => {
    const user = await User.findOne({email:arg1})
    if(!user){
        res.status(400).json({
            error: 'Invalid Email/Password'
        })
    }else {
        res.locals.user = user
    }
}

export const LOGIN_MATCH = async (arg1: string, res: Response) => {
    const user = res.locals.user
    const isMatch = await bcrypt.compare(arg1,user.password)
    if(!isMatch){
        res.status(400).json({
            error: 'Invalid Email/Password'
        })

    } else {

    }
}

export const LOGIN_TOKEN = async ( res: Response) =>  {
    const USER: IUser = res.locals.user
    const user = {
        firstName: USER.firstName,
        lastName: USER.lastName,
        email: USER.email,
        verified: USER.verified,
    }
    const token = await jwt.sign(user,`${config.token.login}`)
    res.locals.token = token
}
