
<template>
  
  <div class="modal" v-if="selectedImage">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Visualização</h2>
        
        <button class="modal-close" @click="closeModal">Fechar</button>
      </div>
      <div class="modal-body">
        <div class="modal-image-container">
            <img class="mamografia.jpg" src="../../assets/mamografia.jpg" alt="image.alt">
        </div>
        <div class="modal-info">
          <label for="image-info">Informações da Imagem:</label>
          <input type="text" id="image-info" v-model="imageInfo" readonly>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imageInfo: ''
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    }
  },
  mounted() {
  
  setTimeout(() => {
    
    const imageInfo = {
      width: 800,
      height: 600,
      size: '300 KB',
      author: 'John Doe',
      date: '2023-07-06'
    };

    
    this.imageInfo = imageInfo;
  }, 1000); // Simule um atraso de 1 segundo para demonstrar uma chamada assíncrona
}

}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.613);
  text-align: center;
  width: 40%;
  max-width: 800px;
  max-height: 90%;
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

</style>