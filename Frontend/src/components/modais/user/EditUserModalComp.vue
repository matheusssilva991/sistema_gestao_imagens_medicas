<template>
	<div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showModal }">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title">Editar Usuário</h2>
					<button type="button" class="close btn btn-white" @click="closeModal">
						<span class="h2" aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<label for="name" class="form-label mt-3">Nome</label>
					<input class="form-control" type="text" v-model="this.name" aria-label="name">

					<label for="email" class="form-label mt-3">E-mail</label>
					<input class="form-control" type="text" v-model="this.email" aria-label="email">

					<label for="password" class="form-label mt-3">Senha</label>
					<input class="form-control" type="password" v-model="this.password" aria-label="password"
						placeholder="Digite a nova senha ou a atual.">

					<label for="institution" class="form-label mt-3">Instituição</label>
					<input class="form-control" type="text" v-model="this.institution" aria-label="institution">

					<label for="city" class="form-label mt-3">Cidade</label>
					<input class="form-control" type="text" v-model="this.city" aria-label="city">

					<label for="lattes" class="form-label mt-3">Lattes</label>
					<input class="form-control mb-3" type="text" v-model="this.lattes" aria-label="lattes">
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
import axios from 'axios';
import ErrorMessageModalComp from '../ErrorMessageModalComp.vue';

export default {
	created() {
		const token = localStorage.getItem('token');

		if (token != undefined) {
			const req = {
				headers: {
					Authorization: "Bearer " + token
				}
			};

			axios.get('http://localhost:8081/authenticate', req).then(response => {
				axios.get(`http://localhost:8081/api/user/${response.data.id}`, req).then(user => {
					this.name = user.data.name;
					this.email = user.data.email;
					this.institution = user.data.institution;
					this.country = user.data.country;
					this.city = user.data.city;
					this.lattes = user.data.lattes;
					this.id = user.data._id;
				}).catch((err) => {
					const msgError = err.response.data?.err;
					this.erro = msgError;
					this.showErroModal = true;
				});
			}).catch((err) => {
				const msgError = err.response.data?.err;
				this.showErroModal = true;
				this.erro = msgError;
			});

		}
	},
	data() {
		return {
			showModal: true,
			showErroModal: false,
			name: "",
			email: "",
			password: "",
			institution: "",
			country: "",
			city: "",
			lattes: "",
			id: "",
			erro: undefined,
		};
	},
	methods: {
		closeModal() {
			this.showModal = false;
			this.$emit('close-modal');
		},
		closeErroModal() {
			this.showErroModal = false;
		},
		saveChanges() {
			const editUser = {
				name: this.name,
				email: this.email,
				password: this.password,
				institution: this.institution,
				country: this.country,
				city: this.city,
				lattes: this.lattes
			};

			const token = localStorage.getItem('token');

			if (token != undefined) {
				const req = {
					headers: {
						Authorization: "Bearer " + token
					}
				};
				axios.put(`http://localhost:8081/api/user/${this.id}`, editUser, req)
					.then(response => {
						console.log(response);
						this.$emit('save-changes', this.email, this.password);
					}).catch(err => {
						this.showErroModal = true;
						this.erro = err.response.data?.err;
					});
			}
		}
	},
	components: {
		ErrorMessageModalComp
	}
};

</script>
  
<style scoped>
/* Estilos do Modal */
* {
	color: #73bf8e;
}


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
	border-radius: 10px;
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

.modal-footer {
	margin-top: 20px;
	text-align: right;
}
</style>
