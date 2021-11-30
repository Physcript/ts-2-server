import { Response } from 'express';

export const CHK_EMPTY_POST = async ( arg1: string, res: Response ) => {
    if(arg1.trim() === '' ) {
        const error = {
            body: 'Body required'
        }
        res.locals.error = error
    }else {
        res.locals.error = null
    }
}
