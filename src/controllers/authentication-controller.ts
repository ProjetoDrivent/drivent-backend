import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { authenticationService, SignInParams } from '@/services';

const fetch = (...args: [string, any]) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  const result = await authenticationService.signIn({ email, password });

  return res.status(httpStatus.OK).send(result);
}

export async function signInGithub(req: Request, res: Response) {
  const params =
    '?client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + req.query.code;

  await fetch('https://github.com/login/oauth/access_token' + params, {
    method: 'POST',
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
}
