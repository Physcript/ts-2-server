

import express from 'express';

import { login, register, verify } from '../controller/userCon';
import {
	loginMiddleware,
	registerMiddleware,
	verifyMiddleware,
} from '../middleware/userMiddleware';

const router = express.Router()

router.post('/register',registerMiddleware,register)
router.post('/login',loginMiddleware,login)
router.get('/verify',verifyMiddleware,verify)

export default router
