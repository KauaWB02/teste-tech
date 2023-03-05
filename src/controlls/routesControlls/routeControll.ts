import { Router, Request, Response } from 'express';
import { controllUser } from '../systemControlls/user';

export const routes: Router = Router();

const prefix = '/tech'

let controllUsers = new controllUser();

routes.get(`${prefix}/list/users`, async (request: Request, response: Response) => {
    controllUsers.listUsers(request, response);
});

routes.post(`${prefix}/create/user`, async (request: Request, response: Response) => {
    controllUsers.createUser(request, response);
});

routes.put(`${prefix}/update/user`, async (request: Request, response: Response) => {
    controllUsers.updateUser(request, response);
});

routes.delete(`${prefix}/delete/user`, async (request: Request, response: Response) => {
    controllUsers.deleteUser(request, response);
})



