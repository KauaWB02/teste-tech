require('dotenv/config');

export const database = {
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
}

export const server = {
	port: process.env.SERVER_PORT || 8080
}

export const smtp = {
	host: process.env.MAIL_HOST,
	port: Number(process.env.MAIL_PORT) || 2525,
	user: process.env.MAIL_USER,
	pass: process.env.MAIL_PASS
}

export const jwt = {
	secret: String(process.env.JWT_SECURE),
	expiresIn: String(process.env.JWT_EXPIRESIN_TOKEN)
}