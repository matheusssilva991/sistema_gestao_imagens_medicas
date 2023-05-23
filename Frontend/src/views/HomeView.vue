<template>
  <div class="home">
    <HeaderComp/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComp from '@/components/HeaderComp.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderComp
  }
}
</script>

<style>
.home {
  width: 90%;
  margin: auto;
}
</style>
