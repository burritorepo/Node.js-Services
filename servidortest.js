var http = require('http');
var server = http.createServer();

function mensaje(petic,resp){
    resp.writeHead(200,{'content-type':'text/plain'});
    resp.write('Bienvenidos al servidor de Nodejs');
    resp.end();
}

// Llamo al servidor y le paso el callback mensaje
server.on('request', mensaje);

// Puerto al que se escucha
server.listen(3000, function() {
    console.log('La aplicación está corriendo en el puerto 3000')
});
