import { Request, Response } from 'express';
import { modelUserProfile } from '../../database/models/userProfile'

export class controllUser {

	private modelUsers = new modelUserProfile();

	public async createUser(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: ''
		}

		try {

			let { name, email, password, cpf, phone, } = request.body;
			if (!name) {

				throw { message: `Você precisa digitar um NOME de usuário!`, codeStatus: 400 }
			} else if (!email) {

				throw { message: `Você precisa digitar um EMAIL de usuário!`, codeStatus: 400 }
			} else if (!password) {

				throw { message: `Você precisa digitar uma SENHA de usuário!`, codeStatus: 400 }
			} else if (!cpf) {

				throw { message: `Você precisa digitar um CPF de usuário!`, codeStatus: 400 }
			}

			let dados = {
				NAME: name,
				EMAIL: email,
				CPF: cpf,
				PASSWORD: password,
				PHONE: phone,
				DT_CREATION: new Date()
			}

			await this.modelUsers.create('TB_USER', dados)
				.then(() => {
					objectReturn.message = 'Usuário cadastrado com sucesso!'
				})

		} catch (e: any) {
			objectReturn.codeStatus = e.codeStatus || 500;
			objectReturn.message = e.message;
		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message)
		}

	}

	public async updateUser(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: ''
		}

		try {
			let { idUser, dataInfo } = request.body;

			if (!idUser)
				throw { message: `idUser não encontrado nos parametros, favor verificar!`, codeStatus: 400 }

			for (let key in dataInfo) {
				if (Object.prototype.hasOwnProperty.call(dataInfo, key)) {
					if (dataInfo[key] == '') {
						delete dataInfo[key];
					}
				}
			}

			dataInfo.DT_CREATION = new Date();
			await this.modelUsers.update('TB_USER', dataInfo, { ID_USER: idUser }).then(() => {
				objectReturn.message = `Usuário atualizado com sucesso!`;
			});

		} catch (e: any) {
			console.log(e)
			objectReturn.codeStatus = e.codeStatus || 500;
			objectReturn.message = e.message;
		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message);
		}
	}

	public async listUsers(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: null
		}
		let list: Array<object> = [];
		try {

			list = await this.modelUsers.list('TB_USER');

		} catch (e: any) {
			console.log(e)
			objectReturn.codeStatus = e.codeStatus || 500;
			objectReturn.message = e.message;
		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message || list)
		}

	}

	public async deleteUser(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: ''
		}

		try {
			let { idUser } = request.query;

			if (!idUser)
				throw { message: `idUser não foi encontrado nos parametros de URL, favor verificar!`, codeStatus: 400 };

			let objectWhere = {
				ID_USER: Number(idUser)
			}

			await this.modelUsers.delete('TB_USER', objectWhere).then(() => {
				objectReturn.message = 'Usuário excluido com sucesso!';
			});

		} catch (e: any) {

			objectReturn.codeStatus = e.codeStatus || 500;
			objectReturn.message = e.message;

		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message);
		}
	}

	

}