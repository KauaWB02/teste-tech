import { Request, Response } from "express";
import { modelUserProfile } from "../../database/models/userProfile";
import { product } from "../../interface/product";

export class controllProduct {
	private modelUsers = new modelUserProfile();

	public async createProduct(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: ''
		}

		try {

			let { name, description, unitaryValue, stockQuantity, idCategory, codeProduct } = request.body;
			if (!name) {

				throw { message: `Parametro NAME não encontrado!`, codeStatus: 400 };

			} else if (!description) {

				throw { message: `Parametro DESCRIPTION não encontrado!`, codeStatus: 400 };

			} else if (!unitaryValue) {

				throw { message: `Parametro UNITARYVALUE não encontrado!`, codeStatus: 400 };

			} else if (!stockQuantity) {

				throw { message: `Parametro STOCKQUANTITY não encontrado!`, codeStatus: 400 };

			} else if (!idCategory) {

				throw { message: `Parametro IDCATEGORY não encontrado!`, codeStatus: 400 };

			} else if (!codeProduct) {
				throw { message: `Parametro CODEPRODUCT não encontrado!`, codeStatus: 400 };
			}

			let dados = {
				NAME: name,
				DESCRIPTION: description,
				CODE_PRODUCT: codeProduct,
				UNITARY_VALUE: unitaryValue,
				STOCK_QUANTITY: stockQuantity,
				ID_CATEGORY: idCategory,
				DT_CREATION: new Date()
			}

			await this.modelUsers.create('TB_PRODUCT', dados)
				.then(() => {
					objectReturn.message = 'Product cadastrado com sucesso!'
				})

		} catch (e: any) {
			objectReturn.codeStatus = e.codeStatus || 500;
			objectReturn.message = e.message;
		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message)
		}

	}

	public async updateProduct(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: ''
		}

		try {
			let { idProduct, dataInfo } = request.body;

			if (!idProduct)
				throw { message: `idProduct não encontrado nos parametros, favor verificar!`, codeStatus: 400 }

			for (let key in dataInfo) {
				if (Object.prototype.hasOwnProperty.call(dataInfo, key)) {
					if (dataInfo[key] == '') {
						delete dataInfo[key];
					}
				}
			}

			dataInfo.DT_CREATION = new Date();
			await this.modelUsers.update('TB_PRODUCT', dataInfo, { ID_PRODUCT: idProduct }).then(() => {
				objectReturn.message = `Produto atualizado com sucesso!`;
			});

		} catch (e: any) {
			console.log(e)
			objectReturn.codeStatus = e.codeStatus || 500;
			objectReturn.message = e.message;
		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message);
		}
	}

	public async listProducts(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: null
		}
		let list: Array<object> = [];
		try {

			list = await this.modelUsers.list('TB_PRODUCT');

		} catch (e: any) {
			console.log(e)
			objectReturn.codeStatus = e.codeStatus || 500;
			objectReturn.message = e.message;
		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message || list)
		}

	}

	public async deleteProduct(request: Request, response: Response) {
		let objectReturn = {
			codeStatus: 200,
			message: ''
		}

		try {
			let { idProduct } = request.query;

			if (!idProduct)
				throw { message: `idProduct não foi encontrado nos parametros de URL, favor verificar!`, codeStatus: 400 };

			let objectWhere = {
				ID_PRODUCT: Number(idProduct)
			}

			await this.modelUsers.delete('TB_PRODUCT', objectWhere).then(() => {
				objectReturn.message = 'Produto excluido com sucesso!';
			});

		} catch (e: any) {

			objectReturn.codeStatus = e.codeStatus || 500;
			objectReturn.message = e.message;

		} finally {
			response.status(objectReturn.codeStatus).send(objectReturn.message);
		}
	}

}