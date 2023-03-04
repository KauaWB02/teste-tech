import { connection } from "../connection";
import { createUser } from '../../interface/createUser'
export class modelUser {

	public async createUser(dadosUser: createUser) {
		try {
			await connection('TB_USER')
				.insert({
					NAME: dadosUser.name,
					EMAIL: dadosUser.email,
					CPF: dadosUser.cpf,
					PASSWORD: dadosUser.password,
					PHONE: dadosUser.phone,
					DT_CREATION: connection.raw(`CURRENT_TIMESTAMP`)
				})
		} catch (e) {
			throw { message: `Ocorreu algo de errado na criação de usuário [${e}]` }
		}
	}

	public async listUsers() {
		let users: Array<object> = [];
		try {

			users = await connection('TB_USER')
				.select('ID_USER', 'NAME', 'EMAIL', 'CPF', 'PHONE', 'DT_CREATION');

		} catch (e) {
			console.log(e)
			throw { message: `Ocorreu algo de errado na listagem de usuarios` };

		}
		return users;
	}
}