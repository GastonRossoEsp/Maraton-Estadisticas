<template>
    <div class="container">
        <h2>{{ id ? 'Editar Ciudad' : 'Nueva Ciudad' }}</h2>
        <form @submit.prevent="guardar">
            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input v-model="form.nombre" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-success">Guardar</button>
            <router-link to="/ciudades" class="btn btn-secondary ms-2">Cancelar</router-link>
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
const form = ref({ nombre: '' });

onMounted(async () => {
    if (id) {
        try {
            const response = await api.get(`/ciudades/${id}`);
            form.value = response.data;
        } catch (error) {
            alert('Error al cargar la ciudad');
            router.push('/ciudades');
        }
    }
});
const guardar = async () => {
    try {
        if (id) {
            await api.put(`/ciudades/${id}`, form.value);
        } else {
            await api.post('/ciudades', form.value);
        }
        router.push('/ciudades');
    } catch (error) {
        alert(error.response?.data?.error || 'Error al guardar la ciudad');
    }
};

</script>