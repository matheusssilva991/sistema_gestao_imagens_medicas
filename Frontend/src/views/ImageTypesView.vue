<template>
    <div class="container ms-3 me-3">
        <div class="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-title">Tipos de imagem
                    <button v-if="this.user.role" class="add-button" @click="openCreateDatabase()">+ Novo</button>
                </h2>
                <div id="filter">
                    <div class="filter-item-container">
                        <i class="fa fa-search mt-2" aria-hidden="true"></i>
                        <InputComp class="filter-item" name="pesquisa" type="pesquisar"
                        placeHolder="Pesquisar tipo de imagem" :function="changeValues"></InputComp>
                    </div>
                </div>
            </div>
            
            <table class="table table-hover mt-4">
                <thead>
                    <tr>
                        <th scope="col">                
                            <span class="table-header">Nome</span>
                        </th>
                        <th scope="col">                
                            <span class="table-header">Descrição</span>
                        </th>
                        <th scope="col">
                            <span class="table-header">Ações</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="imageType in filteredTypes" :key="imageType.id">
                        <td scope="row">
                            <span class="table-item">{{ imageType.name.toUpperCase() }}</span>
                        </td>
                        <td scope="row">
                            <span class="table-item">{{ imageType.description }}</span>
                        </td>
                        <td>
                            <button v-if="this.user.role" @click="openEditModal(imageType)" class="btn">
                                <i class="fa fa-edit table-item"></i>
                            </button>
                            <button @click="openViewModal(imageType)" class="btn">
                                <i class="fa fa-eye table-item"></i>
                            </button>
                            <button v-if="this.user.role" @click="openDeleteModal(imageType)" class="btn">
                                <i class="fa fa-trash table-item"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
import InputComp from '../components/InputComp.vue'
import axios from 'axios';

export default {
    created() {
        const token = localStorage.getItem('token');

        if (token != undefined){
            const req = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }

            axios.get(`http://localhost:8081/authenticate`, req).then(response => {
                    this.user = response.data;
                    if (this.user['role'] == 0)
                        this.user['role'] = false
                    else 
                    this.user['role'] = true
                    
                }).catch((err) => {
                    console.log(err);
            });

            axios.get('http://localhost:8081/api/images-types', req).then(response => {
                this.imageTypes = response.data;
                this.filteredTypes = this.imageTypes;
            });
        }
  
    },
    data() {
        return {
            user: {},
            imageTypes: [],
            filteredTypes: [],
            pesquisa: "",
        };
    },
    methods: {
        changeValues(prop, text) {
            this[`${prop}`] = text
        },
        saveChanges() {
            const token = localStorage.getItem('token');

            if (token != undefined){
                const req = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }

                axios.get('http://localhost:8081/api/images-types', req).then(response => {
                    this.imageTypes = response.data;
                    this.filteredTypes = this.imageTypes;
                });
            }
            
            this.closeModal();
        },

    },
    components: {
        InputComp,

    }, 
    watch: {
        pesquisa: function (value) {
            value = value.toLowerCase();

            if (value == "" || value == " "){
                this.filteredTypes = this.imageTypes;
            } else {
                this.filteredTypes = this.imageTypes.filter(item => {
                    return item.name.toLowerCase().includes(value)
                })
            }
        }
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

.table-item:hover {
    color: #459c63;
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

tbody td button {
    padding: 0px;
    margin-left: 10px;
    border: none;
}

tbody td button:hover {
    border: none;
}
  
</style>
