//ARQUIVO DE CONFIGURAÇÂO DO KNEX
// Aqui setamos o caminho para criar o arquivo do banco de dados, aonde estão as migrations e outras funcionalidades como seed.

//Lembrando que 

import path from 'path'

module.exports = {
    client:'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database','database.sqlite')
    },
    migrations:{
        directory: path.resolve(__dirname, 'src','database','migrations')
    },
    seeds:{
        directory: path.resolve(__dirname, 'src','database','seeds')
    },
    //Colocamos isso aqui para tirar um warning que apareceu na hora de fazer as migrations
    useNullAsDefault: true,
}