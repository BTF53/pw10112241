<script setup>
    
</script>


<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container">
            <RouterLink class="navbar-brand" to="/">Tienda</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <RouterLink class="navbar-brand" to="/clientes">Clientes</RouterLink>
                    <RouterLink class="navbar-brand" to="proveedores">Proveedores</RouterLink>
                    <RouterLink class="navbar-brand" to="/ventas">Ventas</RouterLink>
                    <RouterLink class="navbar-brand" to="/clientes/registro">Registro</RouterLink>
                    <RouterLink class="navbar-brand" to="/clientes/entrada">Entrada</RouterLink>
                    <button @click="salidaSistema()" class="btn btn-primary" v-if="validado==true"> 
                        Salir
                    </button>
                </li>
            </ul>
            </div>
        </div>
        </nav>
  </div>
</template>
<script>
    import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
    import { RouterLink } from 'vue-router'
    export default {
        name:"MenuView",
        data(){
            return{
                validado: false,
                auth: '',
            }
        },
        mounted(){
            this.auth = getAuth()
            onAuthStateChanged(this.auth,(user)=>{
                if(user){
                    this.validado = true
                } else{
                    this.validado = false
                }
            })
        },
        methods:{
            salidaSistema(){
                signOut(this.auth).then(() => {
                    this.$router.push("/")
                })
            }
        }
    }
</script>