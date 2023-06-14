<template>
    <div>
        <div class="div-header">
           <header>Aqui vai o componente header</header>
        </div>

         <div class="div-form">
            <h2 class="text-form">Atualizar Cadastro Usuário</h2>
            <form action="" method="post" class="grid-form">
               <div class="name flex-form-input">
                    <label for="name">Seu nome:</label>
                    <input type="text" name="name" id="name" placeholder="Informe seu nome" required>
               </div>
              
                <div class="email flex-form-input">
                    <label for="email">Seu e-mail:</label>
                    <input type="text" name="email" id="email" placeholder="Informe seu email"  required>
                </div>

                <div class="password flex-form-input">
                     <label for="password">Senha:</label>
                     <input type="password" name="password" id="password" placeholder="Informe uma senha"  required>
                </div>

              <div class="institution flex-form-input">
                     <label for="institution">Instituição:</label>
                     <input type="text" name="institution" id="institution" placeholder="Instituição" required>
              </div>

              <div class="country flex-form-input">
                     <label for="country">País:</label>
                     <input type="text" name="country" id="country" placeholder="País"  required>
              </div>

              <div class="city flex-form-input">
                     <label for="city">Cidade:</label>
                     <input type="text" name="city" id="city" placeholder="Cidade"  required>
              </div>

              <div class="lattes flex-form-input">
                     <label for="lattes">Lattes:</label>
                     <input type="text" name="lattes" id="lattes"  placeholder="Lattes" >
              </div>

             <!-- 
              <div class="role flex-form-input">
                     <label for="role">Tipo usuário:</label>
                     <select name="role" id="role">
                            <option :value="Pesquisador">Pesquisador</option>
                      </select>
              </div> -->
              
              <div class="button-save button-flex">
                      <button type="submit" class="button">Salvar</button>
              </div>
              
            </form>
        </div>
    </div>
</template>

<script>
    export default{
        name: "AtualizarCadastro",
        data(){
            return{
                name: "Alessandro Conceição Santos",
                email: "acsantos.cic@uesc",
                password:"Lále1000x",
                country:"Brasil",
                institution:"UESC",
                city:"Itajuípe",
                lattes: "Au Au Au",
                tipo: "Pesquisador"

            }
        }
    }
</script>

<style scoped>
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
       /*  border: 3px solid red; */
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
      /*   border: 1px solid blue; */
        padding: 10px;
    }

    .grid-form{
       display: grid;
       justify-content: space-around;
       gap: 10px;
       grid-auto-columns: auto auto ;
       grid-auto-rows: auto auto auto auto auto;
       grid-template-areas: 
        "name email"
        "password institution"
        "country city"
        "lattes lattes"
        "button-save button-save"
       ;
    }

    .name {
         grid-area: name;
    }

    .email {
         grid-area: email;
    }

    .password {
        grid-area: password;
    }

    .institution {
          grid-area: institution;
    }

    .country {
         grid-area: country;
    }

    .city {
         grid-area: city;
    }

    .lattes {
          grid-area: lattes;
    }

    .role {
          grid-area: role;
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

    input, select{
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

   /* PARTE DE RESPONSIVIDADE */
   @media screen and (max-width: 920px) {
      .grid-form{
       gap: 10px;
       grid-auto-columns: auto ;
       grid-auto-rows: auto auto auto auto auto auto auto auto auto;
       grid-template-areas: 
        "name"
        "email"
        "password"
        "institution"
        "country"
        "city"
        "lattes"
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
    /* RESPOSIVIDADE */
    @media screen and (max-width: 480px){
     input, select{
        width: 200px;
      }

      .text-form{
        text-align: center;
      }
    }
</style>
