import { Request, Response } from "express";
import { modelUser } from '../../database/models/user'

export class controllUser {

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

			let create = new modelUser();
			await create.createUser(dados)
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

	public async listUsers(request: Request, response: Response) {
		let objecErro = {
			codeStatus: 200,
			message: null
		}
		let list: Array<object> = [];
		try {

			let modelUsers = new modelUser();
			list = await modelUsers.listUsers();

		} catch (e: any) {
			console.log(e)
			objecErro.codeStatus = 500;
			objecErro.message = e.message;
		} finally {
			response.status(objecErro.codeStatus).send(objecErro.message || list)
		}

	}
}