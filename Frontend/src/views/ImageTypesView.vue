<template>
    <div class="container ms-3 me-3">
        <div class="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-title">
                    Tipos de imagem
                    <button v-if="user.role" class="add-button" @click="openModalCreateImageTypeModalCompVue()">
                        + Novo
                    </button>
                </h2>
                <div id="filter">
                    <div class="filter-item-container">
                        <i class="fa fa-search mt-2" aria-hidden="true"></i>
                        <InputComp class="filter-item" name="pesquisa" type="pesquisar"
                            placeHolder="Pesquisar tipo de imagem" :function="changeValues"></InputComp>
                    </div>
                </div>
            </div>

            <div class="table-responsive">
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
                        <tr v-for="imageType in paginatedTypes" :key="imageType.id">
                            <td scope="row">
                                <span class="table-item">{{
                                    imageType.name.toUpperCase()
                                }}</span>
                            </td>
                            <td scope="row">
                                <span class="table-item">{{ imageType.description }}</span>
                            </td>
                            <td>
                                <button v-if="user.role" @click="openEditModal(imageType)" class="btn">
                                    <i class="fa fa-edit table-item"></i>
                                </button>
                                <button @click="openViewModal(imageType)" class="btn">
                                    <i class="fa fa-eye table-item"></i>
                                </button>
                                <button v-if="user.role" @click="openDeleteModal(imageType)" class="btn">
                                    <i class="fa fa-trash table-item"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <nav class="pagination justify-content-center">
                <ul class="pagination">
                    <li class="page-item">
                        <button @click="paginaAnterior" :disabled="paginaAtual === 1" class="page-link btn-anterior">
                            Anterior
                        </button>
                    </li>
                    <li class="page-item">
                        <button @click="proximaPagina" :disabled="!existemMaisPaginas" class="page-link btn-proximo">
                            Próxima
                        </button>
                    </li>
                </ul>
            </nav>
        </div>

        <CreateImageTypeModalCompVue v-if="showCreateImageTypeModalCompVue" @close-modal="closeModal" />
        <EditImageTypeModalCompVue v-if="showEditImageTypeModalCompVue" @close-modal="closeModal" />
        <ShowImageTypeModalCompVue v-if="showViewImageTypeModalCompVue" :imageType="selectedImageType"
            @close-modal="closeModal" />
        <DeleteImageTypeModalCompVue v-if="showDeleteImageTypeModalCompVue" @close-modal="closeModal" />
    </div>
</template>
  
<script>
import InputComp from "../components/InputComp.vue";
import CreateImageTypeModalCompVue from "../components/modais/imageType/CreateImageTypeModalComp.vue";
import EditImageTypeModalCompVue from "../components/modais/imageType/EditImageTypeModalComp.vue";
import ShowImageTypeModalCompVue from "../components/modais/imageType/ShowImageTypeModalComp.vue";
import DeleteImageTypeModalCompVue from "../components/modais/imageType/DeleteImageTypeModalComp.vue";
import axios from "axios";

export default {
    created() {
        const token = localStorage.getItem("token");

        if (token != undefined) {
            const req = {
                headers: {
                    Authorization: "Bearer " + token,
                },
            };

            axios
                .get(`http://localhost:8081/authenticate`, req)
                .then((response) => {
                    this.user = response.data;
                    if (this.user[ "role" ] == 0) this.user[ "role" ] = false;
                    else this.user[ "role" ] = true;
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .get("http://localhost:8081/api/images-types", req)
                .then((response) => {
                    this.imageTypes = response.data;
                    this.filteredTypes = this.imageTypes;
                });
        }
    },
    data() {
        return {
            selectedImageType: "",
            user: {},
            imageTypes: [],
            filteredTypes: [],
            pesquisa: "",
            showCreateImageTypeModalCompVue: false,
            showEditImageTypeModalCompVue: false,
            showViewImageTypeModalCompVue: false,
            showDeleteImageTypeModalCompVue: false,
            paginaAtual: 1,
            itensPorPagina: 4,
        };
    },
    computed: {
        paginatedTypes() {
            const startIndex = (this.paginaAtual - 1) * this.itensPorPagina;
            const endIndex = this.paginaAtual * this.itensPorPagina;
            return this.filteredTypes.slice(startIndex, endIndex);
        },
        existemMaisPaginas() {
            return this.paginaAtual * this.itensPorPagina < this.filteredTypes.length;
        },
    },
    methods: {
        openDeleteModal() {
            this.showDeleteImageTypeModalCompVue = true;
        },
        openViewModal(imageType) {
            this.showViewImageTypeModalCompVue = true;
            this.selectedImageType = imageType;
        },
        openModalCreateImageTypeModalCompVue() {
            this.showCreateImageTypeModalCompVue = true;
        },
        openEditModal() {
            /* this.name = imageType.name; */
            this.showEditImageTypeModalCompVue = true;
        },
        closeModal() {
            this.showCreateImageTypeModalCompVue = false;
            this.showEditImageTypeModalCompVue = false;
            this.showViewImageTypeModalCompVue = false;
            this.showDeleteImageTypeModalCompVue = false;
        },
        changeValues(prop, text) {
            this[ `${prop}` ] = text;
            this.filtrarTiposImagem();
        },
        filtrarTiposImagem() {
            let filtrados = this.imageTypes;

            if (this.pesquisa !== "") {
                filtrados = filtrados.filter((imageType) =>
                    imageType.name.toLowerCase().includes(this.pesquisa.toLowerCase())
                );
            }

            this.filteredTypes = filtrados;
            this.paginaAtual = 1;
        },
        proximaPagina() {
            if (this.paginaAtual * this.itensPorPagina < this.filteredTypes.length) {
                this.paginaAtual++;
            }
        },
        paginaAnterior() {
            if (this.paginaAtual > 1) {
                this.paginaAtual--;
            }
        },
    },
    components: {
        InputComp,
        CreateImageTypeModalCompVue,
        EditImageTypeModalCompVue,
        ShowImageTypeModalCompVue,
        DeleteImageTypeModalCompVue,
    },
};
</script>
  
<style scoped>
* {
    color: #73bf8e;
    font-weight: 100;
}

.btn {
    padding: 0;
    margin: 5px;
}

.pagination .page-link[data-v-1bd79246] {
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 10px;
    border: none;
    background-color: #73bf8e;
    color: white;
    cursor: pointer;
    margin-left: 10px;
}

.pagination .page-link[data-v-1bd79246]:hover {
    background-color: #5fa17f;
}

.pagination .page-link[data-v-1bd79246]:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.sidebar {
    font-family: "Montserrat", sans-serif;
    background-color: #ffffff;
    padding: 5%;
    padding-top: 2.5%;
    margin: 0 auto;
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

.table-header {
    font-weight: bold;
    font-size: 18px;
}

.table-item {
    color: #80bfad;
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

.table-responsive {
    overflow-x: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 2%;
}

.pagination .page-item {
    display: flex;
    align-items: center;
}

.pagination .page-link {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #73bf8e;
}

.pagination .page-link:focus,
.pagination .page-link:hover {
    text-decoration: underline;
}

@media (max-width: 576px) {
    .sidebar {
        height: auto;
    }

    .sidebar-title {
        text-align: center;
        font-size: 20px;
    }

    #filter {
        width: 80%;
        margin: 10px auto;
    }

    .table-responsive {
        overflow-x: auto;
    }

    .pagination {
        margin: 10px auto;
    }
}

@media (min-width: 0px) and (max-width: 377px) {
    .pagination[data-v-1bd79246] {
        margin-left: 10%;
    }
}

@media (min-width: 378px) and (max-width: 576px) {
    .pagination[data-v-1bd79246] {
        margin-left: 20%;
    }
}

@media (min-width: 577px) and (max-width: 735px) {
    .sidebar {
        height: auto;
    }

    .sidebar-title {
        justify-content: center;
        font-size: 20px;
    }

    .sidebar-header {
        flex-direction: column;
    }

    #filter {
        width: 80%;
        margin-top: 10px;
    }

    .pagination {
        margin-left: auto;
        justify-content: center;
    }

    .pagination[data-v-1bd79246] {
        margin-left: 30%;
    }
}

@media (min-width: 736px) and (max-width: 1000px) {
    .sidebar {
        height: auto;
    }

    #filter {
        width: 60%;
        margin-top: 10px;
    }

    .pagination[data-v-1bd79246] {
        margin-left: 45%;
    }
}

@media (min-width: 1001px) and (max-width: 1220px) {
    .sidebar {
        height: auto;
    }

    .pagination[data-v-1bd79246] {
        margin-left: 52%;
    }
}

@media (min-width: 1221px) {
    .sidebar {
        height: auto;
    }

    .pagination[data-v-1bd79246] {
        margin-left: 52%;
    }
}
</style>
