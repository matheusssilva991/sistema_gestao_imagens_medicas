<template>
	<div class="container ms-3 me-3">
		<div class="sidebar">
			<div class="sidebar-header">
				<h2 class="sidebar-title">Visualizar Imagens</h2>
				<div id="filter">
					<div class="filter-item-container">
						<i class="fa fa-filter mt-2" aria-hidden="true"></i>
						<select name="filtro" id="" v-model="selectedDatabase"
							class="form-select form-select-lg mb-3 custom-select">
							<option v-for="databaseName in databasesNames" :key="databaseName" :value="databaseName">{{
								databaseName }} </option>
						</select>
					</div>
				</div>
			</div>
			<div class="imagens mt-4">
				<div v-for="(image, index) in imagensPagina" :key="index">
					<img @click="openModal(image)" :src="image.url" :alt="image.alt">
				</div>
			</div>

			<div class="pagination">
				<div class="pagination-buttons">
					<button @click="paginaAnterior" :disabled="paginaAtual === 1"
						class="pagination-button">Anterior</button>
					<button @click="proximaPagina" :disabled="!existemMaisPaginas || imagensPagina.length === 0"
						class="pagination-button">
						Próxima
					</button>

				</div>
			</div>

		</div>

		<ImageModalComp v-if="showModalImage" :image="this.selectedImage" @close-modal="closeModal" />

	</div>
</template>

<script>
import axios from 'axios';
import ImageModalComp from '../components/modais/image/ImageModalComp.vue';

export default {
	components: {
		ImageModalComp
	},
	mounted() {
		const imagesContext = require.context('@/assets/images', false, /\.(png|jpe?g|gif|svg)$/);

		imagesContext.keys().forEach((key, index) => {
			const image = {
				id: index,
				url: imagesContext(key),
				alt: key.split('/').pop().split('.')[ 0 ]
			};

			this.images.push(image);
		});
	},
	data() {
		return {
			selectedDatabase: null,
			selectedImage: null,
			databases: [],
			imagesInfo: [],
			images: [],
			imagensPorPagina: 8,
			paginaAtual: 1,
			showModalImage: false,
		};

	},
	computed: {
		databasesNames() {
			return this.databases.map((database) => database.name);
		},
		filteredImages() {
			return this.images.filter((image) => {
				if (image.alt.includes(this.selectedDatabase)) {
					return image;
				}
			});
		},
		existemMaisPaginas() {
			return this.paginaAtual < this.totalPaginas;
		},
		totalPaginas() {
			return Math.ceil(this.filteredImages.length / this.imagensPorPagina);
		},
		imagensPagina() {
			const inicio = (this.paginaAtual - 1) * this.imagensPorPagina;
			const fim = inicio + this.imagensPorPagina;
			return this.filteredImages.slice(inicio, fim);
		}
	},
	methods: {
		openModal(image) {
			this.showModalImage = true;
			this.selectedImage = image;
		},
		closeModal() {
			this.showModalImage = false;
			this.selectedImage = null;
		},
		paginaAnterior() {
			if (this.paginaAtual > 1) {
				this.paginaAtual--;
			} else {
				this.paginaAtual = this.totalPaginas;
			}
		},
		proximaPagina() {
			if (this.paginaAtual < this.totalPaginas) {
				this.paginaAtual++;
			} else {
				this.paginaAtual = 1;
			}
		}
	},
	created() {
		const token = localStorage.getItem('token');

		if (token != undefined) {
			const req = {
				headers: {
					Authorization: "Bearer " + token
				}
			};

			axios.get('http://localhost:8081/api/databases', req).then(response => {
				this.databases = response.data;

				if (this.databases.length > 0) {
					this.selectedDatabase = this.databases[ 0 ].name;
					this.imagesInfo = this.databases[ 0 ][ 'images' ];
				}
			});
		}
	}
};

</script>

<style scoped>
* {
	color: #73bf8e;
	font-weight: 100;
}

.container {
	background-color: #f2f2f2;

}

.sidebar {
	font-family: 'Montserrat', sans-serif;
	background-color: #ffffff;
	padding: 5%;
	padding-top: 2.5%;
	margin: 0 auto;
	/* Adicionado para centralizar horizontalmente */
	/* height: 100vh; */
	width: 100%;
	border-radius: 25px;
	box-shadow: 0 4px 7px rgba(0, 0, 0, 0.613);
}

.sidebar-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.sidebar-title {
	margin-top: 0;
	margin-bottom: 3%;
	font-size: 25px;
	text-align: left;
	font-weight: bold;
}

#filter {
	width: 30%;
	display: flex;
	flex-direction: column;
}

.filter-item {
	width: 90%;
	margin-bottom: 10px;
}

.filter-item-container {
	width: 100%;
	display: flex;
	justify-content: space-around;
}

.filter-item-container i {
	margin-right: 5px;
}


.custom-select {
	appearance: none;
	background-color: transparent;
	border: none;
	border-radius: 20px;
	padding: 5px;
	padding-left: 20px;
	font-size: 14px;
	width: 100%;
	color: #858282;
	background-color: #F2F2F2;
	-webkit-box-shadow: 0.5px 0.75px 1.5px 1px rgb(189, 181, 181);
	box-shadow: 0.5px 0.75px 1.5px 1px rgb(189, 181, 181);
}

.custom-select:focus {
	outline: none;
	border-color: #73bf8e;
	box-shadow: 0 0 5px rgba(10, 59, 27, 0.5);
}

.imagens {
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-content: center;
}

.imagens div {
	flex-basis: 23%;
	margin: 2px;
}

.imagens img {
	max-width: 100%;
	max-height: 100%;
	margin: 10px;
	min-width: 80px;

}

.imagens li {
	list-style-type: none;
}

.pagination {
	position: center;
	bottom: 6px;
	right: 10px;
	margin-top: 12px;
	margin-left: 80%;
}

.pagination-buttons {
	display: flex;
	gap: 5px;
	margin-top: 10px;

}

.pagination-button {
	padding: 5px 10px;
	font-size: 14px;
	border-radius: 10px;
	border: none;
	background-color: #73bf8e;
	color: white;
	cursor: pointer;
}

.pagination-button:hover {
	background-color: #5fa17f;
}

.pagination-button:disabled {
	background-color: #ccc;
	cursor: not-allowed;
}

@media (max-width: 576px) {
	.container {
		background-color: #f2f2f2;
	}

	.sidebar {
		height: auto;
	}

	.sidebar-title {
		font-size: 20px;
		margin-top: 5px;
		justify-content: center;
		text-align: center;
	}

	.sidebar-header {
		flex-direction: column;
	}

	#filter {
		width: 80%;
		margin-top: 10px;
	}

	.imagens {
		justify-content: center;
	}

	.imagens img {
		min-width: 80px;

	}

	.imagens li {
		width: 80%;
		margin: 10px;
	}

	.pagination {
		margin: 0 auto;
		justify-content: center;
	}

	.pagination-button {
		padding: 3px 6px;
		font-size: 12px;
	}
}

@media (min-width:577px) and (max-width: 735px) {
	.sidebar-title {

		margin-top: 5px;
		justify-content: center;
	}

	.sidebar-header {
		flex-direction: column;
	}


	.sidebar {
		height: auto;
	}

	.imagens {
		flex-wrap: wrap;
	}


	#filter {
		width: 80%;
		margin-top: 10px;
	}

	.pagination {
		margin-left: auto;
		justify-content: center;
	}
}

@media (min-width: 736px) and (max-width: 1000px) {
	.container {
		background-color: #f2f2f2;
	}

	.imagens img {
		max-width: 100%;
		max-height: 100%;
		margin: 10px;
		min-width: 90px;

	}

	.imagens li {
		width: 40%;
		margin: 10px;
	}

	.sidebar-title {

		margin-top: 5px;
		justify-content: center;
	}

	.sidebar-header {
		flex-direction: column;
	}


	.sidebar {
		height: auto;
	}

	#filter {
		width: 65%;
		margin-top: 10px;
	}

	.pagination {
		margin: auto;
		justify-content: center;
	}

}

@media (min-width: 1001px) and (max-width: 1220px) {
	.imagens li {
		width: 30%;
		margin: 10px;
	}

	.sidebar {
		height: auto;
	}
}

tbody td button {
	padding: 0px;
	margin-left: 10px;
	border: none;
}

tbody td button:hover {
	border: none;
}
</style>
