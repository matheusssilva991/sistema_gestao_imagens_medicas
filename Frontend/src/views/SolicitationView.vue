<template>
    <div class="container">
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

            <div class="table-responsive">
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
                                <button @click="openModal(solicitation)">
                                    <i class="fas fa-eye table-item"></i>
                                </button>
                                <button v-if="solicitation.status == 'Pendente'" @click="openAcceptModal(solicitation)">
                                    <i class="fa fa-check table-item" aria-hidden="true"></i>
                                </button>
                                <button v-if="solicitation.status == 'Pendente'" @click="openRejectModal(solicitation)">
                                    <i class="fa fa-times table-item-red"></i>
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
            itensPorPagina: 4,
        };
    },
    computed: {
        paginatedSolicitations() {
            const startIndex = (this.paginaAtual - 1) * this.itensPorPagina;
            const endIndex = this.paginaAtual * this.itensPorPagina;
            return this.filteredSolicitations.slice(startIndex, endIndex);
        },
        existemMaisPaginas() {
            return (
                this.paginaAtual * this.itensPorPagina <
                this.filteredSolicitations.length
            );
        },
    },

    methods: {
        changeValues(name, value) {
            if (name === "pesquisa") {
                this.pesquisa = value;
            } else if (name === "filtro") {
                this.filtro = value;
            }
            this.filtrarSolicitacoes();
        },
        filtrarSolicitacoes() {
            let filtradas = this.solicitations;
            if (this.pesquisa !== "") {
                filtradas = filtradas.filter((solicitation) =>
                    solicitation.data.name
                        .toLowerCase()
                        .includes(this.pesquisa.toLowerCase())
                );
            }
            if (this.filtro !== "") {
                filtradas = filtradas.filter((solicitation) =>
                    solicitation.type.toLowerCase().includes(this.filtro.toLowerCase())
                );
            }
            this.filteredSolicitations = filtradas;
            this.paginaAtual = 1;
        },
        proximaPagina() {
            if (
                this.paginaAtual * this.itensPorPagina <
                this.filteredSolicitations.length
            ) {
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
        saveChanges() {
            // Lógica para salvar as alterações
            const token = localStorage.getItem("token");
            if (token != undefined) {
                const req = {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };
                // Faça a chamada HTTP para salvar as alterações
                axios
                    .put(
                        "http://localhost:8081/api/solicitations",
                        this.selectedSolicitation,
                        req
                    )
                    .then((response) => {
                        // Sucesso na alteração
                        console.log(response.data);
                    })
                    .catch((error) => {
                        // Erro na alteração
                        console.log(error);
                    });
            }
            this.closeModal();
        },
    },
};
</script>
  
<style scoped>
* {
    color: #73bf8e;
    font-weight: 100;
}

.pagination[data-v-77f6eb3f] {
    display: flex;
    justify-content: center;
    margin-top: 2%;
    align-self: flex-end;
    margin-left: 55%;
}

.pagination .page-link[data-v-77f6eb3f] {
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 10px;
    border: none;
    background-color: #73bf8e;
    color: white;
    cursor: pointer;
    margin-left: 10px;
}

.pagination .page-link[data-v-77f6eb3f]:hover {
    background-color: #5fa17f;
}

.pagination .page-link[data-v-77f6eb3f]:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.filter-item-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.filter-item {
    width: 90%;
    margin-bottom: 10px;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.sidebar {
    font-family: "Montserrat", sans-serif;
    background-color: #ffffff;
    padding: 5%;
    padding-top: 2.5%;
    margin: 0 auto;
    width: 97.5%;
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

.table-responsive {
    overflow-x: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
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

.table-item-red {
    color: #dd2215;
}

.table-item-red:hover {
    color: #81150e;
}

.actions button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 10;
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
        width: 100%;
    }

    .sidebar-title {
        text-align: center;
        font-size: 18px;
    }

    #filter {
        width: 80%;
        margin: 10px auto;
    }

    .imagens {
        justify-content: center;
    }

    .imagens div {
        flex-basis: 45%;
    }

    .pagination {
        margin: 10px auto;
    }

    .pagination-buttons {
        flex-direction: column;
    }

    .pagination-button {
        width: 100%;
        margin-bottom: 5px;
        font-size: 12px;
    }

    .btn-anterior {
        background-color: #dd2215;
    }
}

@media (min-width: 0px) and (max-width: 377px) {
    .pagination[data-v-77f6eb3f] {
        margin-left: 10%;
    }
}

@media (min-width: 378px) and (max-width: 576px) {
    .pagination[data-v-77f6eb3f] {
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

    .imagens {
        flex-wrap: wrap;
    }

    .imagens div {
        flex-basis: 45%;
    }

    .pagination {
        margin-left: auto;
        justify-content: center;
    }

    .pagination[data-v-77f6eb3f] {
        margin-left: 30%;
    }
}

@media (min-width: 736px) and (max-width: 1000px) {
    .imagens div {
        flex-basis: 30%;
    }

    .sidebar {
        height: auto;
    }

    #filter {
        width: 60%;
        margin-top: 10px;
    }

    .pagination-button {
        font-size: 14px;
    }

    .pagination[data-v-77f6eb3f] {
        margin-left: 50%;
    }
}

@media (min-width: 1001px) and (max-width: 1220px) {
    .imagens div {
        flex-basis: 23%;
    }

    .sidebar {
        height: auto;
    }

    .pagination[data-v-77f6eb3f] {
        margin-left: 52%;
    }
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
