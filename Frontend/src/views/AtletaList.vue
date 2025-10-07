<template>
    <div class="container">
        <h2>Atletas</h2>
        <router-link to="/atletas/nuevo" class="btn btn-primary mb-3">Agregar Atleta</router-link>
        <div v-if="loading">Cargando...</div>
        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>Posicion</th>
                        <th>Nombre</th>
                        <th>DNI</th>
                        <th>Tiempo</th>
                        <th>Ciudad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="atleta in atletas" :key="atleta.id" :class="getClasePodio(atleta.posicion)">
                        <td>{{ atleta.posicion }}</td>
                        <td>{{ atleta.nombre }}</td>
                        <td>{{ atleta.dni }}</td>
                        <td>{{ atleta.tiempo }}</td>
                        <td>{{ atleta.ciudadNombre }}</td>
                        <td>
                            <router-link :to="`/atletas/${atleta.id}`" class="btn btn-primary btn-sm">Editar</router-link>
                            <button @click="eliminar(atleta.id)" class="btn btn-sm btn-danger ms-1">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useApi from '@/composables/useApi';

const api = useApi();
const router = useRouter();
const atletas = ref([]);
const loading = ref(false);

const getClasePodio = (posicion) => {
    if (posicion === 1) return 'table-success';
    if (posicion === 2) return 'table-warning';
    if (posicion === 3) return 'table-info';
    return '';
};

const cargarAtletas = async () => {
    loading.value = true;
    try {
        const response = await api.get('/atletas');
        atletas.value = response.data.sort((a, b) => a.posicion - b.posicion);
    } catch (error) {
        alert('Error al cargar atletas');
    }
        loading.value = false;
};

const eliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este atleta?')) return;
    try {
            await api.delete(`/atletas/${id}`);
            await cargarAtletas();
    } catch (error) {
            alert(error.response?.data?.error || 'Error al eliminar atleta');
        }
};

onMounted(cargarAtletas);
</script>

<style scoped>
.table-success td { background-color: #d1e7dd !important; }
.table-warning td { background-color: #fff3cd !important; }
.table-info td { background-color: #cff4fc !important; }
</style>