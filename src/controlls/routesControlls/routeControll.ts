import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwt as jwtEnv } from "../../config/app";
import { modelUserProfile } from "../../database/models/userProfile";
import { controllLogin } from "../systemControlls/login";
import { controllProduct } from "../systemControlls/product";
import { controllProfile } from "../systemControlls/profile";
import { controllUser } from "../systemControlls/user";

export const routes: Router = Router();

const prefix = "/tech";

let user = new controllUser();
let profile = new controllProfile();
let login = new controllLogin();
let product = new controllProduct();

let modelProfiles = new modelUserProfile();

interface payloadToken {
	idUser: string;
	iat: number;
	exp: number;
}

function verifyJwt(request: Request, response: Response, next: NextFunction) {
	let { authorization } = request.headers;

	if (!authorization) {
		return response.status(401).send();
	}

	let token = authorization.replace("Bearer", "").trim();

	try {
		const data = jwt.verify(token, jwtEnv.secret);
		let { idUser } = data as payloadToken;

		request.idUser = idUser;

		next();
	} catch (e) {
		response.status(401).send();
	}
}

routes.get(
	`${prefix}/details`,
	verifyJwt,
	async (request: Request, response: Response) => {
		let objectReturn = {
			codeStatus: 200,
			message: "",
		};
		let dados: any;

		try {
			let { idUser } = request.query;
			let { idProduct } = request.query;

			if (idUser) {
				dados = await modelProfiles.list(
					"TB_USER",
					{ ID_USER: Number(idUser) },
					null,
					true
				);

				if (!dados) {
					throw { message: `Usuário não encontrado!`, codeStatus: 500 };
				}
			} else if (idProduct) {
				console.log("teste");
				dados = await modelProfiles.list(
					"TB_PRODUCT",
					{ ID_PRODUCT: Number(idProduct) },
					null,
					true
				);

				if (!dados) {
					throw { message: `Produto não encontrado!`, codeStatus: 500 };
				}
			} else {
				throw {
					message: `Não encontramos nenhum dos parametros (idUser, idProduct) na URL, favor verificar!`,
					codeStatus: 400,
				};
			}
		} catch (e: any) {
			objectReturn.codeStatus = e.codeStatus || 500;
			objectReturn.message = e.message;
		} finally {
			response
				.status(objectReturn.codeStatus)
				.send(objectReturn.message || dados);
		}
	}
);

routes.get(
	`${prefix}/list/products`,
	verifyJwt,
	async (request: Request, response: Response) => {
		product.listProducts(request, response);
	}
);

routes.post(
	`${prefix}/create/product`,
	verifyJwt,
	async (request: Request, response: Response) => {
		product.createProduct(request, response);
	}
);

routes.put(
	`${prefix}/update/product`,
	verifyJwt,
	async (request: Request, response: Response) => {
		product.updateProduct(request, response);
	}
);

routes.delete(
	`${prefix}/delete/product`,
	verifyJwt,
	async (request: Request, response: Response) => {
		product.deleteProduct(request, response);
	}
);

// Rotas de usuários

routes.put(
	`${prefix}/change/password`,
	verifyJwt,
	async (request: Request, response: Response) => {
		login.changePassword(request, response);
	}
);

routes.post(
	`${prefix}/send/mail`,
	verifyJwt,
	async (request: Request, response: Response) => {
		login.sendEmailPassword(request, response);
	}
);

routes.post(
	`${prefix}/login/user`,
	async (request: Request, response: Response) => {
		login.verifyUser(request, response);
	}
);

routes.get(
	`${prefix}/list/users`,
	verifyJwt,
	async (request: Request, response: Response) => {
		user.listUsers(request, response);
	}
);

routes.post(
	`${prefix}/create/user`,
	verifyJwt,
	async (request: Request, response: Response) => {
		user.createUser(request, response);
	}
);

routes.put(
	`${prefix}/update/user`,
	verifyJwt,
	async (request: Request, response: Response) => {
		user.updateUser(request, response);
	}
);

routes.delete(
	`${prefix}/delete/user`,
	verifyJwt,
	async (request: Request, response: Response) => {
		user.deleteUser(request, response);
	}
);

// rotar para perfils de usuários

routes.get(
	`${prefix}/user/profiles`,
	verifyJwt,
	async (request: Request, response: Response) => {
		profile.listProfilesOneUser(request, response);
	}
);

routes.get(
	`${prefix}/list/profiles`,
	verifyJwt,
	async (request: Request, response: Response) => {
		profile.listProfiles(request, response);
	}
);

routes.post(
	`${prefix}/create/profile`,
	verifyJwt,
	async (request: Request, response: Response) => {
		profile.createProfile(request, response);
	}
);

routes.put(
	`${prefix}/update/profile`,
	verifyJwt,
	async (request: Request, response: Response) => {
		profile.updateProfile(request, response);
	}
);

routes.delete(
	`${prefix}/delete/profile`,
	verifyJwt,
	async (request: Request, response: Response) => {
		profile.deleteProfile(request, response);
	}
);
