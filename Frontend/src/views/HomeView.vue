<template>
  <div class="home">
    <HeaderComp/>
    <ImagesView></ImagesView>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComp from '@/components/HeaderComp.vue'
import ImagesView from './ImagesView.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderComp,
    ImagesView
  }
}
</script>

<style>

</style>
