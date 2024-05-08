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

// Seleccionamos un cliente en especifico 
app.get('/api/clientes/:id', (req, res)=>
{
    conexion.query('SELECT * FROM CLIENTES WHERE ID = ?', (req, params, id), (error, fila)=>
    {
        if(error)
        {
            throw error;
        }
        else
        {
            res.send(fila);
        }
    })
});

app.delete('/api/clientes/:id', (req,res)=>
{
    let id = req.params.id;
    conexion.query('DELETE FROM CLIENTES WHERE ID = ?', [id], (error, filas)=>
    {
        if(error)
        {
            throw error
        }
        else
        {
            res.send(filas)
        }
    })
})

// Insertar un nuevo cliente
app.post('/api/clientes', (req, res)=>
{
    let data = {
        id:req.body.id,
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        direccion:req.body.direccion,
        telefono:req.body.telefono,
        rfc:req.body.rfc,
        curp:req.body.curp,
        cp:req.body.cp
    }
    let sql = "INSERT INTO CLIENTES SET ?";
    conexion.query(sql,data,(error,resultado)=>{
        if(error){
            throw error;
        } else {
            res.send(resultado);
        }

    })
})

// Actualizar
app.put('/api/clientes/:id', (req, res) => {
    let id = req.params.id;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let direccion = req.body.direccion;
    let telefono = req.body.telefono;
    let rfc = req.body.rfc;
    let curp = req.body.curp;
    let cp = req.body.cp;
    let sql = "UPDATE CLIENTES SET NOMBRE = ?, APELLIDO = ?, DIRECCION = ?, TELEFONO = ?, RFC = ?, CURP = ?, CP = ? WHERE ID = ?";
    conexion.query(sql,[nombre, apellido, direccion, telefono, rfc, curp, cp, id], (error, results) => {
        if(error){
            throw error;
        } else{
            res.send(results);
        }
    })
});

// Encender servidor
let puerto = 3000;
app.listen(puerto, function(){
    console.log("Servidor escuchando puerto " + puerto);
})