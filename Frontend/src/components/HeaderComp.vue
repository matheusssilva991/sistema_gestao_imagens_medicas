<template>
    <div> 
        <header class="header">
            <div class="navbar-header">
                <a href="/"><img src="../assets/logo.png" alt="Logo" id="logo"></a>
                <router-link to="/" class="nav-link-header" v-if:=!this.logged>Home</router-link>
                <router-link to="/about" class="nav-link-header" v-if:=!this.logged>Sobre o projeto</router-link>
            </div>
            
            <div v-if:=!this.logged class="form-header">
                <InputComp name="email" type="email" placeHolder="email" :function="changeValues"/>
                <InputComp name="password" type="password" placeHolder="password" :function="changeValues"/>  
                <button @click="logar" class="button-header" id="button-login">
                    <span class="button-text">Log in</span>
                    <i class="fa-regular fa-circle-user"></i>
                </button>
                <button type="submit" class="button-header">Sign in</button>
            </div>

            <div v-else:=this.logged class="form-logged-header">
                <button class="button-logged">
                    Your name <i class="fa-regular fa-circle-user"></i>
                </button>
            </div>
        </header>

        <div v-if="this.erro" class="error-msg">
            <h1>{{ this.erro }}</h1>
        </div>
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

html, body {
  width: 100%;
  margin: 0;
  padding: 0;
} 

.header {
    /* position: fixed; */
    width: 100%;
    height: 100px;
    right: 0;
    display: flex;
    justify-content: space-between;
    margin: 0px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    align-items: center;
    background-color: white;
}

.navbar-header {
    width: 50%;
}

.button-text {
    margin-right: 8px;
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

.button-logged {
    background-color: #73BF8E;
    border: 1px solid #73BF8E;
    color: white;
    -webkit-box-shadow: 0.5px 0.75px 1.5px 1px #62b981; 
    box-shadow: 0.5px 0.75px 1.5px 1px #62b981;
    border-radius: 35px;
    height: 35px;
    align-items: center;
}

.button-header {
    height: 35px;
    border-radius: 20px;
    padding-left: 3%;
    padding-right: 3%;
    border: 1px solid white;
    background-color: white;
    color: #73BF8E;
    align-items: center;
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
