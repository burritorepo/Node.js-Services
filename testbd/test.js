var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'barberia'
  });

connection.connect((err) => {
    if (err) {
        console.error('error en la conexión', err.stack); // para saber cúal es el error de conexión
        return;
    }
    console.log(`Ya estás conectado ${connection.threadId}`); // indicar si ya estamos conectados 
});

connection.query('select * from reservabarberia_barbero' ,
     function (error,results,fields){
         if (error)
           throw error;
         results.forEach(result => {
             console.log(result);
         });
});
connection.end();

