const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'gaveteiro'
});

connection.connect(function (err) {
  if (err) return console.log(err);
  console.log('conectou!');
  addRows(connection);
})

function createTable(conn) {

  const sql = "CREATE TABLE IF NOT EXISTS Gavetas (\n" +
    "ID int NOT NULL AUTO_INCREMENT,\n" +
    "Name varchar(150) NOT NULL,\n" +
    "Local char(11) NOT NULL,\n" +
    "PRIMARY KEY (ID)\n" +
    ");";

  conn.query(sql, function (error, results, fields) {
    if (error) return console.log(error);
    console.log('criou a tabela!');
  });

}

function addRows(conn) {
  const sql = "INSERT INTO Gavetas(Name, Local) VALUES ?";
  const values = [
    ['Estante', 'Proximo a janela'],
    ['Gaveteiro Preto', 'Proximo Porta'],
    ['Guarda Roupa', 'Parede proxima ao gaveteiro']
  ];
  conn.query(sql, [values], function (error, results, fields) {
    if (error) return console.log(error);
    console.log('adicionou registros!');
    conn.end();//fecha a conexão
  });
}