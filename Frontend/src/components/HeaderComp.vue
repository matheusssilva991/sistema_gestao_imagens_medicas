<template>
    <div> 
        <header class="header">
            <div class="navbar-header">
<<<<<<< HEAD
                <a><img src="../assets/logo.png" alt="Logo" id="logo"></a>
=======
                <a href="/"><img src="../assets/logo.png" alt="Logo" id="logo"></a>
                <router-link to="/" class="nav-link-header" v-if:=!this.logged>Home</router-link>
                <router-link to="/about" class="nav-link-header" v-if:=!this.logged>Sobre o projeto</router-link>
>>>>>>> Alessandro
            </div>
            
            <div v-if:=!this.logged class="form-header">
                <i class="fa-regular fa-circle-user green-theme me-1 h5 pt-2"></i>
                <InputComp name="email" type="email" placeHolder="email" :function="changeValues"/>
                
                <i class="fa fa-lock ms-4 green-theme me-1 h5 pt-2" aria-hidden="true"></i>
                <InputComp name="password" type="password" placeHolder="password" :function="changeValues"/>  

                <button @click="logar" class="button-header ms-4" id="button-login">
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                    <span class="button-text ms-1">Sig-in</span>
                </button>

                <router-link to="/cadastroUsuario" class="button-header ms-2 pt-1"> 
                    <i class="fa fa-user-plus me-1" aria-hidden="true"></i>
<<<<<<< HEAD
                    Signup
                </router-link>
            </div>

            <div v-else:=this.logged class="dropdown form-logged-header">
                <button id="button-logged" class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-circle-user"></i> {{ this.user.name }} 
                </button>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Editar perfil</a></li>
                <li><a class="dropdown-item" href="/">Logout</a></li>
            </ul>
=======
                    Sign up
                </router-link>
            </div>

            <div v-else:=this.logged class="form-logged-header">
                <button id="button-logged">
                   {{ this.user.name }} 
                </button>
                <button @click="openModalEditUser">
                    Editar Usuário
                </button>
                <EditUser v-if="showModalEdit" :database="this.selectedDatabase" @close-modal="closeModal" @save-changes="saveChanges" />
>>>>>>> Alessandro
            </div>
        </header>

        <div v-if="this.erro" class="error-msg">
            <ErrorMessageModalComp :message=this.erro @close-modal="closeModal()" />
        </div>
    </div>


</template>

<script>
import axios from 'axios'; 
import InputComp from '@/components/InputComp.vue';
import ErrorMessageModalComp from '../components/modais/ErrorMessageModalComp.vue';
<<<<<<< HEAD
=======
import EditUser from '../components/modais/EditUsuer.vue'
>>>>>>> Alessandro

export default {
    name: 'HeaderComp',
    props: {
    },
    data () {
        return {
            logged: false,
            erro: undefined,
            email: "",
            password: "",
<<<<<<< HEAD
            user: {}
=======
            user: {},
            showModalEdit: false
>>>>>>> Alessandro
        }
    },
    methods: {
        changeValues(prop, text) {
            this[`${prop}`] = text
        },
        closeModal() {
            this.erro = undefined;
<<<<<<< HEAD
=======
            this.showModalEdit = false;
        },
        openModalEditUser(){
            this.showModalEdit = true;
>>>>>>> Alessandro
        },

        async logar() {
            try {
                let response = await axios.post(("http://localhost:8081/login"), {
                    email: this.email,
                    password: this.password
                })

                const { id, token } = response.data;

                if (token) {
                    this.logged = true;
                    localStorage.setItem('token', token);

                    const req = {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token')
                        }
                    }

                    axios.get(`http://localhost:8081/api/user/${id}`, req).then(response => {
                        this.user = response.data;
                    }).catch((err) => {
                        console.log(err);
                    });

                    this.$emit('logged');
                    this.$router.push({name: 'databases'});
                }
            } catch (err) {
                const msgError = err.response.data?.err;
                this.erro = msgError;
            } 
        }
    },
    components: {
        InputComp,
<<<<<<< HEAD
        ErrorMessageModalComp
=======
        ErrorMessageModalComp,
        EditUser
>>>>>>> Alessandro
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
    width: 49%;
}

.button-text {
    margin-right: 8px;
}

.form-header {
    width: 51%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-right: 5%;
}

.form-logged-header {
    width: 50%;
    display: flex;
    justify-content: flex-end;
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

#button-logged {
    background-color: #73BF8E;
    border: 1px solid #73BF8E;
    color: white;
    -webkit-box-shadow: 0.5px 0.75px 1.5px 1px #62b981; 
    box-shadow: 0.5px 0.75px 1.5px 1px #62b981;
    border-radius: 35px;
    height: 35px;
    align-items: center;
    padding-left: 2%;
    padding-right: 2%;
    font-size: 20px;
    font-weight: bold;
}

#button-logged:hover {
    background-color: #459c63;
    border: 1px solid #459c63;
}

.button-header {
    height: 35px;
<<<<<<< HEAD
    width: 150px;
=======
>>>>>>> Alessandro
    border-radius: 20px;
    padding-left: 3%;
    padding-right: 3%;
    border: 1px solid white;
    background-color: white;
    color: #73BF8E;
    align-items: center;
    text-decoration: none;
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

.green-theme {
    color: #73BF8E;
}

</style>
