import { Router, Request, Response, response } from "express";
import { controllUser } from "../systemControlls/user";

export const routes: Router = Router();

let controllUsers = new controllUser();


routes.post('/create/user', async (request: Request, response: Response) => {
    response.send('Testando')
})

routes.get('/list/users', async (request: Request, response: Response) => {
    controllUsers.listUsers(request, response);
});


