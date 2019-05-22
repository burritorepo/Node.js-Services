var express = require("http");
var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");


// Connect to database
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'barberia',
    user: 'root',
    password: '',
});

// Check connection status
connection.connect((err) => {
    if (err) {
        console.error('error en la conexión', err.stack); // para saber cúal es el error de conexión
        return;
    }
    console.log(`Ya estás conectado ${connection.threadId}`); // indicar si ya estamos conectados 
});

// urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Creating server

var server = app.listen(3000, '127.0.0.1', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('running inside server http://%s:%s', host, port);
})

// Rest API to call all our barberos
// We should call a store procedure instead of passing a connection query
app.get('/barberos', function (req, res) {
    connection.query('select * from reservabarberia_barbero',
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    connection.end();
});

// Rest API to call barberos by id
app.get('/barberos/:codbarbero', function (req, res) {
    connection.query('select * from reservabarberia_barbero where codbarbero=?', [req.params.codbarbero], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

// Rest API to add barberos
app.post('/barberos', function (req, res) {
    var params = req.body;
    console.log(params);
    connection.query('INSERT INTO reservabarberia_barbero SET ?',
        params, function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
});

// Rest API to update or modify our barberia's database
/* app.put('/barberos', function (req, res) {
    var params = req.body;
    console.log(params);
    connection.query('UPDATE reservabarberia_barbero SET barberonom=?, fecharegistro=?, descripcion=?, correo=?, fotobarbero=? where codbarbero=?',
        [req.body.barberonom, req.body.fecharegistro, req.body.descripcion, req.body.correo, req.body.fotobarbero, req.body.codbarbero], function (error, results, fields) {
            if (error) throw error;
            res.end('Se modifico!');
        });
}); */
app.put('/barberos', function (req, res) {
    connection.query('UPDATE reservabarberia_barbero set barberonom=?,fecharegistro=?,descripcion=?,correo=?,fotobarbero=? where codbarbero=?',
    [req.body.barberonom, req.body.fecharegistro, req.body.descripcion, req.body.correo, req.body.fotobarbero, req.body.codbarbero], function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results.affectedRows));
        });
});

// Rest API to delete barbero
app.delete('/barberos', function (req, res) {
    var params = req.body;
    console.log(params);

    connection.query('DELETE FROM reservabarberia_barbero where codbarbero=?',
        [req.body.codbarbero], function (error, results, fields) {
            if (error) throw error;
            res.end('El barbero fue eliminado');
        });
})