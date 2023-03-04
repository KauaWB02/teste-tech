import { Router, Request, Response, response } from "express";
import { controllUser } from "../systemControlls/user";

export const routes: Router = Router();

let controllUsers = new controllUser();

routes.get('/list/users', async (request: Request, response: Response) => {
    controllUsers.listUsers(request, response);
});


