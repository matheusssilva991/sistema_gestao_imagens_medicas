<template>
  <div id="carouselExampleCaptions" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="5000">
      <img src="../assets/image1.jpg" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h3>Mamografia</h3>
        <p>A mamografia é um exame de diagnóstico por imagem usado para detectar alterações no tecido mamário, especialmente em mulheres. É uma ferramenta essencial na detecção precoce do câncer de mama, permitindo um tratamento mais eficaz e aumentando as chances de cura.</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="5000">
      <img src="../assets/image2.jpg" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h3>Ressonância Magnética</h3>
        <p>A ressonância magnética (RM) é uma técnica de imagem avançada que utiliza campos magnéticos e ondas de radiofrequência para criar imagens detalhadas do interior do corpo humano. É um exame não invasivo e altamente preciso, amplamente utilizado em diagnósticos médicos.</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="5000">
      <img src="../assets/image3.jpg" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h3>Ultrassom</h3>
        <p>O ultrassom é uma técnica de diagnóstico por imagem que utiliza ondas sonoras de alta frequência para produzir imagens internas do corpo humano. É um exame não invasivo e indolor, amplamente utilizado em diversas áreas da medicina.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</template>

<script>
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

p{
  font-family: Montserrat;
}

h3{
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
}
</style>
