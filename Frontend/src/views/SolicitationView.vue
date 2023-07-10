<template>
    <div class="container w-100 ms-3 me-3">
        <div class="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-title">Gerenciar Solicitações</h2>
                <div id="filter">
                    <div class="filter-item-container">
                        <i class="fa fa-search mt-2" aria-hidden="true"></i>
                        <InputComp class="filter-item" name="pesquisa" type="pesquisar" placeHolder="Pesquisar"
                            :function="changeValues"></InputComp>
                    </div>
                    <div class="filter-item-container">
                        <i class="fa fa-filter mt-2" aria-hidden="true"></i>
                        <InputComp class="filter-item" name="filtro" type="filtro" placeHolder="Filtrar por tipo"
                            :function="changeValues"></InputComp>
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
                            <span class="table-header">Status</span>
                        </th>
                        <th scope="col">
                            <span class="table-header">Tipo de solicitação</span>
                        </th>
                        <th scope="col">
                            <span class="table-header">Ações</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="solicitation in paginatedSolicitations" :key="solicitation.id">
                        <td scope="row">
                            <span class="table-item">{{ solicitation.data.name }}</span>
                        </td>
                        <td scope="row">
                            <span class="table-item">{{ solicitation.status }}</span>
                        </td>
                        <td scope="row">
                            <span class="table-item">{{ solicitation.type }}</span>
                        </td>
                        <td scope="row" class="actions">
                            <button @click="openModal(solicitation)" class="btn">
                                <i class="fas fa-eye table-item"></i>
                            </button>
                            <button v-if="solicitation.status == 'Pendente'" @click="openAcceptModal(solicitation)"
                                class="btn">
                                <i class="fa fa-check table-item" aria-hidden="true"></i>
                            </button>
                            <button v-if="solicitation.status == 'Pendente'" @click="openRejectModal(solicitation)"
                                class="btn">
                                <i class="fa fa-times table-item-red"></i>
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
        <ShowDatabaseSolicitationModal v-if="showDatabaseModal" :solicitation="selectedSolicitation"
            @close-modal="closeModal" />
        <ShowUserSolicitationModal v-if="showUserModal" :solicitation="selectedSolicitation" @close-modal="closeModal" />
        <AcceptSolicitationModalComp v-if="showAcceptModal" :solicitation="selectedSolicitation" @close-modal="closeModal"
            @save-changes="saveChanges" />
        <RejectSolicitationModalComp v-if="showRejectModal" :solicitation="selectedSolicitation" @close-modal="closeModal"
            @save-changes="saveChanges" />
    </div>
</template>
  
<script>
import ShowUserSolicitationModal from "../components/modais/solicitation/ShowUserSolicitationModalComp.vue";
import ShowDatabaseSolicitationModal from "../components/modais/solicitation/ShowDatabaseSolicitationModalComp.vue";
import AcceptSolicitationModalComp from "../components/modais/solicitation/AcceptSolicitationModalComp.vue";
import RejectSolicitationModalComp from "../components/modais/solicitation/RejectSolicitationModalComp.vue";
import InputComp from "../components/InputComp.vue";
import axios from "axios";


export default {
    components: {
        ShowUserSolicitationModal,
        ShowDatabaseSolicitationModal,
        AcceptSolicitationModalComp,
        RejectSolicitationModalComp,
        InputComp,
    },
    created() {
        this.updateSolicitations();
    },
    data() {
        return {
            solicitations: [],
            filteredSolicitations: [],
            filtro: "",
            pesquisa: "",
            showUserModal: false,
            showDatabaseModal: false,
            showRejectModal: false,
            showAcceptModal: false,
            selectedSolicitation: null,
            paginaAtual: 1,
            itensPorPagina: 7,
        };
    },
    computed: {
        paginatedSolicitations() {
            const startIndex = (this.paginaAtual - 1) * this.itensPorPagina;
            const endIndex = this.paginaAtual * this.itensPorPagina;
            return this.filteredSolicitations.slice(startIndex, endIndex);
        },
        existemMaisPaginas() {
            return this.paginaAtual * this.itensPorPagina < this.filteredSolicitations.length;
        }
    },
    methods: {
        changeValues(prop, text) {
            this[ prop ] = text;
        },
        proximaPagina() {
            if (this.paginaAtual * this.itensPorPagina < this.filteredSolicitations.length) {
                this.paginaAtual++;
            }
        },
        paginaAnterior() {
            if (this.paginaAtual > 1) {
                this.paginaAtual--;
            }
        },
        openModal(solicitation) {
            if (solicitation.type === "Novo Usuário") {
                this.showUserModal = true;
            } else {
                this.showDatabaseModal = true;
            }
            this.selectedSolicitation = solicitation;
        },
        openAcceptModal(solicitation) {
            this.showAcceptModal = true;
            this.selectedSolicitation = solicitation;
        },
        openRejectModal(solicitation) {
            this.showRejectModal = true;
            this.selectedSolicitation = solicitation;
        },
        closeModal() {
            this.showUserModal = false;
            this.showDatabaseModal = false;
            this.showAcceptModal = false;
            this.showRejectModal = false;
            this.selectedSolicitation = null;
        },
        updateSolicitations(){
            const token = localStorage.getItem("token");

        if (token != undefined) {
                const req = {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };

                axios
                    .get("http://localhost:8081/api/solicitations", req)
                    .then((response) => {
                        this.solicitations = response.data.map((solicitation) => {
                            if (solicitation.status == "pending") {
                                solicitation.status = "Pendente";
                            } else if (solicitation.status == "accepted")
                                solicitation.status = "Aceita";
                            else solicitation.status = "Rejeitada";

                            if (solicitation.type == "newUser") {
                                solicitation.type = "Novo Usuário";
                            } else {
                                solicitation.type = "Novo Banco de imagens";
                            }

                            return solicitation;
                        });

                        this.solicitations = this.solicitations.sort((a, b) => {
                            if (a.status === "Pendente" && b.status !== "Pendente") {
                                return -1; // Solicitação pendente vem antes
                            } else if (a.status !== "Pendente" && b.status === "Pendente") {
                                return 1; // Solicitação pendente vem depois
                            } else {
                                return 0; // Mantém a ordem atual
                            }
                        });

                        this.filteredSolicitations = this.solicitations;
                    });
            }
        },
        saveChanges() {
            this.updateSolicitations();
            this.closeModal();
        },

    },
    watch: {
        filtro: function (value) {
            value = value.toLowerCase();

            if (value == "" || value == " ") {
                this.filteredSolicitations = this.solicitations;
            } else {
                this.filteredSolicitations = this.solicitations.filter(item => {
                    return item.type.toLowerCase().includes(value);
                });
            }

            if (this.pesquisa != "" && this.pesquisa != " ") {
                this.filteredSolicitations = this.filteredSolicitations.filter(item => {
                    return item.data.name.toLowerCase().includes(this.pesquisa.toLowerCase());
                });
            }
        },
        pesquisa: function (value) {
            value = value.toLowerCase();

            if (value == "" || value == " ") {
                this.filteredSolicitations = this.solicitations;
            } else {
                this.filteredSolicitations = this.solicitations.filter(item => {
                    return item.data.name.toLowerCase().includes(value);
                });
            }

            if (this.filtro != "" && this.filtro != " ") {
                this.filteredSolicitations = this.filteredSolicitations.filter(item => {
                    return item.type.toLowerCase().includes(this.filtro.toLowerCase());
                });
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

td button {
    border: 2px solid black;
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

.table-item-red {
  color: #dd2215;
}

.table-item-red:hover {
  color: #81150e;
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
}
</style>
