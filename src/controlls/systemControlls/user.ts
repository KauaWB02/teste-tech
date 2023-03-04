import { Request, Response } from "express";
import { modelCreateUser } from "../../database/models/createUser";

export class controllUser {
    public async listUsers(request: Request, response: Response) {
        let modelUser = new modelCreateUser()
        let teste = await modelUser.createUser();
        response.status(200).send(teste)
    }
}