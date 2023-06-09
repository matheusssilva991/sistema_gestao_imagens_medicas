<template>
  <div id="app">
    <HeaderComp @logged="isLogged()"></HeaderComp>
    <div id="content-logged" v-if:= !logged>
      <SideBarComp></SideBarComp>
      <router-view/>
    </div>
    <div v-else:=logged>
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
#app {
  font-family: 'Montserrat';
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f2f2f2;
  height: 100vh;
}

* {
  box-sizing: border-box;
}

#content-logged {
  margin-top: 5%;
  display: flex;
  justify-content: space-around;
}

</style>

