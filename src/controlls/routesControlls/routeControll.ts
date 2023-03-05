import { Router, Request, Response } from 'express';
import { controllLogin } from '../systemControlls/login';
import { controllProfile } from '../systemControlls/profile';
import { controllUser } from '../systemControlls/user';

export const routes: Router = Router();

const prefix = '/tech'

let user = new controllUser();
let profile = new controllProfile();
let login = new controllLogin();



// Rotas de usuários

routes.put(`${prefix}/change/password`, async (request: Request, response: Response) => {
    login.changePassword(request, response);
});

routes.post(`${prefix}/send/mail`, async (request: Request, response: Response) => {
    login.sendEmailPassword(request, response);
});

routes.post(`${prefix}/login/user`, async (request: Request, response: Response) => {
    login.verifyUser(request, response);
});

routes.get(`${prefix}/list/users`, async (request: Request, response: Response) => {
    user.listUsers(request, response);
});

routes.post(`${prefix}/create/user`, async (request: Request, response: Response) => {
    user.createUser(request, response);
});

routes.put(`${prefix}/update/user`, async (request: Request, response: Response) => {
    user.updateUser(request, response);
});

routes.delete(`${prefix}/delete/user`, async (request: Request, response: Response) => {
    user.deleteUser(request, response);
})

// rotar para perfils de usuários

routes.get(`${prefix}/list/profile`, async (request: Request, response: Response) => {
    profile.listProfiles(request, response);
});

routes.post(`${prefix}/create/profile`, async (request: Request, response: Response) => {
    profile.createProfile(request, response);
});

routes.put(`${prefix}/update/profile`, async (request: Request, response: Response) => {
    profile.updateProfile(request, response);
});

routes.delete(`${prefix}/delete/profile`, async (request: Request, response: Response) => {
    profile.deleteProfile(request, response);
})


