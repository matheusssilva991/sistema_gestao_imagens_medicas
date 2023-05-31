<template>
  <div class="layout-container">
    <div class="sidebar">
      <!-- Conteúdo da sidebar -->
      <div class="list-group">
        <router-link
          to="/informacoes"
          class="list-group-item"
          :class="{ 'active-link': selectedTopic === 'informacoes' }"
          @click="selectTopic('informacoes')"
        >
          <i class="fas fa-info-circle"></i>
          <span class="topic-name">Banco de Imagens</span>
        </router-link>
        <router-link
          to="/imagens"
          class="list-group-item"
          :class="{ 'active-link': selectedTopic === 'imagens' }"
          @click="selectTopic('imagens')"
        >
          <i class="fas fa-images"></i>
          <span class="topic-name">Imagens</span>
        </router-link>
        <router-link
          to="/usuarios"
          class="list-group-item"
          :class="{ 'active-link': selectedTopic === 'usuarios' }"
          @click="selectTopic('usuarios')"
        >
          <i class="fas fa-users"></i>
          <span class="topic-name">Usuários</span>
        </router-link>
        <router-link
          to="/tipo-imagens"
          class="list-group-item"
          :class="{ 'active-link': selectedTopic === 'tipo-imagens' }"
          @click="selectTopic('tipo-imagens')"
        >
          <i class="fas fa-image"></i>
          <span class="topic-name">Tipo de Imagens</span>
        </router-link>
        <router-link
          to="/solicitacoes"
          class="list-group-item"
          :class="{ 'active-link': selectedTopic === 'solicitacoes' }"
          @click="selectTopic('solicitacoes')"
        >
          <i class="fas fa-envelope"></i>
          <span class="topic-name">Solicitações</span>
        </router-link>
      </div>
    </div>
    <div class="main-content">
  <h1>TESTE</h1>      
  <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutComponent",
  data() {
    return {
      selectedTopic: "", // Variável para controlar o tópico selecionado
    };
  },
  methods: {
    selectTopic(topic) {
      this.selectedTopic = topic;
    },
  },
};
</script>

<style scoped>
.layout-container {
  display: flex;
}

.sidebar {
  font-family: 'Montserrat', sans-serif;
  background-color: #ffffff;
  padding: 20px;
  height: 200px; /* Ajuste a altura conforme necessário */
  width: 280px;
  border-radius: 25px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.613);
}

.main-content {
  flex: 1;
  padding: 20px;
}

.list-group-item {
  list-style-type: none;
  padding: 4px;
  margin-bottom: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: left;
  font-weight: bold;
  transition: background-color 0.9s ease;
}

.list-group-item i {
  margin-right: 10px;
}

.list-group-item:hover,
.active-link {
  background-color: #e8e7e7;
  border-radius: 5px;
  color: #44bba4;
  text-decoration: none;
}

.topic-name {
  margin-left: 5px;
  font-weight: 700;
}
</style>
