import express from "express";
import { server } from "./config/app";
import { routes } from "./controlls/routesControlls/routeControll";
import cors from "cors";

const app: express.Application = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(server.port, () => {
	console.clear();
	console.log(`Server (HTTP) on port [${server.port}]`);
});
