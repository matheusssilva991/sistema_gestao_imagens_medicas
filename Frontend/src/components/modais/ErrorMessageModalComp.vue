<template>
	<div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showModal }">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header bg-f2f2f2">
					<h2 class="modal-title title-color">Atenção!</h2>
					<button type="button" class="close btn btn-light" @click="closeModal">
						<span class="h2" aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<p>{{ this.message }}</p>
				</div>
				<div class="modal-footer bg-f2f2f2">
					<button type="button" class="btn btn-success m-auto" @click="closeModal">OK</button>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script>
	export default {
		props: {
			message: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				showModal: true,
			};
		},
		methods: {
			closeModal() {
				this.showModal = false;
				this.$emit('close-modal');
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
	height: 4.0em;
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

  
.title-color {
    color: #73BF8E;
}
  
.modal-footer {
    text-align: center;
	height: 4.0em;
}

.bg-f2f2f2 {
	background-color: #f2f2f2;
}

  </style>
  