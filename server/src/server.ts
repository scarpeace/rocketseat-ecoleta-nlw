import express from 'express';
import routes from './routes';
import cors from 'cors'
import path from 'path'

const app = express();

app.use(cors());
//Essa é uma configuração do express para saber que o corpo das requisições está vindo como JSON
app.use(express.json());
app.use(routes);

//Esse método do express serve para servir arquivos estáticos dentro da rota. 
//O argumento é o caminho dos arquivos que vão ser servidos, o nome do arquivo vai na URL
app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')));




app.listen(3333)