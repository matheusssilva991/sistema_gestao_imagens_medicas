<template>
  <div class="container">
    <div class="sidebar">
      <h2 class="title">Bancos
        <button class="add-button" @click="addBank">+</button>
      </h2>
      <ul>
        <li>
          <div class="bank-header">
            <span class="bank-header-name">Nome do Banco</span>
            <span class="bank-header-image-count">Quantidade de Imagens</span>
            <span class="bank-header-actions">Ações</span>
          </div>
        </li>
        <li v-for="bank in banks" :key="bank.id">
          <div class="bank-item">
            <router-link :to="`/bank/${bank.id}`" class="bank-link">
              <span class="bank-name">{{ bank.name }}</span>
              <span class="bank-image-count">{{ bank.imageCount }} imagens</span>
            </router-link>
            <div class="bank-actions">
              <button class="action-button" @click="downloadBank(bank.id)">
                <i class="fa fa-download"></i>
              </button>
              <button class="action-button" @click="editBank(bank.id)">
                <i class="fa fa-edit"></i>
              </button>
              <button class="action-button" @click="viewBank(bank.id)">
                <i class="fa fa-eye"></i>
              </button>
              <button class="action-button" @click="deleteBank(bank.id)">
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banks: [
        { id: 1, name: 'Banco 1', imageCount: 10 },
        { id: 2, name: 'Banco 2', imageCount: 5 },
        { id: 3, name: 'Banco 3', imageCount: 8 }
      ]
    };
  },
  methods: {
    addBank() {
      const newBankId = this.banks.length + 1;
      const newBank = { id: newBankId, name: `Banco ${newBankId}`, imageCount: 0 };
      this.banks.push(newBank);
    },
    downloadBank(bankId) {
      console.log('Download do banco:', bankId);
    },
    editBank(bankId) {
      console.log('Editar banco:', bankId);
    },
    viewBank(bankId) {
      console.log('Visualizar banco:', bankId);
    },
    deleteBank(bankId) {
      console.log('Excluir banco:', bankId);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.sidebar {
  font-family: 'Montserrat', sans-serif;
  background-color: #ffffff;
  padding: 20px;
  width: 85%;
  border-radius: 25px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.613);
}

.title {
  margin-top: 0;
  font-size: 25px;
  text-align: left;
  color: #73bf8e;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 10px;
}

li {
  margin-bottom: 15px;
}

.bank-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #73bf8e;
  transition: color 0.3s ease;
}

.bank-link:hover {
  color: #73bf8e;
}

.bank-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bank-name {
  margin-right: 10px;
  font-weight: bold;
}

.bank-image-count {
  font-size: 12px;
  color: #73bf8e;
}

.add-button {
  background-color: #73bf8e;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #73bf8e;
}

.bank-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
}

.bank-header-name {
  margin-right: 0px;
  color: #73bf8e;
}

.bank-header-image-count {
  margin-right: 43%;
  color: #73bf8e;
}

.bank-header-actions {
  margin-right: 20px;
  color: #73bf8e;
}

.bank-actions {
  display: flex;
}

.action-button {
  background-color: transparent;
  border: none;
  margin-left: 5px;
  cursor: pointer;
}

.action-button:hover {
  color: #73bf8e;
}
</style>
