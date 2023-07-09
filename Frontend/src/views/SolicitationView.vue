<template>
    <div class="container ms-3 me-3">
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
                    <tr v-for="solicitation in filteredSolicitations" :key="solicitation.id">
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
                                <i class="fas fa-eye table-item" style="margin-right: 15px"></i>
                            </button>
                            <button v-if="solicitation.status == 'Pendente'" @click="openAcceptModal(solicitation)">
                                <i class="fa fa-check table-item" aria-hidden="true" style="margin-right: 15px"></i>
                            </button>

                            <button v-if="solicitation.status == 'Pendente'" @click="openRejectModal(solicitation)">
                                <i class="fa fa-times table-item-red" style="margin-right: 15px"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
import ShowUserSolicitationModal from '../components/modais/solicitation/ShowUserSolicitationModalComp.vue';
import ShowDatabaseSolicitationModal from '../components/modais/solicitation/ShowDatabaseSolicitationModalComp.vue';
import AcceptSolicitationModalComp from '../components/modais/solicitation/AcceptSolicitationModalComp.vue';
import RejectSolicitationModalComp from '../components/modais/solicitation/RejectSolicitationModalComp.vue';
import InputComp from '../components/InputComp.vue';
import axios from 'axios';

export default {
    components: {
        ShowUserSolicitationModal,
        ShowDatabaseSolicitationModal,
        AcceptSolicitationModalComp,
        RejectSolicitationModalComp,
        InputComp
    },
    created() {
        const token = localStorage.getItem('token');

        if (token != undefined) {
            const req = {
                headers: {
                    Authorization: "Bearer " + token
                }
            };

            axios.get('http://localhost:8081/api/solicitations', req).then(response => {
                this.solicitations = response.data.map(solicitation => {
                    if (solicitation.status == 'pending') {
                        solicitation.status = 'Pendente';
                    } else if (solicitation.status == 'accepted')
                        solicitation.status = 'Aceita';
                    else
                        solicitation.status = 'Rejeitada';

                    if (solicitation.type == 'newUser') {
                        solicitation.type = 'Novo Usuário';
                    } else {
                        solicitation.type = 'Novo Banco de imagens';
                    }

                    return solicitation;
                });

                this.solicitations = this.solicitations.sort((a, b) => {
                    if (a.status === 'Pendente' && b.status !== 'Pendente') {
                        return -1; // Solicitação pendente vem antes
                    } else if (a.status !== 'Pendente' && b.status === 'Pendente') {
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
            filtro: '',
            pesquisa: '',
            showUserModal: false,
            showDatabaseModal: false,
            showRejectModal: false,
            showAcceptModal: false,
            selectedSolicitation: null,
        };
    },
    methods: {
        changeValues(prop, text) {
            this[`${prop}`] = text
        },
        openModal(solicitation) {
            this.selectedSolicitation = solicitation;

            if (solicitation.type == 'Novo Banco de imagens') {
                this.showDatabaseModal = true;
            }
            else {
                this.showUserModal = true;
            }

        },
        openAcceptModal(solicitation) {
            this.selectedSolicitation = solicitation;
            this.showAcceptModal = true;
        },
        openRejectModal(solicitation) {
            this.selectedSolicitation = solicitation;
            this.showRejectModal = true;
        },
        closeModal() {
            this.selectedSolicitation = null;
            this.showUserModal = false;
            this.showDatabaseModal = false;
            this.showAcceptModal = false;
            this.showRejectModal = false;
        },
        saveChanges() {
            const token = localStorage.getItem('token');

            if (token != undefined) {
                const req = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };

                axios.get('http://localhost:8081/api/solicitations', req).then(response => {
                    this.solicitations = response.data.map(solicitation => {
                        if (solicitation.status == 'pending') {
                            solicitation.status = 'Pendente';
                        } else if (solicitation.status == 'accepted')
                            solicitation.status = 'Aceita';
                        else
                            solicitation.status = 'Rejeitada';

                        if (solicitation.type == 'newUser') {
                            solicitation.type = 'Novo Usuário';
                        } else {
                            solicitation.type = 'Novo Banco de imagens';
                        }

                        return solicitation;
                    });

                    this.solicitations = this.solicitations.sort((a, b) => {
                        if (a.status === 'Pendente' && b.status !== 'Pendente') {
                            return -1; // Solicitação pendente vem antes
                        } else if (a.status !== 'Pendente' && b.status === 'Pendente') {
                            return 1; // Solicitação pendente vem depois
                        } else {
                            return 0; // Mantém a ordem atual
                        }
                    });

                    this.filteredSolicitations = this.solicitations;
                });
            }

            this.closeModal();
        },
    },
    watch: {
        filtro: function (value) {
            value = value.toLowerCase();

            if (value == "" || value == " "){
                this.filteredSolicitations = this.solicitations;
            } else {
                this.filteredSolicitations = this.solicitations.filter(item => {
                    return item.type.toLowerCase().includes(value)
                })
            }

            if (this.pesquisa != "" && this.pesquisa != " "){
                this.filteredSolicitations = this.filteredSolicitations.filter(item => {
                    return item.data.name.toLowerCase().includes(this.pesquisa.toLowerCase())
                })
            }
        },
        pesquisa: function (value) {
            value = value.toLowerCase();

            if (value == "" || value == " "){
                this.filteredSolicitations = this.solicitations;
            } else {
                this.filteredSolicitations = this.solicitations.filter(item => {
                    return item.data.name.toLowerCase().includes(value)
                })
            }

            if (this.filtro != "" && this.filtro != " "){
                this.filteredSolicitations = this.filteredSolicitations.filter(item => {
                    return item.type.toLowerCase().includes(this.filtro.toLowerCase())
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

.actions button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}
</style>
