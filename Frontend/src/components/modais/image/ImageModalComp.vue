
<template>
	<div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showModal }">
    <div class="modal-dialog">
		 <div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title">Visualização</h2>
				<button type="button" class="close btn btn-white" @click="closeModal">
					<span class="h2" aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="modal-image-container">
					<img class="mamografia.jpg" :src="this.image.url" :alt="image.alt">
				</div>
				<div class="modal-info">
          <label > ID Paciente </label>
					<input type="text" id="image-info" v-model="imageInfo.patient_id" readonly>
          <label > Lado da Mama </label>
          <input type="text" id="image-info" v-model="imageInfo.leftOrRightBreast" readonly>
          <label > Orientação </label>
          <input type="text" id="image-info" v-model="imageInfo.orientation" readonly>
          <label > Qualidade da Imagem (Bits) </label>
          <input type="text" id="image-info" v-model="imageInfo.imageQuality" readonly>
          <label > Patologia </label>
          <input type="text" id="image-info" v-model="imageInfo.pathology" readonly>

          <div v-if="imageInfo.biRads">
          <label > BI-RADS </label>
          <input type="text" id="image-info" v-model="imageInfo.biRads" readonly>
          </div>
				</div>

				
			</div>
		</div>
  </div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	props: {
		image: {
			type: Object,
			required: true
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

			
			let images = []

			axios.get('http://localhost:8081/api/databases', req).then(response => {
				for (let database of response.data)
					images = images.concat(database.images)

				this.imageInfo = images.filter(image => {
					if (this.image.alt == image[ 'resizedImagePath' ].split('/').pop().split('.')[ 0 ]){
						return image
					}
				})

				this.imageInfo = this.imageInfo[0]
        this.imageInfo['pathology'] = this.imageInfo.classification.pathology
        this.imageInfo['biRads'] = this.imageInfo.classification.biRads
			});
		}
	},
	data() {
		return {
			imageInfo: [],
			showModal: true
		};
	},
	methods: {
		closeModal() {
			this.$emit('close-modal');
		},
	},

};
</script>

<style scoped>
.modal {
  font-family: 'Montserrat medium', sans-serif;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;


}
.modal-dialog {
	display: flex;
  width: auto;
  height: auto;
	justify-content: center;
	align-items: center;
}

.modal-content {
	background-color: #ffffff;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 4px 7px rgba(0, 0, 0, 0.613);
	text-align: center;
	width: 100%;
	max-width: 800px;
	max-height: 90%;
  height: 500px;
  overflow-y: auto;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.modal-title {
	font-size: 20px;
	margin-top: 0;
	margin-bottom: 0;
}

.modal-body {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.modal-image-container {
	flex: 1;
	text-align: left;
  margin-top: -210px;
}

.modal-image {
	max-width: 100%;
	max-height: 400px;
	width: auto;
}

.modal-info {
	flex: 1;
	margin-left: 20px;
	text-align: left;
}

.modal-info label {
	display: block;
	margin-bottom: 5px;
}

.modal-info input {
	width: 100%;
	padding: 5px;
	margin-bottom: 10px;
	border-radius: 10px;
	background-color: #f2f2f2;
	border: 0.5px solid #f2f2f2;
}

.modal-close {
	padding: 5px 10px;
	background-color: #73bf8e;
	color: white;
	border: none;
}

@media (max-width: 576px)  {
  .modal-content{
    width: 70%;
  }
	.modal-title {
		text-align: center;
	}

	.modal-image-container {
		margin-top: 0;
	}

	.modal-info {
		margin-top: 20px;
	}
}
@media (min-width: 577px) and (max-width: 735px) {
	.modal-title {
		text-align: center;
	}

	.modal-image-container {
		margin-top: -210;
	}

	.modal-info {
		margin-top: 20px;
	}
}
</style>
