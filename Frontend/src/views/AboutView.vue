<template>
  <div class="about-container">
    <div class="about-text">
      <h1 class="about-title">Bem-vindo ao Med Storage!</h1>
      <p>
        Estamos entusiasmados em apresentar essa plataforma online que visa
        facilitar o acesso
        <br>
        a uma vasta coleção de imagens médicas para
        profissionais da área da saúde,
        <br>
        pesquisadores e entusiastas interessados
        em aprofundar seus conhecimentos 
        <br>
        sobre diagnóstico, tratamento e estudos
        clínicos.
      </p>
      <p>
        Nosso objetivo é fornecer uma solução abrangente e intuitiva para que
        você encontre
        <br>
        e explore uma ampla variedade de imagens médicas,
        incluindo radiografias,
        <br>
        tomografias, ressonâncias magnéticas,
        ultrassonografias e muito mais.
      </p>
      <p>
        Acreditamos que o acesso rápido e fácil a essas imagens é fundamental
        para avanços na 
        <br>
        medicina e no cuidado com a saúde.
      </p>
    </div>
    <div class="about-image">
      <img src="../assets/image4.png" alt="Imagem do projeto" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style>
.about-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
}

.about-text {
  margin-top: 75px;
  width: 50%;
  color: #73bf8e;
  margin-left: 175px;
}

.about-title {
  font-family: Montserrat Extrabold;
}

.about-image {
  width: 20%;
  margin-top: 100px;
  margin-right: 175px;
  text-align: center;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;
}

img {
  max-width: 100%;
}
</style>
