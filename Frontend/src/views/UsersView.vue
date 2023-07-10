<template>
    <div class="container ms-3 me-3">
        <div class="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-title">Gerenciar Usuários</h2>
                <div id="filter">
                    <div class="filter-item-container">
                        <i class="fa fa-search mt-2" aria-hidden="true"></i>
                        <InputComp class="filter-item" name="pesquisa" type="pesquisar" placeHolder="Pesquisar usuário"
                            :function="changeValues"></InputComp>
                    </div>
                    <div class="filter-item-container">
                        <i class="fa fa-filter mt-2" aria-hidden="true"></i>
                        <InputComp class="filter-item" name="filtro" type="filtro" placeHolder="Filtrar cargo"
                            :function="changeValues"></InputComp>
                    </div>
                </div>
            </div>

            <table class="table table-hover mt-4">
                <thead>
                    <tr>
                        <th scope="col">
                            <span class="table-header">Nome do usuário</span>
                        </th>
                        <th scope="col">
                            <span class="table-header">Instituição</span>
                        </th>
                        <th scope="col">
                            <span class="table-header">Cargo</span>
                        </th>
                        <th scope="col">
                            <span class="table-header">Ações</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in paginatedUsers" :key="user._id">
                        <td scope="row">
                            <span class="table-item">{{ user.name }}</span>
                        </td>
                        <td scope="row">
                            <span class="table-item">{{ user.institution }}</span>
                        </td>
                        <td scope="row">
                            <span class="table-item">{{ user.role }}</span>
                        </td>
                        <td scope="row" class="actions">
                            <button @click="openModal(user)">
                                <i class="fas fa-eye table-item" style="margin-right: 15px"></i>
                            </button>
                            <button @click="openDeleteModal(user)">
                                <i class="fas fa-trash table-item" style="margin-right: 15px"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination">
                <ul class="pagination-buttons">
                    <li class="page-item">
                        <button @click="paginaAnterior" :disabled="paginaAtual === 1" class="pagination-button"> Anterior
                        </button>
                    </li>
                    <li class="page-item">
                        <button @click="proximaPagina" :disabled="!existemMaisPaginas" class="pagination-button"> Próxima
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <PermissionUserModalComp v-if="showModal" :user="selectedUser" @save-changes="saveChanges"
            @close-modal="closeModal" />
        <DeleteUserModalComp v-if="showDeleteModal" :user="this.selectedUser" @close-modal="closeModal"
            @save-changes="saveChanges" />
    </div>
</template>
  
<script>
import PermissionUserModalComp from "../components/modais/user/PermissionUserModalComp.vue";
import InputComp from "../components/InputComp.vue";
import DeleteUserModalComp from "../components/modais/user/DeleteUserModalComp.vue";
import axios from "axios";

export default {
    components: {
        PermissionUserModalComp,
        InputComp,
        DeleteUserModalComp,
    },
    created() {
        const token = localStorage.getItem("token");

        if (token != undefined) {
            const req = {
                headers: {
                    Authorization: "Bearer " + token,
                },
            };

            axios.get("http://localhost:8081/api/users", req).then((response) => {
                this.users = response.data;

                this.users = this.users.map((user) => {
                    if (user.role == 0) {
                        user.role = "Pesquisador";
                        return user;
                    } else {
                        user.role = "Administrador";
                        return user;
                    }
                });

                this.filteredUsers = this.users;
            });
        }
    },
    data() {
        return {
            users: [],
            filteredUsers: [],
            filtro: "",
            pesquisa: "",
            showModal: false,
            showDeleteModal: false,
            selectedUser: null,
            paginaAtual: 1,
            itensPorPagina: 7,
        };
    },
    computed: {
        paginatedUsers() {
            const startIndex = (this.paginaAtual - 1) * this.itensPorPagina;
            const endIndex = this.paginaAtual * this.itensPorPagina;
            return this.filteredUsers.slice(startIndex, endIndex);
        },
        existemMaisPaginas() {
            return (
                this.paginaAtual * this.itensPorPagina < this.filteredUsers.length
            );
        },
    },
    methods: {
        changeValues(prop, text) {
            this[prop] = text;
        },
        proximaPagina() {
            if (this.paginaAtual * this.itensPorPagina < this.filteredUsers.length) {
                this.paginaAtual++;
            }
        },
        paginaAnterior() {
            if (this.paginaAtual > 1) {
                this.paginaAtual--;
            }
        },
        openModal(user) {
            this.selectedUser = user;
            this.showModal = true;
        },
        openDeleteModal(user) {
            this.selectedUser = user;
            this.showDeleteModal = true;
        },
        closeModal() {
            this.selectedUser = null;
            this.showModal = false;
            this.showDeleteModal = false;
        },
        saveChanges() {
            const token = localStorage.getItem('token');

            if (token != undefined) {
                const req = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };

                axios.get('http://localhost:8081/api/users', req).then(response => {
                    this.users = response.data;

                    this.users = this.users.map((user) => {
                        if (user.role == 0) {
                            user.role = "Pesquisador";
                            return user;
                        } else {
                            user.role = "Administrador";
                            return user;
                        }
                    });

                    this.filteredUsers = this.users;
                });

                this.closeModal();
            }
        },
    },
    watch: {
        filtro: function (value) {
            value = value.toLowerCase();

            if (value == "" || value == " ") {
                this.filteredUsers = this.users;
            } else {
                this.filteredUsers = this.users.filter(item => {
                    return item.role.toLowerCase().includes(value);
                });
            }

            if (this.pesquisa != "" && this.pesquisa != " ") {
                this.filteredUsers = this.filteredUsers.filter(item => {
                    return item.name.toLowerCase().includes(this.pesquisa.toLowerCase());
                });
            }
        },
        pesquisa: function (value) {
            value = value.toLowerCase();

            if (value == "" || value == " ") {
                this.filteredUsers = this.users;
            } else {
                this.filteredUsers = this.users.filter(item => {
                    return item.name.toLowerCase().includes(value);
                });
            }

            if (this.filtro != "" && this.filtro != " ") {
                this.filteredUsers = this.filteredUsers.filter(item => {
                    return item.role.toLowerCase().includes(this.filtro.toLowerCase());
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

.sidebar {
    font-family: 'Montserrat medium', sans-serif;
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

.actions button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.pagination {
    position: center;
    bottom: 6px;
    right: 10px;
    margin-top: 12px;
    margin-left: 80%;
}

.pagination-buttons {

    list-style: none;
    display: flex;
    align-items: center;
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
        margin: 0 auto;
        justify-content: center;
    }

    .pagination-button {
        padding: 3px 6px;
        font-size: 12px;
    }

}

@media (min-width:577px) and (max-width: 735px) {

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

@media (min-width: 736px) and (max-width: 1000px) {
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
        margin: auto;
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
