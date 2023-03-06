import { connection } from '../connection';
import { userProfile } from '../../interface/createUserProfile'

export class modelUserProfile {

	public async create(table: string, objectInsert: object) {
		try {
			await connection(table)
				.insert(objectInsert)
		} catch (e) {
			throw { message: `Ocorreu algo de errado na criação de usuário` }
		}
	}

	public async update(table: string, objecUpdate: object, objecWhere: object) {
		try {

			await connection(table)
				.update(objecUpdate)
				.where(objecWhere);

		} catch (e: any) {
			console.log(e)
			throw { message: `Erro ao tentar atualiar usuário` }
		}
	}

	public async list(table: string, objectWhere?: any, objectOrWhere?: any, first: boolean = false) {
		let users: any;
		try {
			let queryBuild = connection(table).select('*');
			if (objectWhere) {

				queryBuild = queryBuild.where(objectWhere);

			}

			if (objectOrWhere) {

				queryBuild = queryBuild.orWhere(objectOrWhere);

			}

			if (first) {

				queryBuild = queryBuild.first();
			}

			users = await queryBuild;

		} catch (e) {
			console.log(e)
			throw { message: `Ocorreu algo de errado na listagem de usuarios` };
		}
		return users;
	}

	public async delete(table: string, objectWhere: object) {
		try {
			await connection(table).delete().where(objectWhere);
		} catch (e) {
			console.log(e);
			throw { message: `Erro ao tentar excluir usuário!`, codeStatus: 500 };
		}
	}
}