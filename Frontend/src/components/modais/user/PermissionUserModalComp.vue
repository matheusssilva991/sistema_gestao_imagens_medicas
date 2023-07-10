<template>
	<div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showModal }">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title">Alterar Perfil</h2>
					<button type="button" class="close btn btn-white" @click="closeModal">
						<span class="h2" aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="user-profile">
						<h3 class="profile-name"><i class="fa-regular fa-circle-user"></i> {{ user.name }}</h3>
					</div>

					<div class="select-profile mt-5">
						<h3 class="select-profile-title">Selecionar Perfil</h3>
						<div class="profile-options">
							<div class="profile-option">
								<input class="form-check-input mt-0" type="radio" id="pesquisador" name="pesquisador"
									value="pesquisador" v-model="this.selectedProfile">
								<label for="pesquisador">Pesquisador</label>
							</div>
							<div class="profile-option">
								<input class="form-check-input mt-0" type="radio" id="administrador" name="administrador"
									value="administrador" v-model="this.selectedProfile">
								<label for="administrador">Administrador</label>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-success" @click="saveChanges">Salvar</button>
				</div>
			</div>
		</div>

		<div v-if="this.showErroModal" class="error-msg">
			<ErrorMessageModalComp :message=this.erro @close-modal="closeErroModal()" />
		</div>
	</div>
</template>
  
<script>
import axios from 'axios'
import ErrorMessageModalComp from '../ErrorMessageModalComp.vue';

export default {
	components: {
		ErrorMessageModalComp
	},
	created() {
		this.selectedProfile = this.user.role.toLowerCase();
	},
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			showModal: true,
			selectedProfile: undefined, // Nova propriedade para armazenar o perfil selecionado
			erro: false,
			showErroModal: false,
		};
	},
	methods: {
		closeModal() {
			this.showModal = false;
			this.$emit('close-modal');
		},
		saveChanges() {
			const newRole = { 
				role: this.selectedProfile.toLowerCase() == 'pesquisador' ? 0 : 1
			}

			const token = localStorage.getItem('token');

                if (token != undefined){
                    const req = {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }
                    axios.put(`http://localhost:8081/api/user/${this.user._id}/permissao`, newRole, req)
					.then(response => {
						console.log(response.data);
						this.$emit('save-changes');
					}).catch(err => {
						this.erro = err.response.data?.err;
						this.showErroModal = true;
					}) 
                }
		},
	},
};
</script>
  
<style scoped>
/* Estilos do Modal */

.modal {
	font-family: 'Montserrat medium', sans-serif;
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
	border-radius: 10px;
	box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
	max-width: 500px;
	width: 100%;
	height: 500px; /* Altura fixa para o conteúdo do modal */
    overflow-y: auto; /* Habilita a barra de rolagem vertical quando necessário */
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
	text-align: right;
}
</style>
  