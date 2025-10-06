<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">Maratón Estadísticas</router-link>
      <div class="navbar-nav">
        <router-link class="nav-link" to="/atletas">Atletas</router-link>
        <router-link class="nav-link" to="/ciudades">Ciudades</router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>