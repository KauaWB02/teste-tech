import { connection } from "../connection";

export class modelCreateUser {
    public async createUser() {
       let teste = await connection('TB_USER').select('*');
       return teste;
    }
}