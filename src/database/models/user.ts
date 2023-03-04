import { connection } from "../connection";

export class modelUser {
    public async listUsers() {
       let users = await connection('TB_USER').select('*');
       return users;
    }
}