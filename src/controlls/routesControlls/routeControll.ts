import { Router, Request, Response } from 'express';
import { modelUserProfile } from '../../database/models/userProfile';
import { controllLogin } from '../systemControlls/login';
import { controllProduct } from '../systemControlls/product';
import { controllProfile } from '../systemControlls/profile';
import { controllUser } from '../systemControlls/user';

export const routes: Router = Router();

const prefix = '/tech'

let user = new controllUser();
let profile = new controllProfile();
let login = new controllLogin();
let product = new controllProduct();

let modelProfiles = new modelUserProfile();

routes.get(`${prefix}/details`, async (request: Request, response: Response) => {

	let objectReturn = {
		codeStatus: 200,
		message: ''
	}
	let dados: any;

	try {
		let { idUser } = request.query;
		let { idProduct } = request.query;

		if (idUser) {
			dados = await modelProfiles.list('TB_USER', { ID_USER: Number(idUser) }, null, true);

			if (!dados) {
				throw { message: `Usuário não encontrado!`, codeStatus: 500 };
			}

		} else if (idProduct) {
			console.log('teste')
			dados = await modelProfiles.list('TB_PRODUCT', { ID_PRODUCT: Number(idProduct) }, null, true);

			if (!dados) {
				throw { message: `Produto não encontrado!`, codeStatus: 500 };
			}

		} else {
			throw { message: `Não encontramos nenhum dos parametros (idUser, idProduct) na URL, favor verificar!`, codeStatus: 400 };
		}

	} catch (e: any) {
		objectReturn.codeStatus = e.codeStatus || 500;
		objectReturn.message = e.message;
	} finally {
		response.status(objectReturn.codeStatus).send(objectReturn.message || dados);
	}
});


routes.get(`${prefix}/list/products`, async (request: Request, response: Response) => {
	product.listProducts(request, response);
});

routes.post(`${prefix}/create/product`, async (request: Request, response: Response) => {
	product.createProduct(request, response);
});

routes.put(`${prefix}/update/product`, async (request: Request, response: Response) => {
	product.updateProduct(request, response);
});

routes.delete(`${prefix}/delete/product`, async (request: Request, response: Response) => {
	product.deleteProduct(request, response);
})

// Rotas de usuários

routes.put(`${prefix}/change/password`, async (request: Request, response: Response) => {
	login.changePassword(request, response);
});

routes.post(`${prefix}/send/mail`, async (request: Request, response: Response) => {
	login.sendEmailPassword(request, response);
});

routes.post(`${prefix}/login/user`, async (request: Request, response: Response) => {
	login.verifyUser(request, response);
});

routes.get(`${prefix}/list/users`, async (request: Request, response: Response) => {
	user.listUsers(request, response);
});

routes.post(`${prefix}/create/user`, async (request: Request, response: Response) => {
	user.createUser(request, response);
});

routes.put(`${prefix}/update/user`, async (request: Request, response: Response) => {
	user.updateUser(request, response);
});

routes.delete(`${prefix}/delete/user`, async (request: Request, response: Response) => {
	user.deleteUser(request, response);
})

// rotar para perfils de usuários

routes.get(`${prefix}/user/profiles`, async (request: Request, response: Response) => {
	profile.listProfilesOneUser(request, response);
});

routes.get(`${prefix}/list/profiles`, async (request: Request, response: Response) => {
	profile.listProfiles(request, response);
});

routes.post(`${prefix}/create/profile`, async (request: Request, response: Response) => {
	profile.createProfile(request, response);
});

routes.put(`${prefix}/update/profile`, async (request: Request, response: Response) => {
	profile.updateProfile(request, response);
});

routes.delete(`${prefix}/delete/profile`, async (request: Request, response: Response) => {
	profile.deleteProfile(request, response);
})


