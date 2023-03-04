import { connection } from "../connection";

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
				}).then((data: any) => {
					return data;
				})

		} catch (e) {
			throw { message: `Ocorreu algo de errado na criação de usuário [${e}]` }
		}
	}

	public async listUsers() {
		try {
			let users = await connection('TB_USER').select('*');
			return users;
		} catch (e) {
			throw { message: `Ocorreu algo de errado na listagem de usuarios [${e}]` }
		}
	}
}