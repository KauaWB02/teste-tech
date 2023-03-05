import { smtp } from "../config/app";
import nodeMiler from 'nodemailer';

export class mailerTrarfer {
	public connectMailer() {
		let tranfer = nodeMiler.createTransport({
			host: smtp.host,
			port: smtp.port,
			auth: {
				user: smtp.user,
				pass: smtp.pass
			}
		});

		return tranfer;
	}
}