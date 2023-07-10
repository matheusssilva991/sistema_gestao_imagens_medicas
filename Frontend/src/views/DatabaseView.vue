<template>
    <div class="container w-100 ms-3 me-3">
        <div class="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-title">Bancos
                    <button v-if="user.role" class="add-button" @click="openCreateDatabase()">+ Novo</button>
                    <button v-else class="add-button" @click="openSolicitationDatabase()">+ Solicitar Novo</button>
                </h2>
                <div id="filter">
                    <div class="filter-item-container">
                        <i class="fa fa-search mt-2" aria-hidden="true"></i>
                        <InputComp class="filter-item" name="pesquisa" type="pesquisar" placeHolder="Pesquisar banco"
                            :function="changeValues"></InputComp>
                    </div>
                    <div class="filter-item-container">
                        <i class="fa fa-filter mt-2" aria-hidden="true"></i>
                        <InputComp class="filter-item" name="filtro" type="filtro" placeHolder="Filtrar por tipo de exame"
                            :function="changeValues"></InputComp>
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
                    <tr v-for="database in paginatedDatabases" :key="database.id">
                        <td scope="row">
                            <span class="table-item">{{ database.name.toUpperCase() }}</span>
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
                            <button v-if="user.role" @click="openEditModal(database)" class="btn">
                                <i class="fa fa-edit table-item"></i>
                            </button>
                            <button @click="openViewModal(database)" class="btn">
                                <i class="fa fa-eye table-item"></i>
                            </button>
                            <button v-if="user.role" @click="openDeleteModal(database)" class="btn">
                                <i class="fa fa-trash table-item"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination">
                <div class="pagination-buttons">
                    <button @click="paginaAnterior" :disabled="paginaAtual === 1"
                        class="pagination-button">Anterior</button>
                    <button @click="proximaPagina" :disabled="!existemMaisPaginas"
                        class="pagination-button">Próxima</button>
                </div>
            </div>
        </div>
        <CreateDatabaseModalComp v-if="showCreateDatabaseModal" :database="selectedDatabase" @close-modal="closeModal"
            @save-changes="saveChanges" />
        <CreateSolicitationDatabaseComp v-if="showSolicitationDatabaseModal" :database="selectedDatabase"
            @close-modal="closeModal" @save-changes="saveChanges" />
        <EditDatabaseModalComp v-if="showEditModal" :database="selectedDatabase" @close-modal="closeModal"
            @save-changes="saveChanges" />
        <DeleteDatabaseModalComp v-if="showDeleteModal" :database="selectedDatabase" @close-modal="closeModal"
            @save-changes="saveChanges" />
        <ShowDatabaseModalComp v-if="showViewModal" :database="selectedDatabase" @close-modal="closeModal" />
    </div>
</template>
  
<script>
import InputComp from '../components/InputComp.vue'
import ShowDatabaseModalComp from '@/components/modais/database/ShowDatabaseModalComp.vue';
import EditDatabaseModalComp from '@/components/modais/database/EditDatabaseModalComp.vue';
import DeleteDatabaseModalComp from '@/components/modais/database/DeleteDatabaseModalComp.vue';
import CreateDatabaseModalComp from '../components/modais/database/CreateDatabaseModalComp.vue';
import CreateSolicitationDatabaseComp from '../components/modais/solicitation/CreateDatabaseSolicitationModalComp.vue';
import axios from 'axios';

export default {
    created() {
        const token = localStorage.getItem('token');

        if (token != undefined) {
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

            axios.get('http://localhost:8081/api/databases', req).then(response => {
                this.databases = response.data;

                if (this.databases.length > 0) {
                    this.databases = this.databases.map((database) => {
                        database.imageQuality = database.imageQuality.join(", ")
                        database.imageCount = database.images.length
                        return database
                    });
                }

                this.filteredDatabases = this.databases;
            });
        }

    },
    data() {
        return {
            user: {},
            databases: [],
            filteredDatabases: [],
            filtro: "",
            pesquisa: "",
            showViewModal: false,
            showEditModal: false,
            showDeleteModal: false,
            selectedDatabase: null,
            showCreateDatabaseModal: false,
            showSolicitationDatabaseModal: false,
            paginaAtual: 1,
            itensPorPagina: 7,
        };
    },
    computed: {
        paginatedDatabases() {
            const startIndex = (this.paginaAtual - 1) * this.itensPorPagina;
            const endIndex = this.paginaAtual * this.itensPorPagina;
            return this.filteredDatabases.slice(startIndex, endIndex);
        },
        existemMaisPaginas() {
            return this.paginaAtual * this.itensPorPagina < this.filteredDatabases.length;
        }
    },
    methods: {
        changeValues(prop, text) {
            this[prop] = text;
        },
        proximaPagina() {
            if (this.paginaAtual * this.itensPorPagina < this.filteredDatabases.length) {
                this.paginaAtual++;
            }
        },
        paginaAnterior() {
            if (this.paginaAtual > 1) {
                this.paginaAtual--;
            }
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
        openCreateDatabase() {
            this.selectedDatabase = null;
            this.showCreateDatabaseModal = true;
        },
        openSolicitationDatabase() {
            this.selectedDatabase = null;
            this.showSolicitationDatabaseModal = true;
        },
        closeModal() {
            this.showViewModal = false;
            this.showEditModal = false;
            this.showDeleteModal = false;
            this.showCreateDatabaseModal = false;
            this.showSolicitationDatabaseModal = false;
        },
        saveChanges() {
            const token = localStorage.getItem('token');

            if (token != undefined) {
                const req = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }

                axios.get('http://localhost:8081/api/databases', req).then(response => {
                    this.databases = response.data;

                    if (this.databases.length > 0) {
                        this.databases = this.databases.map((database) => {
                            database.imageQuality = database.imageQuality.join(", ")
                            database.imageCount = database.images.length
                            return database
                        });
                    }

                    this.filteredDatabases = this.databases;
                }).catch(err => {
                    console.log(err)
                });
            }

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
        DeleteDatabaseModalComp,
        CreateDatabaseModalComp,
        CreateSolicitationDatabaseComp

    },
    watch: {
        filtro: function (value) {
            value = value.toLowerCase();

            if (value == "" || value == " ") {
                this.filteredDatabases = this.databases;
            } else {
                this.filteredDatabases = this.databases.filter(item => {
                    return item.examType.toLowerCase().includes(value)
                })
            }

            if (this.pesquisa != "" && this.pesquisa != " ") {
                this.filteredDatabases = this.filteredDatabases.filter(item => {
                    return item.name.toLowerCase().includes(this.pesquisa.toLowerCase())
                })
            }
        },
        pesquisa: function (value) {
            value = value.toLowerCase();

            if (value == "" || value == " ") {
                this.filteredDatabases = this.databases;
            } else {
                this.filteredDatabases = this.databases.filter(item => {
                    return item.name.toLowerCase().includes(value)
                })
            }

            if (this.filtro != "" && this.filtro != " ") {
                this.filteredDatabases = this.filteredDatabases.filter(item => {
                    return item.examType.toLowerCase().includes(this.filtro.toLowerCase())
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
    margin: 0 auto;
    /* Adicionado para centralizar horizontalmente */
    height: fit-content;
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

.table-header {
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

.filter-item-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.add-button {
    background-color: #73bf8e;
    ;
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

.pagination {
    position: center;
    bottom: 6px;
    right: 10px;
    margin-top: 12px;
    margin-left: 80%;
}

.pagination-buttons {
    display: flex;
    gap: 5px;
    margin-top: 10px;

}

.pagination-button {
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 10px;
    border: none;
    background-color: #73bf8e;
    color: white;
    cursor: pointer;
}

.pagination-button:hover {
    background-color: #5fa17f;
}

.pagination-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

@media (max-width: 576px) {
    .container {
        background-color: #f2f2f2;
    }

    .sidebar {
        height: auto;
        overflow-x: auto;
    }

    .sidebar-title {
        font-size: 20px;
        margin-top: 5px;
        justify-content: center;
        text-align: center;
    }

    .sidebar-header {
        flex-direction: column;
    }

    #filter {
        width: 80%;
        margin-top: 10px;
    }

    .pagination {
        margin: auto;
    }

    .pagination {
        margin: 0 auto;
        justify-content: center;
    }

    .pagination-button {
        padding: 3px 6px;
        font-size: 12px;
    }

}

@media (min-width:577px) and (max-width: 1000px) {

    .sidebar-title {
        margin-top: 5px;
        justify-content: center;
    }

    .sidebar-header {
        flex-direction: column;
    }

    .sidebar {
        height: auto;
        width: 100%;
        margin: 0 auto;

    }

    #filter {
        width: 80%;
        margin-top: 10px;
    }

    .pagination {
        margin-left: auto;
        justify-content: center;
    }

}

@media (min-width: 1000px) and (max-width: 1000px) {
    .container {
        background-color: #f2f2f2;
    }

    .sidebar-title {

        margin-top: 5px;
        justify-content: center;
    }

    .sidebar-header {
        flex-direction: column;
    }

    .sidebar {
        height: auto;
    }

    #filter {
        width: 65%;
        margin-top: 10px;
    }

    .pagination {
        margin-left: auto;
        justify-content: center;
    }

}

@media (min-width: 1001px) and (max-width: 1220px) {

    .sidebar {
        height: auto;
    }

    .pagination {
        margin: auto;
        justify-content: right;
    }
}</style>
