import router, {Router} from 'express'
import {loginCallback, loginWithGoogle} from './auth.controller.js';
// import { verifyCode } from './auth.middleware.js';

const authRouter= router() as Router;

authRouter.get('/google-login', loginWithGoogle)
authRouter.get('/:provider/callback', loginCallback);

export default authRouter;