<template>
    <div class="container">
        <h2>ciudades</h2>
        <RouterLink to="/ciudades/nuevo" class="btn btn-primary mb-3">Nueva Ciudad</RouterLink>
        <div v-if="loading">Cargando...</div>
        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ciudad in ciudades" :key="ciudad.id">
                        <td>{{ ciudad.id }}</td>
                        <td>{{ ciudad.nombre }}</td>
                        <td>
                            <RouterLink :to="`/ciudades/${ciudad.id}`" class="btn btn-sm btn-warning">Editar</RouterLink>
                            <button @click="eliminar(ciudad.id)" class="btn btn-sm btn-danger ms-1">Eliminar</button>
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
const ciudades = ref([]);
const loading = ref(false);

const cargarCiudades = async () => {
    loading.value = true;
    try {
        const response = await api.get('/ciudades');
        ciudades.value = response.data;
    } catch (error) {
        alert('Error al cargar ciudades');
    }
    loading.value = false;
};

const eliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta ciudad?')) return;
    try {
        await api.delete(`/ciudades/${id}`);
        await cargarCiudades();
    } catch (error) {
        alert(error.response?.data?.error || 'Error al eliminar ciudad');
    }
};

onMounted(cargarCiudades);
</script>