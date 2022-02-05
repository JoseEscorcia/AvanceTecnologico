/* Este archivo se encargará de leer las lecturas desde Arduino */

//Importar modulos
const serialPort = require('serialport'); //Esta libreria me permite acceder a los puertos serie. Podemos conectarnos con Arduino
const express = require('express'); //Este modulo es para crear servidores
const http = require('http');
const SocketIO = require('socket.io');

const app = express(); 
const server = http.createServer(app); //Servidor
const io = require('socket.io')(server); //Inicializando socket.io

var arduinoCOMPort = 'COM3'; //Puerto Arduino

const Placa = new serialPort(arduinoCOMPort, {
    baudRate: 9600 //Velocidad de comunicacion en baudios
});

Placa.on('open', function(){ //Cuando la conexion sea abierta haga tal cosa
    console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

Placa.on('error', function (err) { //Y si en dado caso recibe algún error entonces que lo imprima en consola
    console.log(err);
});

//Ruta inicial '/'
app.get('/', function (req, res) { //cuando pidan la ruta inicial has tal cosa
    res.send('En pausa');
    Placa.write('open', function(){
        console.log('message written');
        Placa.write("0");
    }); 
});

//Encender o Apagar LED
//            ENCIENDE
app.get('/1', function (req, res)  {

    Placa.write('open', function(){
        console.log('message written');
        Placa.write("E");
        res.send('Encendido');
    });       
});

//            APAGA
app.get('/2', function (req, res)  {

    Placa.write('open', function(){
        console.log('message written');
        Placa.write("A");
        res.send('Apagado!');

    });
       
});

//El servidor quedará escuchando en el puerto 3000 y va a hacer tal cosa
server.listen(3000, function () {
    console.log('server listening on port', 3000);
});
