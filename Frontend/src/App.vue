<template>
  <div id="app">
    <HeaderComp @logged="isLogged()"></HeaderComp>
    <div id="content-logged" v-if:= logged>
      <SideBarComp></SideBarComp>
      <router-view/>
    </div>
    <div v-else:=!logged>
      <router-view/>
    </div>
    
  </div>
</template>

<script>
  import HeaderComp from './components/HeaderComp.vue';
  import SideBarComp from './components/SideBarComp.vue';

  export default {
    name:"App",
    components: {
      HeaderComp,
      SideBarComp
    },
    data() {
      return {
        logged: false
      }
    },
    methods: {
      isLogged(){
        this.logged=true;
      }
    }
  }
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
}

#app {
  font-family: 'Montserrat';
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f2f2f2;
  height: 100%;
}

* {
  box-sizing: border-box;
}

#content-logged {
  margin-top: 5%;
  display: flex;
  justify-content: space-around;
}

@media screen and (max-width: 1920px){
  html, body {
    height: 100%;
    width: 100%;
    background-color: #f2f2f2;
  }
}
</style>

