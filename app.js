//Servicio web de la API
//Importar express
const express = require('express');

//Conexión con mongoo
const mongoose = require('mongose');
const dbconnect = require('./config');
const ModeUser = require('./model');

//Llamar para que reconozca el archivo config
dbconnect();

//Crear aplicación
const app = express();

//Puerto del servidor
const PORT = 3000;

//Para recibir datos JSON
app.use(express.json());

//Manejar las rutas
const router = express.Router();

//Crear usuario
router.post('/cliente', async (req, res)=>{
    const body = req.body;
    const respuesta = await ModeUser.create(body);
    res.send(repuesta)
})

//Consulta general
router.get('/cliente', async (req, res)=>{
    const body = req.body;
    const respuesta = await ModeUser.find({});
    res.send(repuesta)
})

//Consultar por ID
router.get('/:id_cliente', async (req, res)=>{
    const id_cliente = req.params.id_cliente;
    const respuesta = await ModeUser.findById({id_cliente:id_cliente});
    res.send(repuesta)
})

//Actualizar datos del usuario
router.put('/:id_cliente', async(req,res)=>{
    const body = req.body;
    const id_cliente = req.params.id_cliente;
    const respuesta = await ModeUser.findByIdAndUpdate({id_cliente:id_cliente});
    res.send(respuesta)
})

//Eliminar usuario
router.delete('/:id_cliente',async(req, res)=>{
    const id_cliente = req.params.id_cliente;
    const repuesta = await ModeUser.deleteOne({id_cliente:id_cliente});
    res.send(respuesta)
})

//Inicio de sesión: pagian 8 pensar si hacerlo