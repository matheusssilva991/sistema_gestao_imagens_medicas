<template>
    <header class="header">
        <div class="navbar-header">
            <a href="/"><img src="../assets/logo.png" alt="Logo" id="logo"></a>
            <router-link to="/" class="nav-link-header" v-if:=!this.logged>Home</router-link>
            <router-link to="/" class="nav-link-header" v-if:=!this.logged>Sobre o projeto</router-link>
        </div>
        
        <div v-if:=!this.logged class="form-header">
            <InputComp name="email" type="email" placeHolder="email" :function="changeValues"/>
            <InputComp name="password" type="password" placeHolder="password" :function="changeValues"/>  
            <button @click="logar" class="button-header" id="button-login">Log in</button>
            <button type="submit" class="button-header">Sign in</button>
        </div>
    </header>

    <div v-if="this.erro" class="error-msg">
        <h1>{{ this.erro }}</h1>
    </div>
</template>

<script>
import axios from 'axios'; 
import InputComp from '@/components/InputComp.vue';

export default {
    name: 'HeaderComp',
    props: {
    },
    data () {
        return {
            logged: false,
            erro: undefined,
            email: "",
            password: ""
        }
    },
    methods: {
        changeValues(prop, text) {
            this[`${prop}`] = text
        },

        async logar() {
            try {
                const token = await axios.post(("http://localhost:8081/login"), {
                    email: this.email,
                    password: this.password
                })

                if (token) {
                    this.logged = true;
                    localStorage.setItem('token', token);
                    this.$router.push({name: 'about'})
                }
            } catch (err) {
                const msgError = err.response.data?.err;
                this.erro = msgError;
            } 
        }
    },
    components: {
    InputComp
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    width: 90%;
    display: flex;
    justify-content: space-around;
    margin: auto;
    background-color: white;
}

.navbar-header {
    width: 50%;
}

.form-header {
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-right: 5%;
}

.nav-link-header, .nav-link-header:visited {
    color: #73BF8E;
    width: 20%;
    margin-left: 5%;
    text-decoration: none;
}

.nav-link-header:hover {
    color: #459c63;
    width: 20%;
    margin-left: 5%;
}

.button-header {
    height: 40%;
    border-radius: 20px;
    padding-left: 3%;
    padding-right: 3%;
    border: 1px solid white;
    background-color: white;
    color: #73BF8E;
}

.button-header:hover {
    border: 1px solid #459c63;
    background-color: white;
    color: #459c63;
}

#button-login {
    background-color: #73BF8E;
    border: 1px solid #73BF8E;
    color: white;
    -webkit-box-shadow: 0.5px 0.75px 1.5px 1px #62b981; 
    box-shadow: 0.5px 0.75px 1.5px 1px #62b981;
}

#button-login:hover {
    border: 1px solid #459c63;
    background-color: #459c63;
    color: white;
}

#logo{
    width: 30%;
    margin-left: 10%;
}
</style>
