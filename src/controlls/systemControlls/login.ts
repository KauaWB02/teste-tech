import { Request, Response } from "express";
import { modelUserProfile } from "../../database/models/userProfile";
import { sendMail } from "../../mailer/sendMail";
import jwtWebToken from "jsonwebtoken";
import { jwt } from "../../config/app";

export class controllLogin {
  private modelUsers = new modelUserProfile();

  public async verifyUser(request: Request, response: Response) {
    let objectReturn = {
      codeStatus: 200,
      message: "",
      dataInfo: {},
    };

    try {
      let { emailCpf, password } = request.body;

      if (!emailCpf)
        throw {
          message: `Campo EMAILCPF não encontrado, este campo é permitido CPF ou EMAIL, favor verificar!`,
          codeStatus: 400,
        };

      if (!password)
        throw {
          message: `Campo PASSWORD não encontrado, favor verificar!`,
          codeStatus: 400,
        };

      let objectWhere = {
        where: {
          PASSWORD: password,
        },
        orWhere: {
          EMAIL: emailCpf,
          CPF: emailCpf,
        },
      };

      let verify = await this.modelUsers.list(
        "TB_USER",
        objectWhere.where,
        objectWhere.orWhere,
        true
      );

      if (!verify) {
        throw {
          message: `Usuário não encontrado, favor verificar credenciais`,
          codeStatus: 500,
        };
      } else {
        objectReturn.codeStatus = 200;
        objectReturn.message = `Seja Bem vindo, ${verify.NAME}`;
        objectReturn.dataInfo = {
          auth: true,
          token: jwtWebToken.sign({ idUser: verify.ID_USER }, jwt.secret, {
            expiresIn: "3h",
          }),
        };
      }
    } catch (e: any) {
      objectReturn.codeStatus = e.codeStatus || 500;
      objectReturn.message = e.message;
    } finally {
      response.status(objectReturn.codeStatus).send(objectReturn.dataInfo);
    }
  }

  public async sendEmailPassword(request: Request, response: Response) {
    let objectReturn = {
      codeStatus: 200,
      message: "",
    };
    try {
      let { email } = request.body;

      if (!email)
        throw {
          message: `Camp email não encontrado, favor verificar!`,
          codeStatus: 400,
        };

      let existEmail = await this.modelUsers.list(
        "TB_USER",
        { EMAIL: email },
        null,
        true
      );

      if (!existEmail) console.log(`E-mail não encontrado!`);

      let sendingEmail = new sendMail();

      await sendingEmail.send(
        [email],
        "Pedido de troca de senha",
        undefined,
        `<a href="'localhost:3000/change?idUser=${existEmail.ID_USER}'">Clique aqui para iniciar mudança de senha!</a>`
      );

      objectReturn.message = `Se encontramos esse email em nosso sistema vamos enviar um e-mail de suporte!`;
    } catch (e: any) {
      objectReturn.codeStatus = e.codeStatus;
      objectReturn.message = e.message;
    } finally {
      response.status(objectReturn.codeStatus).send(objectReturn.message);
    }
  }

  public async changePassword(request: Request, response: Response) {
    let objectReturn = {
      codeStatus: 200,
      message: "",
    };

    try {
      let { idUser, password } = request.body;

      if (!idUser)
        throw {
          message: `idUser não encontrado, favor verificar!`,
          codeStatus: 400,
        };

      if (!password)
        throw {
          message: `Password não encontrado, favor verificar!`,
          codeStatus: 400,
        };

      let dadosInfo = await this.modelUsers.list(
        "TB_USER",
        { ID_USER: idUser },
        null,
        true
      );

      if (!dadosInfo)
        throw { message: `Não encontrado, favor verificar!`, codeStatus: 500 };

      if (password == dadosInfo.PASSWORD)
        throw { message: `Você não pode usar a mesma senha!`, codeStatus: 400 };

      await this.modelUsers
        .update(
          "TB_USER",
          { password: password },
          { ID_USER: dadosInfo.ID_USER }
        )
        .then(() => {
          objectReturn.message = `Senha atualizada com sucesso!`;
        });
    } catch (e: any) {
      objectReturn.codeStatus = e.codeStatus || 500;
      objectReturn.message = e.message;
    } finally {
      response.status(objectReturn.codeStatus).send(objectReturn.message);
    }
  }
}
