import { Router } from 'express';
import { signInGithub, singInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost).get('/sign-in/github', signInGithub);

export { authenticationRouter };
