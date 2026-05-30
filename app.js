//Servicio web de la API
//Importar express
const express = require('express');

//Conexión con mongoo
const mongoose = require('mongoose');
const dbconnect = require('./config');
const ModeUser = require('./modelcliente');
const ModeEmpleado = require('./modelempleado');

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
/***********=========================*********
 * RUTA PARA CREAR CLIENTES
 **********=========================**********/
//Crear usuario
router.post('/cliente', async (req, res)=>{
    try {
        const respuesta = await ModeUser.create(req.body);
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al crear",error:error.message});
    }
})

//Consulta general
router.get('/cliente', async (req, res)=>{
    try {
        const respuesta = await ModeUser.find({});
    res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al consultar",error:error.message});
    }
})

//Consultar por documento
router.get('/cliente/:id_cliente', async (req, res)=>{
    try {
        const documento_buscar = req.params.id_cliente;
        const respuesta = await ModeUser.findOne({documento: documento_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Cliente no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al consultar por ID",error:error.message});
    }
    
})

//Actualizar datos del usuario
router.put('/cliente/:id_cliente', async(req,res)=>{
    try {
        const documento_buscar = req.params.id_cliente;
        const respuesta = await ModeUser.findOneAndUpdate({documento: documento_buscar}, req.body, {new:true});
        if(!respuesta){
            return res.status(404).json({mensaje:"Cliente no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al actualizar datos",error:error.message});
    }
    
})

//Eliminar usuario
router.delete('/cliente/:id_cliente',async(req, res)=>{
    try {
        const documento_buscar = req.params.id_cliente;
        const respuesta = await ModeUser.findOneAndDelete({documento: documento_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Cliente no encontrado"});
        }
        res.send({mensaje: "usuario eliminado con exito"});
    } catch (error) {
        res.status(500).json({mensaje:"Error al eliminar", error: error.message});
    }

    
});
/***********=========================*********
 * RUTA PARA INICIO DE SESIÓN
 **********=========================**********/ 
//Inicio de sesion
//con POST en la ruta debe ir el /login
router.post('/login/cliente',async(req, res)=>{
    try{
        //Guarda el usuario y la contraseña desde mongo db
        const{correo_electronico,contrasena}=req.body;
    //Buscar si el nombre existe en mongodb
    //Busca en la base de datos el usuario que se recibio
    const usuarioExiste = await ModeUser.findOne({correo_electronico});


    //Validar si existe
    //Si el usuario No existe
    if(!usuarioExiste){
        return res.status(401).json({mensaje: "Error de autenticación"});
    }
    //Validar si la contraseña existe
    //Compara la contraseña
    if(usuarioExiste.contrasena=== contrasena){
        //200= todo salio perfecto, ${usuarioExiste.nombre}`} para que aparezca el nombre del usuario
        return res.status(200).json({mensaje:`Autenticación satisfactora, Bienvenido , ${usuarioExiste.nombre}`});
    }else{//401= no autorrizado
        return res.status(401).json({mensaje: "Error de autenticación"});
    }
} catch(error){//obligatorio si la base de datos falla
    //500= Error ineterno
        return res.status(500).json({mensaje:"Error",error:error.message});}
});
/***********=========================*********
 * RUTA PARA CREAR EMPLEADOS
 **********=========================**********/ 
//Crear empleado
router.post('/empleado', async (req, res)=>{
    try {
        const respuesta = await ModeEmpleado.create(req.body);
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al crear empleados",error:error.message});
    }
})

//Consulta general
router.get('/empleado', async (req, res)=>{
    try {
        const respuesta = await ModeEmpleado.find({});
    res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al consultar",error:error.message});
    }
})

//Consultar por documento
router.get('/empleado/:id_empleado', async (req, res)=>{
    try {
        const documento_buscar = req.params.id_empleado;
        const respuesta = await ModeEmpleado.findOne({documento: documento_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Empleado no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al consultar por ID",error:error.message});
    }
    
})

//Actualizar datos del usuario
router.put('/empleado/:id_empleado', async(req,res)=>{
    try {
        const documento_buscar = req.params.id_empleado;
        const respuesta = await ModeEmpleado.findOneAndUpdate({documento: documento_buscar}, req.body, {new:true});
        if(!respuesta){
            return res.status(404).json({mensaje:"Empleado no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al actualizar datos",error:error.message});
    }
    
})

//Eliminar usuario
router.delete('/empleado/:id_empleado',async(req, res)=>{
    try {
        const documento_buscar = req.params.id_empleado;
        const respuesta = await ModeEmpleado.findOneAndDelete({documento: documento_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Empleado no encontrado"});
        }
        res.send({mensaje: "empleado eliminado con exito"});
    } catch (error) {
        res.status(500).json({mensaje:"Error al eliminar", error: error.message});
    }
});
/***********=========================*********
 * RUTA PARA LOGIN EMPLEADOS
 **********=========================**********/ 
//Inicio de sesion
//con POST en la ruta debe ir el /login
router.post('/login/empleado',async(req, res)=>{
    try{
        //Guarda el usuario y la contraseña desde mongo db
        const{correo_electronico,contrasena}=req.body;
    //Buscar si el correo existe en mongodb
    //Busca en la base de datos el usuario que se recibio
    const empleadoExiste = await ModeEmpleado.findOne({correo_electronico});
    //Validar si existe
    if(!empleadoExiste){
        return res.status(401).json({mensaje: "Error de autenticación3"});
    }
    //Validar si la contraseña existe
    //Compara la contraseña
    //Administrador
    if(empleadoExiste.contrasena=== contrasena){
        return res.status(200).json({mensaje:`Autenticación satisfactora, Bienvenido ${empleadoExiste.rol} ${empleadoExiste.nombre} `});
    }else{//401= no autorrizado
        return res.status(401).json({mensaje: "Error de autenticación2"});
    }
} catch(error){//obligatorio si la base de datos falla
    //500= Error ineterno
        return res.status(500).json({mensaje:"Error",error:error.message});}
});
/***********=========================*********
 * RUTA PARA ESPACIOS
 **********=========================**********/ 
//json hara uso de las rutas
//Vincular las rutas a la aplicación express
app.use(router);

//Iniciar el servidor
app.listen(PORT, () =>{
    console.log(`Servidor activo en ${PORT}`)
})