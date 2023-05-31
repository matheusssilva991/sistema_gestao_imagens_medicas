<template>
  <div id="app">
    <HeaderComp></HeaderComp>
    <router-view/>
  </div>
</template>

<script>
  import HeaderComp from './components/HeaderComp.vue';

  export default {
    name:"App",
    components: {
      HeaderComp
    }
  }
</script>

<style>
#app {
  font-family: 'Montserrat';
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f2f2f2;
}

* {
  box-sizing: border-box;
}

</style>

