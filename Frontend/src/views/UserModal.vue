<template>
    <div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showModal }">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Alterar Perfil</h5>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="user-profile">
            <h3 class="profile-name">{{ user.name }}</h3>
            <p class="profile-function">Função do Usuário</p>
          </div>
          <div class="select-profile">
            <h3 class="select-profile-title">Selecionar Perfil</h3>
            <div class="profile-options">
              <div class="profile-option">
                <input type="radio" id="pesquisador" name="profile" value="pesquisador" v-model="selectedProfile">
                <label for="pesquisador">Pesquisador</label>
              </div>
              <div class="profile-option">
                <input type="radio" id="administrador" name="profile" value="administrador" v-model="selectedProfile">
                <label for="administrador">Administrador</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="saveChanges">Salvar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        showModal: true,
        selectedProfile: '', // Nova propriedade para armazenar o perfil selecionado
      };
    },
    methods: {
      closeModal() {
        this.showModal = false;
        this.$emit('close-modal');
      },
      saveChanges() {
        this.$emit('save-changes', this.selectedProfile);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos do Modal */
  
  .modal {
    font-family: 'Montserrat', sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-content {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-title {
    margin-top: 0;
    font-size: 20px;
  }
  
  .modal-body {
    padding-top: 20px;
  }
  
  .user-profile {
    margin-bottom: 20px;
  }
  
  .profile-name {
    color: #44bba4;
  }
  
  .profile-function {
    margin-bottom: 0;
  }
  
  .select-profile-title {
    margin-top: 0;
    font-size: 16px;
  }
  
  .profile-options {
    margin-top: 10px;
  }
  
  .profile-option {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .profile-option input {
    margin-right: 5px;
  }
  
  .modal-footer {
    margin-top: 20px;
    text-align: right;
  }
  </style>
  