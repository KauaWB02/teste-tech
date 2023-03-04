import { Request, Response } from 'express';
import { modelUser } from '../../database/models/user'

export class controllUser {

	private modelUsers = new modelUser();

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
				name: name,
				email: email,
				cpf: cpf,
				password: password,
				phone: phone,
			}

			await this.modelUsers.createUser(dados)
				.then(() => {
					objectReturn.message = 'Usuário cadastrado com sucesso!'
				})

		} catch (e: any) {
			objectReturn.codeStatus = e.codeStatus;
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

			for (let key in dataInfo) {
				if (Object.prototype.hasOwnProperty.call(dataInfo, key)) {
					if (dataInfo[key] == '') {
						delete dataInfo[key]
					}
				}
			}

			await this.modelUsers.updateUser(idUser, dataInfo).then((data: any) => {
				objectReturn.message = `Usuário atualizado com sucesso!`;
			})

		} catch (e: any) {
			console.log(e)
			objectReturn.codeStatus = 500;
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

			list = await this.modelUsers.listUsers();

		} catch (e: any) {
			console.log(e)
			objectReturn.codeStatus = 500;
			objectReturn.message = e.message;
		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message || list)
		}

	}
}