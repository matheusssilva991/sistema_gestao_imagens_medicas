<template>
    <div class="container ms-3 me-3">
        <div class="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-title">Gerenciar Usuários</h2>
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
                            <span class="table-header">Nome do usuário</span>
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
                    <tr v-for="user in users" :key="user.id">
                        <td scope="row">
                            <span class="table-item">{{ user.name }}</span>
                        </td>
                        <td scope="row">
                            <span class="table-item">{{ user.cargo }}</span>
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
      </div>
      <!-- UserModal component -->
      <UserModal v-if="showModal" :user="selectedUser" @save-changes="saveChanges" @close-modal="closeModal" />
      <DeleteUserModalComp v-if="showDeleteModal" :user="this.selectedUser" @close-modal="closeModal" @delete-user="deleteUser" />
    </div>
</template>
  
<script>
import UserModal from '../components/modais/UserModalComp.vue';
import InputComp from '../components/InputComp.vue';
import DeleteUserModalComp from '@/components/modais/DeleteUserModalComp.vue';

export default {
    components: {
        UserModal,
        InputComp,
        DeleteUserModalComp
    },
    data() {
        return {
            users: [
                { id: 1, name: 'Usuário 1', cargo: 'pesquisador'},
                { id: 2, name: 'Usuário 2', cargo: 'administrador' },
                { id: 3, name: 'Usuário 3', cargo: 'pesquisador' },
            // Adicione mais usuários conforme necessário
            ],
            filter: '',
            showModal: false,
            showDeleteModal: false,
            selectedUser: null,
        };
    },
    computed: {
        filteredUsers() {
            return this.users.filter((user) =>
            user.name.toLowerCase().includes(this.filter.toLowerCase())
            );
        },
    },
    methods: {
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
        deleteUser(user) {
            // Lógica para excluir usuário
            console.log('Excluir usuário:', user);
        },
        saveChanges(newProfile) {
            // Lógica para salvar alterações no perfil do usuário
            console.log('Perfil selecionado:', newProfile);
            this.closeModal();
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

.actions button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

</style>
