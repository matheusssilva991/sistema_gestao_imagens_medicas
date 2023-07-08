<template>
	<div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showModal }">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title">Edição tipo de imagem</h2>
					<button type="button" class="close btn btn-white" @click="closeModal">
						<span class="h2" aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<label for="name" class="form-label mt-3">Nome da imagem:</label>
					<input class="form-control" type="text" v-model="this.name" aria-label="name"
						placeholder="Informe nome da imagem" />

					<label for="description" class="form-label mt-3">Descrição:</label>
					<textarea class="form-control" v-model="this.descripttion" aria-label="description"
						@input="countCaractere" cols="38" rows="3" placeholder="Descrição da imagem"></textarea>
					<span class="span-description">{{ caracteresDigitados }}/500 caracteres</span> <br>

					<label for="requiredData" class="form-label mt-3">Dados da Imagem:</label>
					<input class="form-control" type="text" v-model="this.requiredData"
						aria-label="requiredData" placeholder="Informe os dados" />


					<!-- Falta o modal de confirmação -->
					<label for="optionalData" class="form-label mt-3">Dados opcionais:</label>
					<input class="form-control" type="text" v-model="this.opcionalData"
						aria-label="optionalData" placeholder="Informe os dados opcionais" />

				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-success" @click="saveChanges">Salvar</button>
				</div>

			</div>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		imageType: {
			type: Object,
			required: true,
		}
	},
	created(){
		this.name = this.imageType.name
		this.description = this.imageType.description,
		this.requiredData = this.imageType.requiredData.join(", ")
		this.opcionalData = this.imageType.requiredData.join(", ")
	},
	data() {
		return {
			name: "",
			descripttion: "",
			requiredData: "",
			opcionalData: "",
			caracteresDigitados: 0,
			limitCaracteres: 500,

		};
	},

	methods: {
		closeModal() {
			this.showModal = false;
			this.$emit('close-modal');
		},
		countCaractere() {
			if (this.caracteresDigitados >= this.limiteCaracteres) {
				this.descripttion = this.descripttion.slice(0, this.limiteCaracteres);
			} else {
				this.caracteresDigitados = this.descripttion.length;
			}
		},
	}
};
</script>

<style scoped>
.modal {
	font-family: 'Montserrat', sans-serif;
	margin: 0 auto;
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
	box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
	max-width: 500px;
	width: 100%;
	height: 500px;
	/* Altura fixa para o conteúdo do modal */
	overflow-y: auto;
	/* Habilita a barra de rolagem vertical quando necessário */
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.modal-title {
	margin-top: 0;
	margin-bottom: 3%;
	font-size: 25px;
	text-align: left;
	font-weight: bold;
	width: 70%;
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
	font-size: 18px;
	font-weight: bold;
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
}

/* Meu css Particular */
/* .div-button-modal {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
} */
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
	color: black;
}

/* .div-h2-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
} */
.h2-modal {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	color: #73bf8e;
}

/* .modal {
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
} */

.modal-content {
	background-color: white;
	padding: 20px;
	/* border-radius: 20px; */
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

/* .span-requiredData {
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
} */
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
	/* border-radius: 20px; */
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
	/* border-radius: 20px;
  border: 1px solid #f2f2f2;
  background-color: #f2f2f2;
  width: 300px;
  box-shadow: 2px 2px 8px #aaa8a8;
  color: #aaa8a8; */
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

@media screen and (max-width: 510px) {
	.modal-content {
		width: 300px;
	}
}

@media screen and (max-width: 480px) {

	input,
	select {
		width: 200px;
	}

	.text-description {
		width: 200px;
	}

	p {
		width: 200px;
	}
}
</style>
