


import express from 'express';

import { createPost } from '../controller/postCon';
import { createPostMiddleware } from '../middleware/postMiddleware';
import { verifyToken } from '../middleware/userMiddleware';

const route = express.Router()

route.post('/post',verifyToken,createPostMiddleware,createPost)

export default route
