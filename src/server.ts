import express from 'express';
import { server } from "./config/app";
import { routes } from './controlls/routesControlls/routeControll';


const app: express.Application = express();

app.use(express.json())

app.use(routes)

app.listen(server.port, () => {
	console.clear();
	console.log(`Server (HTTP) on port [${server.port}]`)
})