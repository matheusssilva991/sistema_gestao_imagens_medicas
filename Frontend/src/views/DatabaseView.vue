<template>
    <div class="container ms-3 me-3">
        <div class="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-title">Bancos
                    <button class="add-button" @click="addBank">+ Novo</button>
                </h2>
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
            
            <table class="table table-hover mt-4">
                <thead>
                    <tr>
                        <th scope="col">                
                            <span class="table-header">Nome do Banco</span>
                        </th>
                        <th scope="col"> 
                            <span class="table-header">Tipo de exame</span>
                        </th>
                        <th scope="col"> 
                            <span class="table-header">Quantidade de Imagens</span>
                        </th>
                        <th scope="col">
                            <span class="table-header">Ações</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bank in banks" :key="bank.id">
                        <td scope="row">
                            <router-link :to="`/bank/${bank.id}`" class="table-item bank-link">{{ bank.name }}</router-link>
                        </td>
                        <td>
                            <span class="table-item">{{ bank.examType }}</span>
                        </td>
                        <td>
                            <span class="table-item">{{ bank.imageCount }} imagens</span>
                        </td>
                        <td>
                            <i class="fa fa-download table-item" style="margin-right: 15px"></i>
                            <i class="fa fa-edit table-item" style="margin-right: 15px"></i>
                            <i class="fa fa-eye table-item" style="margin-right: 15px"></i>
                            <i class="fa fa-trash table-item" style="margin-right: 15px"></i>
                        </td>  
                    </tr>
                </tbody>
                
            </table>
        </div>
    </div>
</template>
  
<script>
import InputComp from '../components/InputComp.vue'

export default {
    data() {
        return {
        banks: [
            { id: 1, name: 'Banco 1', imageCount: 10, examType:'Mamografia' },
            { id: 2, name: 'Banco 2', imageCount: 5, examType:'Mamografia' },
            { id: 3, name: 'Banco 3', imageCount: 8, examType:'Mamografia' }
        ]
        };
    },
    methods: {
        addBank() {
        const newBankId = this.banks.length + 1;
        const newBank = { id: newBankId, name: `Banco ${newBankId}`, imageCount: 0, examType:'Mamografia' };
        this.banks.push(newBank);
        }
    },
    components: {
        InputComp
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
    width: 70%;
}

.table-header{
    font-weight: bold;
    font-size: 18px;
}

.table-item {
    color: #80BFAD;
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

.bank-link {
    text-decoration: none;
    transition: color 0.3s ease;
}

.bank-link:hover {
    color: #459c63;
}

.add-button {
    background-color: #73bf8e;;
    color: #ffffff;
    border: none;
    padding: 0.5% 1%;
    border-radius: 10px;
    font-size: 15px;
    cursor: pointer;
    font-weight: bold;
}

.add-button:hover {
    background-color: #459c63;
    border: none;
}
  
</style>
