exports.config = {
    'default': {
        'host': 'localhost',
        'port': '3306',
        'user': 'root',
        'password': 'root',
        'database': 'gaveteiro'
    }
};

connection.connect(function (err) {
  if (err) return console.log(err);
  console.log('conectou!');
})
