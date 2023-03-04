import { Request, Response } from "express";
import { modelUser } from '../../database/models/user'

export class controllUser {
    public async listUsers(request: Request, response: Response) {
        let modelUsers = new modelUser();
        let list = await modelUsers.listUsers();
        response.status(200).send(list)
    }
}