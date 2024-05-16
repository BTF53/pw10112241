<template>
    <div class="container mt-5"> 
        <div class="card">
            <div class="card-header">
                <h4>Agregar cliente</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos Guardados con exito
                </div>
            </div>    
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="model.cliente.id">
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="model.cliente.nombre">
                </div>
                <div class="mb-3">
                    Apellido
                    <input type="text" class="form-control" v-model="model.cliente.apellido">
                </div>
                <div class="mb-3">
                    Direccion
                    <input type="text" class="form-control" v-model="model.cliente.direccion">
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control" v-model="model.cliente.telefono">
                </div>
                <div class="mb-3">
                    RFC
                    <input type="text" class="form-control" v-model="model.cliente.rfc">
                </div>
                <div class="mb-3">
                    CURP
                    <input type="text" class="form-control" v-model="model.cliente.curp">
                </div>
                <div class="mb-3">
                    CP
                    <input type="text" class="form-control" v-model="model.cliente.cp">
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="guardarCliente()"> Guardar </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "ClientesCreate",
    data(){
        return{
            mensaje: 0,
            model:{
                cliente:{
                    id: '',
                    nombre: '',
                    apellido: '',
                    direccion: '',
                    telefono: '',
                    rfc: '',
                    curp: '',
                    cp: ''
                }     
            }
        }
    },
    methods:{
        guardarCliente(){
            axios.post('http://localhost:3000/api/clientes',this.model.cliente).then
            (res=> {
                if(res.data.affectedRows == 1){ // Si insertamos 1 registro
                    // limpiamos los cuadros de texto
                    this.model.cliente = { 
                        id: '',
                        nombre: '',
                        apellido: '',
                        direccion: '',
                        telefono: '',
                        rfc: '',
                        curp: '',
                        cp: ''
                    }    
                    this.mensaje = 1;
                }
            })
        }
    }
}
</script>