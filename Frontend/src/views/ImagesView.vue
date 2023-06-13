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
                <li><img class="mamografia.jpg" src="../assets/mamografia.jpg" alt="" onclick="openModal()"/></li>
                <li><img class="mamografia.jpg" src="../assets/mamografia.jpg" alt="" onclick="openModal()"/></li>
                <li><img class="mamografia.jpg" src="../assets/mamografia.jpg" alt="" onclick="openModal()"/></li>
                <li><img class="mamografia.jpg" src="../assets/mamografia.jpg" alt="" onclick="openModal()"/></li>
                <li><img class="mamografia.jpg" src="../assets/mamografia.jpg" alt="" onclick="openModal()"/></li>
                <li><img class="mamografia.jpg" src="../assets/mamografia.jpg" alt="" onclick="openModal()"/></li>
                <li><img class="mamografia.jpg" src="../assets/mamografia.jpg" alt="" onclick="openModal()"/></li>
                <li><img class="mamografia.jpg" src="../assets/mamografia.jpg" alt="" onclick="openModal()"/></li>
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
        };
    },
    computed: {
    },
    methods: {
        openModal(solicitation) {
            this.selectedSolicitation = solicitation;

            if (solicitation.type == 'Novo Banco de imagens'){
                this.showDatabaseModal = true;
            }
            else{
                this.showUserModal = true;  
            }

        },
        closeModal() {
            this.selectedSolicitation = null;
            this.showUserModal = false;
            this.showDatabaseModal = false;
        },
    }
};
</script>
  
<style scoped>
  
  * {
    color: #73bf8e;
    font-weight: 100;
}
.sidebar {
    font-family: 'Montserrat', sans-serif;
    background-color: #ffffff;
    padding: 5%;
    padding-top: 2.5%;
    margin: 0 auto; /* Adicionado para centralizar horizontalmente */
    height: 70vh;
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
  align-content: space-between;
}

.imagens img {
  max-width: 100%;
  max-height: 100%;
  margin: 2%;
}

.imagens li {
  list-style-type: none;
}

</style>
