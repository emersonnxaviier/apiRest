import express from "express";
import "dotenv/config";

import "./shared/services/TranslationsYup"; // USADO PARA IMPORTAR AS TRADUÇÕES DOS ERROS DE VALIDAÇÃO
import { router } from "./routes";

const server = express();

server.use(express.json());
server.use(router);

export { server };
