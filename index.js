const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');


//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
var router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

router.get('/gavetas', (req, res) => {
    execSQLQuery('SELECT * FROM gavetas', res);
});

router.get('/gavetas/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM gavetas' + filter, res);
});

router.delete('/gavetas/:id', (req, res) => {
    execSQLQuery('DELETE FROM gavetas WHERE ID=' + parseInt(req.params.id), res);
});

router.post('/gavetas', (req, res) => {
    const name = req.body.name.substring(0, 150);
    const local = req.body.local.substring(0, 11);
    execSQLQuery(`INSERT INTO gavetas(Name, Local) VALUES('${name}','${local}')`, res);
});

router.patch('/gavetas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const name = req.body.name.substring(0, 150);
    const local = req.body.local.substring(0, 11);
    execSQLQuery(`UPDATE gavetas SET Name='${name}', Local='${local}' WHERE ID=${id}`, res);
});

app.use('/', router);

//inicia o servidor
app.listen(port);
//console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'gaveteiro'
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}