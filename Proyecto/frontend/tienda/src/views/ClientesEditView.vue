<template>
    <div class="container mt-5">
       <div class="card">
        <div class="card-header">
            <h4>Editar cliente</h4>
            <div v-if="mensaje==1" class="alert alert-primary" role="alert">
                Datos actualizados con éxito
            </div>
        </div>
        <div class="card-body">
            
            <div class="mb-3">
                <label for="">Id</label>
                <input type="text" class="form-control" v-model="model.cliente.id">
            </div>
            <div class="mb-3">
                <label for="">Nombre</label>
                <input type="text" class="form-control" v-model="model.cliente.nombre">
            </div>
            <div class="mb-3">
                <label for="">Apellido</label>
                <input type="text" class="form-control" v-model="model.cliente.apellido">
            </div>
            <div class="mb-3">
                <label for="">Dirección</label>
                <input type="text" class="form-control" v-model="model.cliente.direccion">
            </div>
            <div class="mb-3">
                <label for="">Teléfono</label>
                <input type="text" class="form-control" v-model="model.cliente.telefono">
            </div>
            <div class="mb-3">
                <label for="">RFC</label>
                <input type="text" class="form-control" v-model="model.cliente.rfc">
            </div>
            <div class="mb-3">
                <label for="">CURP</label>
                <input type="text" class="form-control" v-model="model.cliente.curp">
            </div>
            <div class="mb-3">
                <label for="">CP</label>
                <input type="text" class="form-control" v-model="model.cliente.cp">
            </div>
            <div class="mb-3">
                <button type="button" class="btn btn-primary" @click="actualizarCliente()">Actualizar</button>
            </div>
    
        </div>
       </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default{
        name: 'ClientesCreate',
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
        mounted(){
            // console.log(this.$route.params.id)
            this.getCliente(this.$route.params.id);
        },
        methods: {
            getCliente(clienteID){
                axios.get('http://localhost:3000/api/clientes/'+clienteID).then(res=>{
                    // console.log(res.data)
                    this.model.cliente = res.data[0]
                    // this.model.cliente.id=res.data[0].id
                    // this.model.cliente.nombre=res.data[0].nombre
                    // this.model.cliente.apellido=res.data[0].apellido
                    // this.model.cliente.direccion=res.data[0].direccion
                    // this.model.cliente.telefono=res.data[0].telefono
                    // this.model.cliente.rfc=res.data[0].rfc
                    // this.model.cliente.curp=res.data[0].curp
                    // this.model.cliente.cp=res.data[0].cp
                });
            },
            actualizarCliente(){
                this.model.cliente.id = this.$route.params.id
                axios.put('http://localhost:3000/api/clientes/'+this.model.cliente.id, this.model.cliente)
                    .then(res => {
                        if(res.data.affectedRows == 1){
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
                    .catch(function(error){
                        console.log(error)
                    })
            }
        }
    }
</script>