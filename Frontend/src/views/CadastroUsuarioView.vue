<template>
    <div class="div-form mt-4">
        <h2 class="text-form">Criar Conta</h2>
        <div class="grid-form">
            <div class="name flex-form-input">
                <label for="name">Seu nome:</label>
                <input v-model="name" type="text" name="name" id="name" placeholder="Informe seu nome" required>
            </div>

            <div class="email flex-form-input">
                <label for="email">Seu email:</label>
                <input v-model="email" type="text" name="email" id="email" placeholder="Informe seu email" required>
            </div>

            <div class="password flex-form-input">
                <label for="password">Senha:</label>
                <input v-model="password" type="password" name="password" id="password" placeholder="Informe uma senha"
                    required>
            </div>

            <div class="institution flex-form-input">
                <label for="institution">Instituição:</label>
                <input v-model="institution" type="text" name="institution" id="institution" placeholder="Instituição"
                    required>
            </div>

            <div class="country flex-form-input">
                <label for="country">País:</label>
                <input v-model="country" type="text" name="country" id="country" placeholder="País" required>
            </div>

            <div class="city flex-form-input">
                <label for="city">Cidade:</label>
                <input v-model="city" type="text" name="city" id="city" placeholder="Cidade" required>
            </div>

            <div class="lattes flex-form-input">
                <label for="lattes">Lattes:</label>
                <input v-model="lattes" type="text" name="lattes" id="lattes" placeholder="Lattes">
            </div>
            
            <div class="container-buttons" >
                <div>
                 <a class="btn btn-secondary button-back" href="/">Voltar</a>
               </div>

                <div class="button-save button-flex">
                    <button @click="cadastrar()" type="submit" class="button">Salvar</button>
                </div>
            </div>


        </div>

        <div v-if="this.erro" class="error-msg">
            <ErrorMessageModalComp :message=this.erro @close-modal="closeModal()" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ErrorMessageModalComp from '@/components/modais/ErrorMessageModalComp.vue';

export default {
    name: "CadastroUsuario",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            institution: "",
            country: "",
            city: "",
            lattes: "",
            erro: undefined
        };
    },
    methods: {
        async cadastrar() {
            try {
                await axios.post(('http://localhost:8081/api/solicitation'), {
                    "type": "newUser",
                    "data": {
                        'name': this.name,
                        'email': this.email,
                        'password': this.password,
                        'institution': this.institution,
                        'country': this.country,
                        'city': this.city,
                        'lattes': this.lattes
                    }
                });

                this.$router.push('/');

            } catch (err) {
                let msgError = err.response.data?.err;
                msgError = msgError.replace("institution", "instituição")
                    .replace("country", "país")
                    .replace("city", "cidade");
                this.erro = msgError;
            }

        },
        closeModal() {
            this.erro = undefined;
        }
    },
    components: {
        ErrorMessageModalComp
    }
};
</script>

<style scoped>
header {
    padding: 10px;
    text-align: center;
    height: 80px;
}


.div-form {
    margin: 10px auto auto auto;
    padding: 20px;
    width: 70%;
    background: white;
    border-radius: 20px;
    box-shadow: 5px 5px 8px rgb(95, 91, 91);
}

.flex-form-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

}

.text-form {
    color: #73BF8E;
    padding: 10px;
    font-weight: bolder;
    font-size: 1.8em;
}

label {
    color: #73BF8E;
    padding: 5px 5px 1px 5px;
    font-weight: 600;
    margin-bottom: 4px;
}

form {
    /*   border: 1px solid blue; */
    padding: 10px;
}

.grid-form {
    display: grid;
    justify-content: space-around;
    gap: 10px;
    grid-auto-columns: auto auto;
    grid-auto-rows: auto auto auto auto auto;
    grid-template-areas:
        "name email"
        "password institution"
        "country city"
        "lattes container-buttons"
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
    margin-bottom: 25px;
}

.role {
    grid-area: role;
    margin-bottom: 80px;
}

.button-save {
    grid-area: button-save;
    margin-left: 10px;
}

.container-buttons{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    
}


.button-flex {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
}

.button {
    padding: 5px 15px 5px 15px;
    border-radius: 20px;
    color: white;
    font-size: 1.1em;
    background-color: #73BF8E;
    border: 1px solid #73BF8E;
    font-weight: 800;
    transition: .5s;
}

.button-back {
    padding: 5px 15px 5px 15px;
    border-radius: 20px;
    font-size: 1.1em;
    font-weight: 800;
}

.button:hover {
    background-color: #1d4e2e;
}

input,
select {
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #F2F2F2;
    background-color: #F2F2F2;
    width: 300px;
    box-shadow: 2px 2px 8px #aaa8a8;
    color: #aaa8a8;
}

input::placeholder {
    color: #aaa8a8;
    font-weight: 500;
}

input:focus {
    outline: none;
}

/* PARTE DE RESPONSIVIDADE */
@media screen and (max-width: 920px) {
    .grid-form {
        gap: 10px;
        grid-auto-columns: auto;
        grid-auto-rows: auto auto auto auto auto auto auto auto auto;
        grid-template-areas:
            "name"
            "email"
            "password"
            "institution"
            "country"
            "city"
            "lattes"
            "role"
            "container-buttons"
        ;
    }

    .container-buttons{
        justify-content: center;
        align-items: center;
    
    }

    .button-flex {
        align-items: center;
    }

    .text-form {
        text-align: center;
    }
}

@media screen and (max-width: 480px) {

    input,
    select {
        width: 200px;
    }

    .text-form {
        text-align: center;
    }
}
</style>
