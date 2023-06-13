<template>
    <div class="container ms-3 me-3">
        <div class="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-title">Visualizar Imagens</h2>
                <div id="filter">
                    <div class="filter-item-container">
                        <i class="fa fa-search mt-2" aria-hidden="true"></i>
                        <InputComp class="filter-item" name="pesquisar" type="pesquisar" placeHolder="Pesquisar"></InputComp>
                    </div>
                    <div class="filter-item-container">
                        <i class="fa fa-filter mt-2" aria-hidden="true"></i>
                        <InputComp class="filter-item" name="filtro" type="filtro" placeHolder="Filtro" :function="changeValues"></InputComp>
                    </div>
                </div>
            </div>
            <div class="imagens mt-4">
               <template v-for="(imagem, index) in imagensPagina" :key="index">
                 <li><img class="mamografia.jpg" src="../assets/mamografia.jpg" :alt="imagem.alt" @click="openModal('mamografia.jpg')"/></li>
               </template>
            </div>

            <div class="pagination">
                <div class="pagination-buttons">
                    <button @click="paginaAnterior" :disabled="paginaAtual === 1" class="pagination-button">Anterior</button>
                    <button @click="proximaPagina" :disabled="!existemMaisPaginas" class="pagination-button">Próxima</button>
                </div>
            </div>
            <div class="modal" v-if="selectedImage">
              <div class="modal-content">
                <div class="modal-header">
                  <h2 class="modal-title">Visualização</h2>
                  <button class="modal-close" @click="closeModal">&#10006;</button>
                </div>
                 <div class="modal-body">
                   <div class="modal-image-container">
                      <img class="mamografia.jpg" src="../assets/mamografia.jpg" alt="image.alt">
                   </div>
                   <div class="modal-info">
                   <label for="info1">ID Paciente:</label>
                   <input type="text" id="info1" :value="imagensBackend[0].idPaciente" disabled>
                   <label for="info2">Orientação:</label>
                   <input type="text" id="info2" v-model="imagensBackend[0].orientacao" disabled>
                   <label for="info3">Qualidade:</label>
                   <input type="text" id="info3" v-model="imagensBackend[0].qualidade" disabled>
                   <label for="info4">Patologia:</label>
                   <input type="text" id="info4" v-model="imagensBackend[0].patologia" disabled>
                   </div>
               </div>

               </div>
             </div>
           </div>
         </div>
</template>

<script>

import InputComp from '../components/InputComp.vue'

export default {
    components: {
        InputComp
    },
    data() {
        return {
            selectedImage: null,
            info1: '',
            info2: '',
            info3: '',
            info4: '',
            imagensBackend: [], // Array para armazenar as imagens obtidas do backend
            imagensPorPagina: 8,
            paginaAtual: 1
        };

    },
    computed: {
    existemMaisPaginas() {
      return this.paginaAtual < this.totalPaginas;
    },
    totalPaginas() {
      return Math.ceil(this.imagensBackend.length / this.imagensPorPagina);
    },
    imagensPagina() {
      const inicio = (this.paginaAtual - 1) * this.imagensPorPagina;
      const fim = inicio + this.imagensPorPagina;
      return this.imagensBackend.slice(inicio, fim);
    }
  },
  methods: {
    openModal(image) {
      this.selectedImage = image;
    },
    closeModal() {
      this.selectedImage = null;
      this.info1 = '';
      this.info2 = '';
      this.info3 = '';
      this.info4 = '';
    },
    paginaAnterior() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
      }
    },
    proximaPagina() {
      if (this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++;
      }
    }
  },
  created() {
/*teste*/
    this.imagensBackend = [
      { src: '../assets/mamografia.jpg', alt: 'Imagem 1', idPaciente: '123', orientacao: '...', qualidade: '...', patologia: '...' },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 2' , idPaciente: '124', orientacao: '...', qualidade: '...', patologia: '...' },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 3' , idPaciente: '125', orientacao: '...', qualidade: '...', patologia: '...' },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 4' , idPaciente: '126', orientacao: '...', qualidade: '...', patologia: '...' },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 5' , idPaciente: '127', orientacao: '...', qualidade: '...', patologia: '...' },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 6' , idPaciente: '128', orientacao: '...', qualidade: '...', patologia: '...' },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 7', idPaciente: '129', orientacao: '...', qualidade: '...', patologia: '...'  },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 8' , idPaciente: '130', orientacao: '...', qualidade: '...', patologia: '...' },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 9' , idPaciente: '131', orientacao: '...', qualidade: '...', patologia: '...' },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 10' , idPaciente: '132', orientacao: '...', qualidade: '...', patologia: '...' },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 11' , idPaciente: '133', orientacao: '...', qualidade: '...', patologia: '...' },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 12', idPaciente: '134', orientacao: '...', qualidade: '...', patologia: '...'  },
      { src: '../assets/mamografia.jpg', alt: 'Imagem 13', idPaciente: '135', orientacao: '...', qualidade: '...', patologia: '...'  },


    ];
  }
};

</script>

<style scoped>

  * {
    color: #73bf8e;
    font-weight: 100;
}
.container{
    background-color: #f2f2f2;
}
.sidebar {
    font-family: 'Montserrat', sans-serif;
    background-color: #ffffff;
    padding: 5%;
    padding-top: 2.5%;
    margin: 0 auto; /* Adicionado para centralizar horizontalmente */
    height: 80vh;
    width: 100%;
    border-radius: 25px;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.613);
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sidebar-title {
    margin-top: 0;
    margin-bottom: 3%;
    font-size: 25px;
    text-align: left;
    font-weight: bold;
}

#filter {
    width: 30%;
    display: flex;
    flex-direction: column;
}

.filter-item {
    width: 90%;
    margin-bottom: 10px;
}

.filter-item-container{
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.imagens {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: center;
}

.imagens img {
  max-width: 100%;
  max-height: 100%;
  margin: 2%;
}

.imagens li {
  list-style-type: none;
}

.pagination {
  position: center;
  bottom: 6px;
  right: 10px;
  margin-top: 12px;
  margin-left: 80%
}

.pagination-buttons {
  display: flex;
  gap: 5px;
}

.pagination-button {
  padding: 5px 10px;
  font-size: 14px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.613);
  text-align: center;
  width: 40%;
  max-width: 800px;
  max-height: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-title {
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 0;
}

.modal-body {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.modal-image-container {
  flex: 1;
  text-align: left;
}

.modal-image {
  max-width: 100%;
  max-height: 400px;
  width: auto;
}

.modal-info {
  flex: 1;
  margin-left: 20px;
  text-align: left;
  
}

.modal-info label {
  display: block;
  margin-bottom: 5px;
}

.modal-info input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #f2f2f2;
  border: 0.5px solid #f2f2f2;
}

.modal-close {
  padding: 5px 10px;
  background-color: #73bf8e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}



@media (max-width: 576px) {
    .container{
    background-color: #f2f2f2;
}
  .sidebar {
    height: auto;
  }

  .sidebar-title {
    font-size: 20px;
    margin-top: 5px;
    justify-content: center;
  }
  .sidebar-header{
        flex-direction: column;
    }

  #filter {
    width: 80%;
    margin-top: 10px;
  }

  .imagens {
    justify-content: center;

  }

  .imagens li {
    width: 90%;
    margin: 10px;
  }

  .pagination{
    margin: auto;
  }

    .modal-content {
    width: auto;
  }

   .modal-body {
    flex-direction: column;
  } 

  .modal-image-container{
    flex: 1;
    text-align: center;
  }
  .modal-info {
    margin: 10px 0;
  }

  .modal-image {
    max-height: 200px;
  }
}

 @media (min-width:577px) and (max-width: 735px) {

    .modal-content {
    width: auto;
  }

  .modal-body {
    flex-direction: column;
  }

  .modal-image-container{
    flex: 1;
    text-align: center;
  }
  .modal-info {
    margin: 10px 0;
  }

  .modal-image {
    max-height: 200px;
  }

  .sidebar-title {
    
    margin-top: 5px;
    justify-content: center;
  }
  .sidebar-header{
        flex-direction: column;
    }


  .sidebar{
    height: auto;
  }

  #filter {
    width: 80%;
    margin-top: 10px;
  }
  .pagination{
    margin-left: auto;
  }
} 

 @media (min-width: 736px) and (max-width: 1000px) {
  .container{
    background-color: #f2f2f2;
  }
  .imagens li {
    width: 40%;
    margin: 10px;
  }
  .sidebar-title {
    
    margin-top: 5px;
    justify-content: center;
  }
  .sidebar-header{
        flex-direction: column;
    }


  .sidebar{
    height: auto;
  }

  #filter {
    width: 65%;
    margin-top: 10px;
  }
  .pagination{
    margin:auto;
  }
  .modal-content {
    width: auto;
  }

  .modal-body {
    flex-direction: column;
  }

  .modal-image-container{
    flex: 1;
    text-align: center;
  }
  .modal-info {
    margin: 10px 0;
  }

  .modal-image {
    max-height: 200px;
  }

} 
@media (min-width: 1001px) and (max-width: 1220px) {
  .imagens li {
    width: 30%;
    margin: 10px;
  }
  .sidebar{
    height: auto;
  }
  .modal-content {
    width: auto;
  }
} 

</style>
