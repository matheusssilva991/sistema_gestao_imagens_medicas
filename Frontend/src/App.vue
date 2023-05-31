<template>
  <div>
    <Side-Bar-Component />
    <!-- <router-view></router-view> ONDE EU TAVA ERRANDO, GERANDO DUAS ROTAS -->
  </div>
</template>

<script>
import SideBarComponent from './components/SideBarComponente.vue'

export default {
  name: 'App',
  components: {
    SideBarComponent
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');


body {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400; /* Peso normal da fonte */
}

strong {
  font-weight: 700; /* Peso negrito da fonte */
}


#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
