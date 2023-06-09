<template>
    <div class="container ms-3 me-3">
        <div class="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-title">Gerenciar Solicitações</h2>
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
                            <span class="table-header">Tipo de solicitação</span>
                        </th>
                        <th scope="col"> 
                            <span class="table-header">Nome</span>
                        </th>
                        <th scope="col">
                            <span class="table-header">Ações</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="solicitation in computedSolicitations" :key="solicitation.id">
                        <td scope="row">
                            <span class="table-item">{{ solicitation.type }}</span>
                        </td>
                        <td scope="row">
                            <span class="table-item">{{ solicitation.data.name}}</span>
                        </td>
                        <td scope="row" class="actions">
                            <button @click="openModal(solicitation)">
                                <i class="fas fa-eye table-item" style="margin-right: 15px"></i>
                            </button>
                            <button>
                                <i class="fa fa-check table-item" aria-hidden="true" style="margin-right: 15px"></i>
                            </button>
                            
                            <button @click="deleteUser(solicitation)">
                                <i class="fa fa-times table-item-red" style="margin-right: 15px"></i>
                            </button>
                        </td>  
                    </tr>
                </tbody>      
            </table>
      </div>

      <DatabaseSolicitationModal v-if="showDatabaseModal" :solicitation="selectedSolicitation" @close-modal="closeModal"/>
      <UserSolicitationModal v-if="showUserModal" :solicitation="selectedSolicitation" @close-modal="closeModal"/> 
    </div>
</template>
  
<script>
import UserSolicitationModal from '../components/modais/UserSolicitationModalComp.vue';
import DatabaseSolicitationModal from '../components/modais/DatabaseSolicitationModalComp.vue';
import InputComp from '../components/InputComp.vue'

export default {
    components: {
        UserSolicitationModal,
        DatabaseSolicitationModal,
        InputComp
    },
    data() {
        return {
            solicitations: [
                { id: 1, type: 'newDatabase', data: { 
                                                    name: "DDSM",
                                                    description: "Banco de dados DDSM",
                                                    examType: 'Mamografia',
                                                    sourceLink: 'Link'
                                                } 
                },
                { id: 2, type: 'newUser', data: { 
                                                    name: "Usuário", 
                                                    email: "usuario@email",
                                                    institution: 'UESC',
                                                    country: 'Brasil',
                                                    city: 'Itabuna',
                                                    lattes: 'link'
                                               } 
                },
                { id: 3, type: 'newDatabase', data: { 
                                                    name: "DDSM",
                                                    description: "Banco de dados DDSM",
                                                    examType: 'Mamografia',
                                                    sourceLink: 'Link'
                                                } 
                },
            // Adicione mais usuários conforme necessário
            ],
            filter: '',
            showUserModal: false,
            showDatabaseModal: false,
            selectedSolicitation: null,
        };
    },
    computed: {
        filteredUsers() {
            return this.solicitations.filter((user) =>
            user.name.toLowerCase().includes(this.filter.toLowerCase())
            );
        },
        computedSolicitations(){
            return this.solicitations.map(solicitation => {

                if (solicitation.type == 'newUser') {
                    solicitation.type = 'Novo Usuário';
                    return solicitation;
                } else {
                    solicitation.type = 'Novo Banco de imagens';
                    return solicitation;
                }
            });
        }
    },
    methods: {
        openModal(solicitation) {
            this.selectedSolicitation = solicitation;

            if (solicitation.type == 'Novo Banco de imagens'){
                this.showDatabaseModal = true;
            }
            else{
                this.showUserModal = true;  
            }

        },
        closeModal() {
            this.selectedSolicitation = null;
            this.showUserModal = false;
            this.showDatabaseModal = false;
        },
        deleteUser(user) {
            // Lógica para excluir usuário
            console.log('Excluir usuário:', user);
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
