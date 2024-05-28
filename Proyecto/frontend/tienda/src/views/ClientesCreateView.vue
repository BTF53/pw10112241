<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar cliente</h4>
                <div v-if="mensaje==1" class="alert alert-primary" role="alert">
                    Datos guardados con éxito
                </div>
            </div>
                <div class="card-body">
                    <Form :validation-schema="validationSchema" @submit="onTodoValidado">
                        <div class="mb-3">
                            <label for="id">Id</label>
                            <Field name="id" id="id" type="number"  class="form-control" v-model="model.cliente.id"/>
                            <ErrorMessage name="id"  class="errorValidacion" />
                        </div>
                        <div class="mb-3">
                            <label for="nombre">Nombre</label>
                            <Field name="nombre" id="nombre" type="text"  class="form-control" v-model="model.cliente.nombre" />
                            <ErrorMessage name="nombre" class="errorValidacion"/>
                        </div>
                        <div class="mb-3">
                            <label for="apellido">Apellido</label>
                            <Field name="apellido" id="apellido" type="text"  class="form-control" v-model="model.cliente.apellido" />
                            <ErrorMessage name="apellido" class="errorValidacion"/>
                        </div>
                        <div class="mb-3">
                            <label for="direccion">Dirección</label>
                            <Field name="direccion" id="direccion" type="text"  class="form-control" v-model="model.cliente.direccion" />
                            <ErrorMessage name="direccion" class="errorValidacion"/>
                        </div>
                        <div class="mb-3">
                            <label for="telefono">Teléfono</label>
                            <Field  name="telefono" id="telefono" type="text" class="form-control" v-model="model.cliente.telefono" />
                            <ErrorMessage name="telefono" class="errorValidacion"/>
                        </div>
                        <div class="mb-3">
                            <label for="rfc">RFC</label>
                            <Field name="rfc" type="text" id="rfc"  class="form-control" v-model="model.cliente.rfc" />
                            <ErrorMessage name="rfc" class="errorValidacion" />
                        </div>
                        <div class="mb-3">
                            <label for="curp">CURP</label>
                            <Field  name="curp"  type="text" id="curp"class="form-control" v-model="model.cliente.curp" />
                            <ErrorMessage name="curp" class="errorValidacion"/>
                        </div>
                        <div class="mb-3">
                            <label for="cp">CP</label>
                            <Field name="cp" type="text" id="cp" class="form-control" v-model="model.cliente.cp" />
                            <ErrorMessage name="cp" class="errorValidacion"/>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Agregar</button>
                        </div>
                    </Form>
                </div>
        </div>
    </div>
</template>

<script>
    // npm install vee-validate zod @vee-validate/zod --save
    import axios from 'axios'
    import { Field, Form, ErrorMessage } from 'vee-validate';
    import { toTypedSchema } from '@vee-validate/zod';
    import * as zod from 'zod';

    export default{
        name: 'ClientesCreate',
        components: {  Field, Form, ErrorMessage },
        data(){
                const phoneRegex = new RegExp(
                    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
                ); 
                const rfcRegex = new RegExp(
                    /^([a-z]{3,4})(\d{2})(\d{2})(\d{2})([0-9a-z]{3})$/i
                );
                const curpRegex = new RegExp(
                    /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/g
                );
                const cpRegex = new RegExp(
                    /^[0-9]{5}$/
                );
                
                const validationSchema = toTypedSchema(
                zod.object({
                    id: zod.number({message: 'Solo números'}).int(),
                    nombre: zod.string().min(1,{message: 'Requerido'}),
                    apellido: zod.string().min(1,{message: 'Requerido'}),
                    direccion: zod.string().min(1,{message: 'Requerido'}),
                    telefono: zod.string().regex(phoneRegex,'Número no válido').min(10,{message: 'Mínimo 10 dígitos'}).max(15),
                    rfc: zod.string().regex(rfcRegex,'RFC no válido'),
                    curp: zod.string().regex(curpRegex,'CURP no válida'),
                    cp: zod.string().regex(cpRegex,'Código postal no válido'),
                })
            );
            return{
                validationSchema,
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
        methods: {
            onTodoValidado(values){
                // alert(JSON.stringify(values, null, 2));
                this.guardarCliente();
            },
            guardarCliente(){
                axios.post('http://localhost:3000/api/clientes', this.model.cliente)
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

<style scoped>
    .errorValidacion{
        color: red;
        font-weight: bold;
    }
</style>