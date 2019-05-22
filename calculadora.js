var calculadora = {
    suma : function(x,y) {
        return (x + y);
    },
    resta : function(x,y) {
        return (x - y);
    },
    multiplicacion : function(x,y) {
        return (x * y);
    },
    division : function(x,y) {
        return (x / y);
    }
};

console.log('Iniciando la calculadora en Codigo');

sum = calculadora.suma(6,7);
res = calculadora.resta(10000,500);
mul = calculadora.multiplicacion(200,50);
div = calculadora.division(10,2);

console.log(`suma: ${sum}`);
console.log(`resta: ${res}`);
console.log(`multiplicación: ${mul}`);
console.log(`división: ${div}`);
console.log(`adios`);