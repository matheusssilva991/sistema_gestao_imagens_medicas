<template>
  <div>
    <div class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">Gerenciar Usuários</h2>
        <div class="filter">
          <input type="text" v-model="filter" placeholder="Filtrar usuários" />
        </div>
      </div>

      <ul class="user-list">
        <li v-for="user in filteredUsers" :key="user.id" class="user-item">
          <span class="user-name">{{ user.name }}</span>
          <div class="actions">
            <button @click="openModal(user)">
              <i class="fas fa-eye" style="margin-right: 20px"></i>
            </button>
            <button @click="deleteUser(user)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>
    <!-- UserModal component -->
    <UserModal v-if="showModal" :user="selectedUser" @save-changes="saveChanges" @close-modal="closeModal" />
  </div>
</template>

<script>
import UserModal from './UserModal.vue';

export default {
  components: {
    UserModal
  },
  data() {
    return {
      users: [
        { id: 1, name: 'Usuário 1' },
        { id: 2, name: 'Usuário 2' },
        { id: 3, name: 'Usuário 3' },
        // Adicione mais usuários conforme necessário
      ],
      filter: '',
      showModal: false,
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
    closeModal() {
      this.selectedUser = null;
      this.showModal = false;
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
  },
};
</script>

<style scoped>

.sidebar {
  font-family: 'Montserrat', sans-serif;
  background-color: #ffffff;
  padding: 20px;
  top: 0;
  left: 0;
  margin: 0 auto; /* Adicionado para centralizar horizontalmente */
  float: right;
  height: 500px;
  width: 85%;
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
  font-size: 25px;
  text-align: left;
  color: #73bf8e;
}

.filter {
  text-align: right;
}

.filter input {
  padding: 5px;
  margin-bottom: 10px;
  width: 200px;
  border-radius: 20px ;
}

.user-list {
  list-style-type: none;
  padding: 0;
}

.user-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.user-name {
  margin-right: 10px;
  color: #73bf8e;
}

.actions button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.actions button i {
  color: #dcc2c2;
}

.actions button:hover i {
  color: #e74c3c;
}
</style>
