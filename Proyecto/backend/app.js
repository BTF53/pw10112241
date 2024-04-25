let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

// Conexion a MySQL - cadena
let conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'pwdata',
    port: '3306'
});

//No Conectamos a MySQL
conexion.connect(function(error){
    if(error){
        throw error;
    } else{
        console.log('Conectado a a base de datos');
    }
});

// Rutas de acceso
app.get("/", function(req,res){
    res.send("Ruta de inicio");
})

// Seleccionamos todos los clientes
app.get('/api/clientes',(req, res)=>{
    conexion.query('SELECT * FROM CLIENTES', (error, filas)=>{
        if(error){
            throw error;
        } else{
            res.send(filas);
        }
    });
});

// Encender servidor
let puerto = 3000;
app.listen(puerto, function(){
    console.log("Servidor escuchando puerto " + puerto);
})