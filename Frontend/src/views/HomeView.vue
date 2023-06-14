<template>
<<<<<<< HEAD
  <div>
    <transition-group name="fade" tag="div">
      <div v-for="i in [currentIndex]" :key="i">
        <div class="overlay"></div>
        <img :src="currentImg" />
        <div class="slide-text">
          <h1>Med Storage</h1>
          <p>
            O Med Storage é o seu destino confiável para acessar uma ampla gama
            de imagens médicas. Nossa plataforma intuitiva permite que
            profissionais da saúde, pesquisadores e estudantes encontrem
            facilmente radiografias, tomografias, ressonâncias magnéticas e
            muito mais. Nossa coleção em constante expansão oferece imagens de
            alta qualidade e precisão, garantindo que você encontre exatamente o
            que procura. Com o Med Storage, você terá acesso rápido e seguro a
            um banco de dados de imagens médicas essenciais. Aprimore seus
            estudos, pesquise casos clínicos e aprofunde seu conhecimento com
            facilidade. Junte-se a nós no Med Storage e descubra um mundo de
            imagens médicas ao seu alcance.
          </p>
        </div>
      </div>
    </transition-group>
    <a class="prev" @click="prev" href="#">&#10094; Previous</a>
    <a class="next" @click="next" href="#">&#10095; Next</a>
=======
  <div class="home">
    <h1>Home</h1>
>>>>>>> Alessandro
  </div>
</template>

<script>
<<<<<<< HEAD
import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";

// @ is an alias to /src
export default {
  name: "HomeView",
  data() {
    return {
      images: [image1, image2, image3],
      timer: null,
      currentIndex: 0,
    };
  },
  mounted: function () {
    this.startSlide();
  },
  methods: {
    startSlide: function () {
      this.timer = setInterval(this.next, 4000);
    },
    next: function () {
      this.currentIndex += 1;
    },
    prev: function () {
      this.currentIndex -= 1;
    },
  },
  computed: {
    currentImg: function () {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
  },
};
</script>

<style scoped>

h1{
  font-family: Montserrat extrabold;
}
.slide-text {
  position: fixed;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  color: white;
  text-align: justify;
  z-index: 1;
}
.overlay {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* Define a cor do overlay e a opacidade */
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.9s ease;
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width: 100%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  width: 100%;
  opacity: 0;
}

img {
  height: 645px;
  width: 100%;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
}

.next {
  right: 0;
}

.prev {
  left: 0;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.9);
=======
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
  }
}
</script>

<style scoped>
.home {
  width: 90%;
  margin: auto;
>>>>>>> Alessandro
}
</style>
