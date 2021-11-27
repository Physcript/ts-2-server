

import express from 'express';

import { login, register } from '../controller/userCon';
import {
	loginMiddleware,
	registerMiddleware,
} from '../middleware/userMiddleware';

const router = express.Router()

router.post('/register',registerMiddleware,register)
router.post('/login',loginMiddleware,login)

export default router
