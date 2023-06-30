<template>
  <div class="home-page container text-center">
    <div class="row align-items-center">
      <div class="text-container col-md-6">
        <h1>Med Storage</h1>
        <p>Explore a vasta coleção de imagens médicas especializadas e obtenha acesso a informações essenciais sobre diversos tipos de exames. No Med Storage, nossa missão é fornecer a você um recurso confiável e abrangente para suas necessidades de imagens médicas.</p>

        <p>Sabemos o quanto a precisão e a clareza são importantes ao lidar com informações médicas, e é por isso que nossa plataforma foi desenvolvida com os mais altos padrões de qualidade. Cada imagem em nosso banco de dados é selecionada criteriosamente e é acompanhada de detalhes relevantes, fornecendo uma experiência enriquecedora para profissionais da área da saúde, pesquisadores e estudantes.</p>
      </div>
      <div class="image-container col-md-6">
        <img src="../assets/medico.png" alt="Ilustração" class="img-fluid">
      </div>
    </div>
  </div>
</template>

<style>
h1 {
  font-family: Montserrat extrabold;
}

p {
  font-family: Montserrat light;
}

.image-container img {
  height: 500px;
  margin-top: 10%;
  margin-left: 1rem;
}

.text-container {
  color: #73BF8E;
  margin-top: 5% !important;
  text-align: justify;
}

@media screen and (max-width: 480px){
  .text-container{
    align-content: center;
  }

  .image-container {
    text-align: center;
  }

  .image-container img {
    margin: 0 auto;
  }
}
</style>
