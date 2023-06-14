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

					<label for="examType" class="form-label mt-3">E-mail</label>
					<input class="form-control" type="text" v-model="this.email" aria-label="email">
					
                    <label for="imageType" class="form-label mt-3">Senha</label>
					<input class="form-control" type="password" v-model="this.password" aria-label="password">

                    <label for="imageQuality" class="form-label mt-3">Instituição</label>
					<input class="form-control" type="text" v-model="this.institution" aria-label="institution">

                    <label for="imageQuality" class="form-label mt-3">Cidade</label>
					<input class="form-control" type="text" v-model="this.city" aria-label="city">

					<label for="sourceLink" class="form-label mt-3">Lattes</label>
					<input class="form-control mb-3" type="text" v-model="this.lattes" aria-label="lattes">
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-success" @click="saveChanges">Salvar</button>
				</div> 
				
				<!-- <div class="modal-footer">
					<button type="button" class="btn btn-success" @click="callMethods">Salvar</button>
				</div>  -->
			</div>
		</div>
	</div>
</template>
  
<script>
	export default {
		created() {
           /*  this.description = this.database.description;
			this.imageQuality = this.database.imageQuality;
			this.examType = this.database.examType;
			this.sourceLink = this.database.sourceLink;
			this.imageType = this.database.imageType;
			this.name = this.database.name;
			this.id = this.database.id;
			this.images = this.database.images; */
        },
        props: {
			database: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {
				showModal: true,
                email: "",
				password: "",
				institution: "",
				city: "",
				lattes: "",
				name: "",
				id: ""
			};
		},
		methods: {
			closeModal() {
				this.showModal = false;
				this.$emit('close-modal');
			},
			saveChanges() {
				let tmpImageQuality = this.imageQuality.split(",")

				const newDatabase = { 
					id: this.id,
					name: this.name,
					examType: this.examType,
					imageType: this.imageType,
					imageQuality: tmpImageQuality,
					description: this.description,
					sourceLink: this.imageType,
					images: this.images
				}

				this.$emit('save-changes', newDatabase);
			}
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
