<template>
  <div>
    <div class="div-header">
      <header>Aqui vai o componente header</header>
    </div>

    <div class="div-form">
      <h2 class="text-form">Cadastro de Imagem</h2>
      <form action="" method="post" class="grid-form" @submit="handleSubmit">
        <div class="name flex-form-input">
          <label for="name">Nome da imagem:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Informe nome da imagem"
          />
        </div>

        <div class="description flex-form-input">
          <label for="description">Descrição:</label>
          <textarea
            class="text-description"
            v-model="texto"
            @input="countCaractere"
            name="description"
            id="description"
            cols="38"
            rows="3"
            placeholder="Descrição da imagem"
          >
          </textarea>
          <span class="span-description"
            >{{ caracteresDigitados }}/500 caracteres</span
          >
        </div>

        <div class="requiredData flex-form-input">
          <label for="name">Dados da Imagem:</label>
          <input
            v-model="inputValue"
            @keyup.enter="saveValue(0)"
            type="text"
            name="name"
            id="name"
            placeholder="Informe os dados"
          />
          <p v-if="requiredData.length > 0">
            <span
              :style="{
                backgroundColor:
                  index === hoveredIndex ? backColor : 'rgb(71, 71, 71)',
              }"
              @mouseleave="resetHoveredIndex(index, 0)"
              @mouseover="setHoveredIndex(index, 0)"
              v-for="(value, index) in requiredData"
              :key="index"
              class="span-requiredData"
              @click="openModal(index, 0)"
            >
              {{ value }} <br
            /></span>
          </p>
        </div>

        <div class="optionalData flex-form-input">
          <label for="name">Dados opcionais:</label>
          <input
            v-model="inputValueOpcional"
            @keyup.enter="saveValue(1)"
            type="text"
            name="name"
            id="name"
            placeholder="Informe dados opcionais"
          />
          <p v-if="optionalData.length > 0">
            <span
              :style="{
                backgroundColor:
                  index === hoveredIndexOpcional
                    ? backColorOpcional
                    : 'rgb(71, 71, 71)',
              }"
              @mouseleave="resetHoveredIndex(index, 1)"
              @mouseover="setHoveredIndex(index, 1)"
              v-for="(value, index) in optionalData"
              :key="index"
              class="span-requiredData"
              @click="openModal(index, 1)"
            >
              {{ value }} <br
            /></span>
          </p>
        </div>

        <div class="modal" v-if="showModal">
          <div class="modal-content">
            <div class="div-h2-modal">
              <h2 class="h2-modal">Tem certeza que deseja excluir?</h2>
            </div>
            <span class="span-modal" v-if="modalRequest == 0">{{
              oldVelue
            }}</span>
            <span class="span-modal" v-else>{{ oldValueOpcional }}</span>

            <div class="div-button-modal">
              <button @click="closeModal(0)" class="button-close-modal">
                FECHAR
              </button>
              <button @click="closeModal(1)" class="button-delete-modal">
                EXCLUIR
              </button>
            </div>
          </div>
        </div>

        <!--  <button @click="closeModal(0)" class="button-fechar-modal">FECHAR</button> -->
        <div class="button-save button-flex">
          <button type="submit" class="button">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CadastroImagem",
  data() {
    return {
      texto: "",
      limiteCaracteres: 500,
      caracteresDigitados: 0,
      inputValue: "",
      inputValueOpcional: "",
      backColor: "",
      backColorOpcional: "",
      oldVelue: "",
      oldValueOpcional: "",
      oldIndexOpcional: "",
      oldIndex: "",
      modalRequest: "",
      hoveredIndex: -1,
      hoveredIndexOpcional: -1,
      showModal: false,
      requiredData: [],
      optionalData: [],
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
    },
    saveValue(op_input) {
      if (
        (this.inputValue.length > 0 && op_input == 0) ||
        (this.inputValueOpcional.length > 0 && op_input == 1)
      ) {
        if (op_input == 0) {
          this.requiredData.push(this.inputValue);
          this.inputValue = ""; // Limpar o valor do input após salvar
        } else {
          this.optionalData.push(this.inputValueOpcional);
          console.log("Inserir" + this.optionalData);
          this.inputValueOpcional = ""; // Limpar o valor do input após salvar
        }
      }
    },
    countCaractere() {
      if (this.caracteresDigitados >= this.limiteCaracteres) {
        this.texto = this.texto.slice(0, this.limiteCaracteres);
      } else {
        this.caracteresDigitados = this.texto.length;
      }
    },
    setHoveredIndex(index, op_input) {
      if (op_input == 0) {
        this.hoveredIndex = index;
        this.oldVelue = this.requiredData[index];
        this.backColor = "red"; // Define a cor desejada ao passar o mouse
      /*   console.log(index, this.requiredData[index]); */
      } else {
        this.hoveredIndexOpcional = index;
        this.oldValueOpcional = this.optionalData[index];
        this.backColorOpcional = "red"; // Define a cor desejada ao passar o mouse
        /* console.log(index, this.optionalData[index]); */
      }
    },
    resetHoveredIndex(index, op_input) {
      if (op_input == 0) {
        this.hoveredIndex = -1;
        this.requiredData[index] = this.oldVelue;
        this.backColor = "rgb(71, 71, 71)"; // Reseta a cor quando o mouse sai do elemento
      } else {
        this.hoveredIndexOpcional = -1;
        this.optionalData[index] = this.oldValueOpcional;
        this.backColorOpcional = "rgb(71, 71, 71)"; // Reseta a cor quando o mouse sai do elemento
      }
    },
    openModal(index, op_input) {
      /* this.oldVelue = this.requiredData[index] */
      if (op_input == 0) {
        this.modalRequest = 0;
        this.oldIndex = index;
      } else {
        this.modalRequest = 1;
        this.oldIndexOpcional = index;
      }

      this.showModal = true;
    },
    closeModal(op) {
      /* this.oldVelue = this.requiredData[index] */
      if (op == 0) {
        this.showModal = false;
      } else {
        if (this.modalRequest == 0) {
          this.requiredData.splice(this.oldIndex, 1);
        } else {
          this.optionalData.splice(this.oldIndexOpcional, 1);
        }

        this.showModal = false;
      }
    },
  },
};
</script>

<style scoped>

.div-button-modal {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-close-modal,
.button-delete-modal {
  background-color: red;
  color: white;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 1em;
  cursor: pointer;
}

.button-delete-modal {
  background-color: #1d4e2e;
}

.span-modal {
  font-weight: bold;
  text-align: center;
  font-size: 1.2em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
}
.div-h2-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.h2-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: #73bf8e;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  /*  width: 200px; */
}

p {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
}
.span-requiredData {
  /* border: 1px solid red; */
  display: block;
  padding: 5px 10px;
  background-color: rgb(71, 71, 71);
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 20px;
  margin-bottom: 6px;
  margin-right: 2px;
  text-align: center;
  transition: 0.1s;
}
header {
  padding: 10px;
  text-align: center;
  height: 80px;
}

/*   .div-header{
        padding: 10px;
        text-align: center;
        height: 20px;
    } */

.div-form {
  margin: 10px auto auto auto;
  padding: 20px;
  width: 70%;
  /*  border: 3px solid red; */
  background: white;
  border-radius: 20px;
  box-shadow: 5px 5px 8px rgb(95, 91, 91);
  /*  border: 1px solid red; */
}

.flex-form-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.text-form {
  color: #73bf8e;
  padding: 10px;
  font-weight: bolder;
  font-size: 1.8em;
}

label {
  color: #73bf8e;
  padding: 5px 5px 1px 5px;
  font-weight: 600;
  margin-bottom: 4px;
}

form {
  /*   border: 1px solid blue; */
  padding: 10px;
}

.grid-form {
  display: grid;
  justify-content: space-around;
  gap: 10px;
  grid-auto-columns: auto auto;
  grid-auto-rows: auto auto auto auto auto;
  grid-template-areas:
    "name requiredData"
    "description optionalData"
    "button-save button-save";
  /*   border: 1px solid blue; */
}

.name {
  grid-area: name;
}

.description {
  grid-area: description;
}

.requiredData {
  grid-area: requiredData;
}

.optionalData {
  grid-area: optionalData;
}

.button-save {
  grid-area: button-save;
}

.button-flex {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.button {
  padding: 5px 15px 5px 15px;
  border-radius: 20px;
  color: white;
  font-size: 1.1em;
  background-color: #73bf8e;
  border: 1px solid #73bf8e;
  font-weight: 800;
  transition: 0.5s;
  cursor: pointer;
  /* margin-top: 80px; */
}

.button:hover {
  background-color: #1d4e2e;
}

input,
select,
textarea,
p {
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #f2f2f2;
  background-color: #f2f2f2;
  width: 300px;
  box-shadow: 2px 2px 8px #aaa8a8;
  color: #aaa8a8;
}

input::placeholder {
  color: #aaa8a8;
  font-weight: 500;
}

textarea::placeholder {
  color: #aaa8a8;
  font-weight: 500;
}

.span-description {
  margin-top: 5px;
  margin-left: 10px;
  color: #aaa8a8;
}

input:focus {
  outline: none;
}

/* PARTE DE RESPONSIVIDADE */
@media screen and (max-width: 920px) {
  .grid-form {
    gap: 10px;
    grid-auto-columns: auto;
    grid-auto-rows: auto auto auto auto auto auto auto auto auto;
    grid-template-areas:
      "name"
      "description"
      "requiredData"
      "optionalData"
      "button-save";
  }

  .button-flex {
    align-items: center;
  }

  .text-form {
    text-align: center;
  }
}

@media screen and (max-width: 510px){
  .modal-content{
      width: 300px;
  }
}

@media screen and (max-width: 480px) {
  input,
  select {
    width: 200px;
  }

  .text-description{
     width: 200px;
  }

  p{
     width: 200px;
  }
}


</style>
