<template>
    <div class="container">
        <h2>{{ id ? 'Editar Atleta' : 'Nuevo Atleta' }}</h2>
        <form @submit.prevent="guardar">
            <div class="mb-3">>
                <label class="form-label">DNI</label>
                <input v-model.number="form.dni" type="number" class="form-control" required />
            </div>
            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input v-model="form.nombre" class="form-control" required />
            </div>
            <div class="mb-3">
                <label class="form-label">Tiempo (ej: 2h 20m 20s)</label>
                <input v-model="form.tiempo" class="form-control" required />
            </div>
            <div class="mb-3">
                <label class="form-label">Posicion</label>
                <input v-model.number="form.posicion" type="number" min="1" class="form-control" required />
            </div>
            <div class="mb-3">
                <label class="form-label">Ciudad</label>
                <select v-model.number="form.ciudadID" class="form-select" required>
                    <option value="">Seleccionar...</option>
                    <option v-for="ciudad in ciudades" :key="ciudad.id" :value="ciudad.id">{{ ciudad.nombre }}</option>
                </select>
            </div>
            <button type="submit" class="btn btn-succes">Guardar</button>
            <router-link to="/atletas" class="btn btn-secondary ms-2">Cancelar</router-link>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useApi from '@/composables/useApi';

const route = useRoute();
const router = useRouter();
const api = useApi();
const id = route.params.id;
const form = ref({ dni: null, nombre: '', tiempo: '', posicion: null, ciudadID: null });
const ciudades = ref([]);

const cargarCiudades = async () => {
    const response = await api.get('/ciudades');
    ciudades.value = response.data;
};

onMounted(async () => {
    await cargarCiudades();
    if (id) {
        try {
            const response = await api.get(`/atletas/${id}`);
            form.value = response.data;
        } catch (error) {
            alert('Atleta no encontrado');
            router.push('/atletas');
        }
    }
});

const guardar = async () => {
    console.log('Enviando datos:', form.value);
    try {
        if (id) {
            await api.put(`/atletas/${id}`, form.value);
        } else {
            await api.post('/atletas', form.value);
        }
        router.push('/atletas');
    } catch (error) {
        alert(error.response?.data?.error || 'Error al guardar el atleta');
    }
};
</script>