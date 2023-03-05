import { mailerTrarfer } from "./mailer";

export class sendMail extends mailerTrarfer {

	public async send(toMail: Array<string>, subject: string, textMail?: string, textHtml?: string) {
		try {
			await this.connectMailer().sendMail({
				from: 'Suporte <naoresponder@res.com>',
				to: toMail,
				subject: subject,
				text: textMail,
				html: textHtml
			}).catch((e: any) => {
				throw e;
			});

		} catch (e: any) {
			throw { message: e.message, codeStatus: 400 };
		}

	}

}