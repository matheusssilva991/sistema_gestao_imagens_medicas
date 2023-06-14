<template>
    <div>
        <div class="div-header">
           <header>Aqui vai o componente header</header>
        </div>

        <div class="div-form">
            <h2 class="text-form">Cadastro Banco de Dados</h2>
            <form action="" method="post" class="grid-form">
                 <div class="name flex-form-input">
                    <label for="name">Nome do banco :</label>
                    <input type="text" name="name" id="name" placeholder="Nome do banco" required>
                </div>

                <div class="examType flex-form-input">
                     <label for="examType">Tipo de exame:</label>
                     <select name="examType" id="examType">
                            <option value="mammography">Mamografia</option>
                            <option value="ultrasound">Ultrassom</option>
                            <option value="thermography">Termografia</option>
                      </select>
                </div>

                <div class="description flex-form-input">
                     <label for="description">Descrição</label>
                     <textarea class="text-description" v-model="texto" @input="countCaractere" name="description" id="description" cols="38" rows="4" placeholder="Descrição da imagem">
                     </textarea>
                     <span class="span-description">{{caracteresDigitados}}/500 caracteres</span>
                </div>

                <div class="imageQuality flex-form-input ">
                        <label for="imageQuality" class="label-checkbox">Escolha a qualidade da imagem: </label>
                        <div class="input-checkbox">
                            <input type="checkbox" name="imageQuality" value="8bits" class="input-a1"> <span class="span-a1">8 bits</span>
                            <input type="checkbox" name="imageQuality" value="12bits" class="input-a2"> <span class="span-a2">12 bits</span>
                            <input type="checkbox" name="imageQuality" value="16bits" class="input-a3"> <span class="span-a3">16 bits</span>
                        </div>

                </div>

                <div class="imageType flex-form-input">
                     <label for="imageType">Escolha o tipo da imagem: </label>
                     <div class="input-checkbox">
                        <input type="radio" name="imageType" value="Dicom" class="input-a1"><span class="span-a1">Dicom</span>
                        <input type="radio" name="imageType" value="Jpeg" class="input-a2"><span class="span-a2">Jpeg</span>
                        <input type="radio" name="imageType" value="JPG" class="input-a3"><span class="span-a3">JPG</span>
                     </div>
                     
                </div>

                <div class="sourceLink flex-form-input">
                     <label for="sourceLink">Link da imagem: </label>
                     <input type="url" name="sourceLink" placeholder="Link da imagem">
                </div>

                 <div class="button-save button-flex">
                      <button type="submit" class="button">Salvar</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>

export default {
    name: "CadastroDatabase",

    data(){
        return{
            texto: "",
            limiteCaracteres: 500,
            caracteresDigitados: 0,
        }
    },
    methods:{
        countCaractere(){
             if (this.caracteresDigitados >= this.limiteCaracteres) {
                this.texto = this.texto.slice(0, this.limiteCaracteres);
            }else{this.caracteresDigitados = this.texto.length}
        }
    }
}
</script>

<style scoped>
   input[type="checkbox"], input[type="radio"] {
        width: 20px; /* Defina a largura desejada */
        height: 20px; /* Defina a altura desejada */
        border: none;
        border-radius: 10px;
        margin-left: 5px;
        
    }

    .input-checkbox{
        display: grid;
        gap: 15px 5px;
        grid-template-areas:
        "input-a1 span-a1"
        "input-a2 span-a2"
        "input-a3 span-a3"
        ;
    }



    header{
        padding: 10px;
        text-align: center;
        height: 80px;
    }

  /*   .div-header{
        padding: 10px;
        text-align: center;
        height: 20px;
    } */

    .div-form{
        margin: 10px auto auto auto;
        padding: 20px;
        width: 70%;
        background: white;
        border-radius: 20px;
        box-shadow: 5px 5px 8px rgb(95, 91, 91);
    }

    .flex-form-input{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
       
    }

    .text-form{
        color: #73BF8E;
        padding: 10px;
        font-weight: bolder;
        font-size: 1.8em;
    }

    label{
        color: #73BF8E;
        padding: 5px 5px 1px 5px;
        font-weight: 600;
        margin-bottom: 4px;
    }

    form{
        padding: 10px;
    }

    .grid-form{
       display: grid;
       justify-content: space-around;
       gap: 10px;
       grid-auto-columns: auto auto ;
       grid-auto-rows: auto auto auto auto auto;
       grid-template-areas: 
        "name examType"
        "description imageQuality"
        "imageType sourceLink"
        "button-save button-save"
       ;
    }
  
    .name {
         grid-area: name;
    }

    .examType {
         grid-area: examType;
    }

    .description {
        grid-area: description;
    }

    .imageQuality {
          grid-area: imageQuality;
    }

    .imageType {
         grid-area: imageType;
    }

    .sourceLink {
         grid-area: sourceLink;
         margin-bottom: 80px;
    }

   
    .button-save {
         grid-area: button-save;
    }

    .button-flex{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .button{
        padding: 5px 15px 5px 15px;
        border-radius: 20px;
        color: white;
        font-size: 1.1em;
        background-color: #73BF8E;
        border: 1px solid #73BF8E;
        font-weight: 800;
        transition: .5s;
        cursor: pointer;
    }

    .button:hover{
        background-color: #1d4e2e;
    }

    input, select, textarea{
       padding: 10px;
       border-radius: 20px;
       border: 1px solid #F2F2F2;
       background-color: #F2F2F2;
       width: 300px;
       box-shadow: 2px 2px 8px #aaa8a8 ;
       color: #aaa8a8;
    }

    input::placeholder{
        color:#aaa8a8 ;
        font-weight: 500;
    }

   textarea::placeholder{
        color:#aaa8a8 ;
        font-weight: 500;
   }

   .span-description{
     margin-top: 5px;
     margin-left: 10px;
     color:#aaa8a8 ;
   }

    .label-checkbox{
        grid-area: label-checkbox;
    }
    .input-a1 {
    grid-area: input-a1;
    }

    .input-a2 {
    grid-area: input-a2;
    }

    .input-a3 {
    grid-area: input-a3;
    }

    .span-a1 {
    grid-area: span-a1;
    }

    .span-a2 {
    grid-area: span-a2;
    }

    .span-a3 {
    grid-area: span-a3;
    }

   /* PARTE DE RESPONSIVIDADE */
   @media screen and (max-width: 920px) {
      .grid-form{
       gap: 10px;
       grid-auto-columns: auto ;
       grid-auto-rows: auto auto auto auto auto auto auto auto auto;
       grid-template-areas: 
        "name"
        "examType"
        "description "
        "imageQuality"
        "imageType"
        "sourceLink"
        "button-save"
       ;
    }


    .button-flex{
        align-items: center;
    }

    .text-form{
        text-align: center;
    }
   }

    @media screen and (max-width: 480px){
     input, select{
        width: 200px;
      }

      .text-form{
        text-align: center;
      }

      .text-description{
         width: 200px;
     }
    }
</style>