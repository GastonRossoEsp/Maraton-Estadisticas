import { createRouter, createWebHistory } from "vue-router";
import AtletaList from '../views/AtletaList.vue';
import AtletaForm from '../views/AtletaForm.vue';
import CiudadList from '../views/CiudadList.vue';
import CiudadForm from '../views/CiudadForm.vue';

const routes = [
    { path: '/', redirect: '/atletas' },
    { path: '/atletas', component: AtletaList },
    { path: '/atletas/nuevo', component: AtletaForm },
    { path: '/atletas/:id', component: AtletaForm, props: true },
    { path: '/ciudades', component: CiudadList },
    { path: '/ciudades/nuevo', component: CiudadForm },
    { path: '/ciudades/:id', component: CiudadForm, props: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;