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
                    <tr v-for="database in databases" :key="database.id">
                        <td scope="row">
                            <span class="table-item">{{ database.name }}</span>
                        </td>
                        <td>
                            <span class="table-item">{{ database.examType }}</span>
                        </td>
                        <td>
                            <span class="table-item">{{ database.imageCount }} imagens</span>
                        </td>
                        <td>
                            <button @click="openEditModal(database)" class="btn">
                                <i class="fa fa-download table-item"></i>
                            </button>
                            <button @click="openEditModal(database)" class="btn">
                                <i class="fa fa-edit table-item"></i>
                            </button>
                            <button @click="openViewModal(database)" class="btn">
                                <i class="fa fa-eye table-item"></i>
                            </button>
                            <button @click="openDeleteModal(database)" class="btn">
                                <i class="fa fa-trash table-item"></i>
                            </button>
                        </td>  
                    </tr>
                </tbody>
            </table>
        </div>

        <EditDatabaseModalComp v-if="showEditModal" :database="this.selectedDatabase" @close-modal="closeModal" @save-changes="saveChanges" />
        <DeleteDatabaseModalComp v-if="showDeleteModal" :database="this.selectedDatabase" @close-modal="closeModal" @delete-database="deleteDatabase" />
        <ShowDatabaseModalComp v-if="showViewModal" :database="this.selectedDatabase" @close-modal="closeModal"/>
    </div>
</template>
  
<script>
import InputComp from '../components/InputComp.vue'
import ShowDatabaseModalComp from '@/components/modais/ShowDatabaseModalComp.vue';
import EditDatabaseModalComp from '@/components/modais/EditDatabaseModalComp.vue';
import DeleteDatabaseModalComp from '@/components/modais/DeleteDatabaseModalComp.vue';

export default {
    created() {
        this.databases = this.databases.map((database) => {
            database.imageQuality = database.imageQuality.join(", ")
            database.imageCount = database.images.length
            return database
        });
    },
    data() {
        return {
            databases: [
                { id: 1,
                    name: 'Banco 1',
                    images: [1, 2, 3, 4], 
                    examType:'Mamografia',
                    imageQuality: [8, 12, 16],
                    imageType: 'DICOM',
                    description: 'Banco de imagens médica',
                    sourceLink: 'Link de origem'    
                },
                { id: 2,
                    name: 'Banco 2',
                    images: [1, 2, 3, 4, 5, 6, 7, 8], 
                    examType:'Mamografia',
                    imageQuality: [16],
                    imageType: 'DICOM',
                    description: 'Banco de imagens médica',
                    sourceLink: 'Link de origem'        
                },
                { id: 3,
                    name: 'Banco 3',
                    images: [1, 2], 
                    examType:'Mamografia',
                    imageQuality: [8, 12],
                    imageType: 'DICOM',
                    description: 'Banco de imagens médica',
                    sourceLink: 'Link de origem'        
                }
            ],
            showViewModal: false,
            showEditModal: false,
            showDeleteModal: false,
            selectedDatabase: null
        };
    },
    methods: {
        addBank() {
            const newBankId = this.databases.length + 1;
            const newBank = { id: newBankId, name: `Banco ${newBankId}`, imageCount: 0, examType:'Mamografia' };
            this.databases.push(newBank);
        },
        openViewModal(database) {
            this.selectedDatabase = database;
            this.showViewModal = true;
        },
        openEditModal(database) {
            this.selectedDatabase = database;
            this.showEditModal = true;
        },
        openDeleteModal(database) {
            this.selectedDatabase = database;
            this.showDeleteModal = true;
        },
        closeModal() {
            this.selectedDatabase = null;
            this.showViewModal = false;
            this.showEditModal = false;
            this.showDeleteModal = false;
        },
        deleteDatabase(database) {
            // Lógica para excluir usuário
            console.log('Excluir banco:', database);
        },
        saveChanges(newDatabase) {
            this.databases = this.databases.map((database) => {
                if (database.id == newDatabase.id)
                    return newDatabase;
                else
                    return database
            })

            this.databases = this.databases.map((database) => {
                if (typeof database.imageQuality == 'object') {
                    database.imageQuality = database.imageQuality.join(", ")
                }

                database.imageCount = database.images.length
                return database
            });

            this.closeModal();
        },

    },
    components: {
        InputComp,
        ShowDatabaseModalComp,
        EditDatabaseModalComp,
        DeleteDatabaseModalComp
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
