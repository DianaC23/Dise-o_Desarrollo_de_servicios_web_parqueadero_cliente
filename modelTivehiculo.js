//MODELO QUE VA A CONTENER LA BASE DE DATOS DEL TIPO DE VEHICULO
//llamar a moongose
const {Schema, model} = require('mongoose');
//Nueva variable para acceder al esquema de la base de datos
const TipoVehiculoschema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    documento: {
        type: String,
        required: true
    },
    placa: {
        type: String,
        required: true
    } 
},{
        timestamps: true,
        versionKey:false
    });
module.exports = model('TipoVehiculo', TipoVehiculoschema);