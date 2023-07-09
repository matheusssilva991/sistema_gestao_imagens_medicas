<template>
	<div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showModal }">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title">Solicitação de usuário</h2>
					<button type="button" class="close btn btn-white" @click="closeModal">
						<span class="h2" aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="user-profile">
						<h3 class="profile-name"><i class="fa-regular fa-circle-user"></i> {{ solicitation.data.name }}</h3>
					</div>

					<label for="email" class="form-label mt-2">Email</label>
					<input class="form-control" type="email" :value=email aria-label="Disabled email" disabled readonly>

					<label for="institution" class="form-label mt-3">Instituição</label>
					<input class="form-control" type="text" :value=institution aria-label="Disabled institution" disabled
						readonly>

					<div class="location mt-3">
						<div class="location-item">
							<label for="country" class="form-label">País</label>
							<input class="form-control" type="text" :value=country aria-label="Disabled country" disabled
								readonly>
						</div>
						<div class="location-item">
							<label for="city" class="form-label">Cidade</label>
							<input class="form-control" type="text" :value=city aria-label="Disabled city" disabled
								readonly>
						</div>
					</div>

					<label for="lattes" class="form-label mt-3">Lattes</label>
					<input class="form-control mb-3" type="lattes" :value=lattes aria-label="Disabled lattes" disabled
						readonly>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script>
export default {
	created() {
		this.email = this.solicitation.data.email;
		this.institution = this.solicitation.data.institution;
		this.country = this.solicitation.data.country;
		this.city = this.solicitation.data.city;
		this.lattes = this.solicitation.data.lattes;
	},
	props: {
		solicitation: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			email: undefined,
			institution: undefined,
			country: undefined,
			city: undefined,
			lattes: undefined,
			showModal: true,
			selectedProfile: undefined, // Nova propriedade para armazenar o perfil selecionado
		};
	},
	methods: {
		closeModal() {
			this.showModal = false;
			this.$emit('close-modal');
		},
	},
};
</script>
  
<style scoped>
/* Estilos do Modal */

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

.location {
	display: flex;
	justify-content: space-between;
}

.location-item {
	width: 45%;
}
</style>
  
