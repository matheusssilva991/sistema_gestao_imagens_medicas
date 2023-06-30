<template>
    <div v-resize="handleResize"> 
        <header class="header" :class="{'mobile-header': isClicked}">
            <div class="navbar-header">
                <div v-if:=!this.logged>
                    <a href="/"><img src="../assets/logo.png" alt="Logo" id="logo"></a>
                </div>

                <div v-else:=this.logged>
                    <a href="/databases"><img src="../assets/logo.png" alt="Logo" id="logo"></a>
                </div>
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
                    Signup
                </router-link>
            </div>

            <div v-else:=this.logged class="dropdown form-logged-header">
                <button id="button-logged" class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-circle-user"></i> {{ this.user.name }} 
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <button class="dropdown-item" @click="openModalEditUser">Editar perfil</button>
                    </li>
                    <li><a class="dropdown-item" href="/">Logout</a></li>
                </ul>
                <EditUserComp v-if="showModalEdit" :database="this.selectedDatabase" @close-modal="closeModal" @save-changes="saveChanges" />
            </div>

            <div class="mobile-header">
                <div v-if:=!this.logged>
                    <button v-if:=!this.isClicked class="mobile-header-button" @click="clicked">
					    <i class="fa-solid fa-bars"></i>
                    </button>
                    <button v-else:=this.isClicked class="mobile-header-button clicked" @click="clicked">
                        <i class="fa-solid fa-bars"></i>
                    </button>
				
				    <div v-if:=!this.logged>
                	    <div v-if:=this.isClicked class="mobile-form-header">
                            <div class="mobile-input-header">
                                <i class="fa-regular fa-circle-user green-theme me-1 h5 pt-2"></i>
						        <InputComp name="email" type="email" placeHolder="email" :function="changeValues"/>
                            </div>
					
                            <div class="mobile-input-header">
                                <i class="fa fa-lock ms-2 green-theme me-1 h5 pt-2" aria-hidden="true"></i>
						        <InputComp name="password" type="password" placeHolder="password" :function="changeValues"/>  
                            </div>

                            <div class="mobile-form-button">
                                <button @click="logar" class="button-header ms-2" id="button-login">
                                    <span class="button-text ms-1">Sig-in</span>
						        </button>

                                <router-link to="/cadastroUsuario" class="button-header ms-2 pt-1" style="padding-left: 20px; border: solid 1px;"> 
                                    Signup
                                </router-link>
                            </div>
					    </div>
				    </div>
			    </div>

                <div v-else:=this.logged class="dropdown form-logged-header">
                    <button id="button-logged" class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-circle-user"></i> {{ this.user.name }} 
                    </button>

                    <ul class="dropdown-menu">
                        <li>
                            <button class="dropdown-item" @click="openModalEditUser">Editar perfil</button>
                        </li>
                        <li>
                            <a class="dropdown-item" href="/">Logout</a>
                        </li>
                    </ul>
                    <EditUserComp v-if="showModalEdit" :database="this.selectedDatabase" @close-modal="closeModal" @save-changes="saveChanges" />
                </div>
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
import EditUserModalComp from '../components/modais/user/EditUserModalComp.vue'

export default {
    name: 'HeaderComp',
    props: {
    },
  	created() {
		this.checkScreenWidth();
		window.addEventListener('resize', this.checkScreenWidth);
	},
	unmounted() {
    	window.removeEventListener('resize', this.checkScreenWidth);
  	},
    data () {
        return {
            logged: false,
            erro: undefined,
            email: "",
            password: "",
            user: {},
            showModalEdit: false,
			isClicked: false,
			isScreenWidt: false,
        }
    },
    methods: {
        changeValues(prop, text) {
            this[`${prop}`] = text
        },
        closeModal() {
            this.erro = undefined;
            this.showModalEdit = false;
        },
        openModalEditUser(){
            this.showModalEdit = true;
        },
        clicked(){
            this.isClicked = !this.isClicked;
        },
		checkScreenWidth() {
			this.isScreenWidt = window.innerWidth;
			if(this.isScreenWidt > 768 && this.isClicked == true){
				this.isClicked = false;
			}
		},

        async logar() {
            try {
                let response = await axios.post(("http://localhost:8081/login"), {
                    email: this.email,
                    password: this.password
                })

                const { token } = response.data;

                if (token) {
                    this.logged = true;
                    localStorage.setItem('token', token);

                    const req = {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token')
                        }
                    }

                    axios.get(`http://localhost:8081/authenticate`, req).then(response => {
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
        ErrorMessageModalComp,
        EditUserComp: EditUserModalComp
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

.dropdown-menu :hover{
    background-color:#73BF8E !important;
    color: white !important;
}

.dropdown-menu :hover :active{
    background-color: #459c63 !important;
    transition: 0.25s !important;
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

.mobile-header {
	height: 300px;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 20px;
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
    width: 150px;
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
    width: 175px;
    margin-left: 10%;
}

.green-theme {
    color: #73BF8E;
}

.mobile-header-button {
    display: none;
    border: none;
    background-color: transparent;
    color:#459c63;
}

@media screen and (max-width: 480px){
    .navbar-header{
		position: absolute;
        margin-top: 15px;
		left: 2%;
	}
}

@media screen and (max-width: 992px) {
    .form-header{
        display: none;
    }
    
    .mobile-header-button{
        display: flex;
        margin-right: 25px;
		position: absolute;
		top: 35px;
		right: 10px;
		font-size: 25px;
    }

    .mobile-form-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 75px;
    }

    .mobile-input-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .mobile-input-header i {
        margin-right: 10px;
    }

    .mobile-input-header input {
        margin-left: 10px;
    }

    .mobile-form-button {
        display: flex;
    }

    .button-header{
        width: 100px;
        justify-items: center;
        height: 32px;
    }

	.clicked{
		transform: rotate(90deg);
	}

	.navbar-header{
		position: absolute;
        top: 15px;
		left: 2%;
	}
}


@media screen and (max-width: 1280px) {
    .navbar-header {
        width: 30%;
    }

    .form-header {
        width: 70%;
    }
}

@media screen and (max-width: 1600px) {
    .navbar-header {
        width: 45%;
    }

    .form-header {
        width: 55%;
    }
}

@media screen and (max-width: 1366px) {
    .navbar-header {
        width: 35%;
    }

    .form-header {
        width: 65%;
    }
}

@media screen and (max-width: 1135px) {
    .navbar-header {
        width: 25%;
    }

    .form-header {
        width: 75%;
    }
}

</style>
