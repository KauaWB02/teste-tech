import { Request, Response } from 'express';
import { modelUserProfile } from '../../database/models/userProfile'
import { userProfile } from '../../interface/createUserProfile';

export class controllProfile {

	private modelUsers = new modelUserProfile();

	public async createProfile(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: ''
		}

		try {

			let { name, idUser, isAdmin, } = request.body;
			if (!name) {

				throw { message: `Parametro NAME não encontrado, favor verificar!`, codeStatus: 400 }
			} else if (!idUser) {

				throw { message: `Parametro IDUSER não encontrado, favor verificar!`, codeStatus: 400 }
			} else if (!isAdmin) {

				throw { message: `Parametro ISADMIN não encontrado, favor verificar!`, codeStatus: 400 }
			}

			let dados: userProfile = {
				name: name,
				idUser: idUser,
				isAdmin: isAdmin
			}

			await this.modelUsers.create('TB_PROFILE', dados)
				.then(() => {
					objectReturn.message = 'Perfil cadastrado com sucesso!'
				})

		} catch (e: any) {
			objectReturn.codeStatus = e.codeStatus || 500;
			objectReturn.message = e.message;
		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message)
		}

	}

	public async updateProfile(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: ''
		}

		try {
			let { idProfile, dataInfo } = request.body;

			for (let key in dataInfo) {
				if (Object.prototype.hasOwnProperty.call(dataInfo, key)) {
					if (dataInfo[key] == '') {
						delete dataInfo[key]
					}
				}
			}

			await this.modelUsers.update('TB_PROFILE', dataInfo, { ID_PROFILE: idProfile }).then(() => {
				objectReturn.message = `Perfil atualizado com sucesso!`;
			})

		} catch (e: any) {
			console.log(e)
			objectReturn.codeStatus = e.message || 500;
			objectReturn.message = e.message;
		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message);
		}
	}

	public async listProfiles(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: null
		}
		let list: Array<object> = [];
		try {

			list = await this.modelUsers.list('TB_PROFILE');

		} catch (e: any) {
			console.log(e)
			objectReturn.codeStatus = e.message || 500;
			objectReturn.message = e.message;
		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message || list)
		}

	}

	public async deleteProfile(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: ''
		}

		try {
			let { idUser } = request.query

			if (!idUser)
				throw { message: `idUser não foi encontrado nos parametros de URL, favor verificar!`, codeStatus: 400 };

			let objectWhere = {
				ID_USER: Number(idUser)
			}
			await this.modelUsers.delete('TB_PROFILE', objectWhere).then(() => {
				objectReturn.message = 'Usuário excluido com sucesso!';
			})

		} catch (e: any) {
			objectReturn.codeStatus = e.codeStatus || 500;
			objectReturn.message = e.message;
		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message);
		}
	}
}