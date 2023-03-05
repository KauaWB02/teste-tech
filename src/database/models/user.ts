import { connection } from '../connection';
import { user } from '../../interface/createUser'
export class modelUser {

	public async createUser(dadosUser: user) {
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

	public async updateUser(idUser: number, objecUpdate: user) {
		try {
			await connection('TB_USER')
				.update({
					NAME: objecUpdate.name,
					EMAIL: objecUpdate.email,
					CPF: objecUpdate.cpf,
					PASSWORD: objecUpdate.password,
					PHONE: objecUpdate.phone,
					DT_CREATION: connection.raw(`CURRENT_TIMESTAMP`)
				}).where('ID_USER', idUser);

		} catch (e: any) {
			console.log(e)
			throw { message: `Erro ao tentar atualiar usuário` }
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

	public async deleteUser(idUser: number) {
		try {
			await connection('TB_USER as user').delete().where('ID_USER', idUser);
		} catch (e) {
			console.log(e);
			throw { message: `Erro ao tentar excluir usuário!`, codeStatus: 500 };
		}
	}
}