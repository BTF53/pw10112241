<template>
  <div class="container mt-5" >
    <div class="card">
        <div class="card-header">
            <h4>
                Clientes
                <RouterLink to="/clientes/create" class="btn btn-primary float-end">
                    Agregar
                </RouterLink>
            </h4>
        </div>
        <div class="card-body">
            <table  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>RFC</th>
                        <th>CURP</th>
                        <th>CP</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody v-if="clientes.length > 0">
                    <tr v-for="(cliente,index) in clientes" :key="index">
                        <td>{{ cliente.id }}</td>
                        <td>{{ cliente.nombre }}</td>
                        <td>{{ cliente.apellido }}</td>
                        <td>{{ cliente.direccion }}</td>
                        <td>{{ cliente.telefono }}</td>
                        <td>{{ cliente.rfc }}</td>
                        <td>{{ cliente.curp }}</td>
                        <td>{{ cliente.cp }}</td>
                        <td>
                            <RouterLink :to="{path: '/clientes/'+cliente.id+'/edit'}" class="btn btn-success">
                                Editar
                            </RouterLink>
                            &nbsp;
                            <button type="button" class="btn btn-danger" @click="deleteCliente(cliente.id)">Borrar</button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr><td colspan="7">Cargando datos</td></tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>
<script>
    import axios from 'axios'
    import { RouterLink } from 'vue-router';
    export default{
        name: 'clientes',
        data(){
            return{
                clientes: [],
            }
        },
        mounted(){
            this.getClientes();
        },
        methods: {
            getClientes(){
                axios.get('http://localhost:3000/api/clientes').then(res=>{
                    this.clientes = res.data;
                });
            },
            deleteCliente(c){
                axios.delete('http://localhost:3000/api/clientes/'+c).then(res =>{
                    if(res.data.affectedRows > 0){
                        this.getClientes();
                    }
                });
            }
        }
    }
</script>

