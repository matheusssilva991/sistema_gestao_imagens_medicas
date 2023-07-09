<template>
    <div class="sidebar">
        <div class="list-group">
            <router-link to="/databases" class="list-group-item" :class="{ 'active-link': selectedTopic === 'informacoes' }"
                @click="selectTopic('informacoes')">
                <i class="fa fa-database" aria-hidden="true"></i>
                <span class="topic-name">Bancos de Imagens</span>
            </router-link>
            <router-link to="/images" class="list-group-item" :class="{ 'active-link': selectedTopic === 'imagens' }"
                @click="selectTopic('imagens')">
                <i class="fas fa-images"></i>
                <span class="topic-name">Imagens</span>
            </router-link>
            <router-link v-if="this.user.role" to="/users" class="list-group-item" :class="{ 'active-link': selectedTopic === 'usuarios' }"
                @click="selectTopic('usuarios')">
                <i class="fas fa-users"></i>
                <span class="topic-name">Usuários</span>
            </router-link>
            <router-link to="/image-types" class="list-group-item"
                :class="{ 'active-link': selectedTopic === 'tipo-imagens' }" @click="selectTopic('tipo-imagens')">
                <i class="fas fa-image"></i>
                <span class="topic-name">Tipo de Imagens</span>
            </router-link>
            <router-link v-if="this.user.role" to="/solicitations" class="list-group-item"
                :class="{ 'active-link': selectedTopic === 'solicitacoes' }" @click="selectTopic('solicitacoes')">
                <i class="fas fa-envelope"></i>
                <span class="topic-name">Solicitações</span>
            </router-link>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: "SideBarComp",
    created() {
        const token = localStorage.getItem('token');

		if (token != undefined) {
			const req = {
				headers: {
					Authorization: "Bearer " + token
				}
			};

			axios.get('http://localhost:8081/authenticate', req).then(response => {
                this.user = response.data;
                if (this.user['role'] == 0)
                    this.user['role'] = false
                else 
                    this.user['role'] = true
            }).catch((err) => {
                console.log(err);
			});
		}
    },
    data() {
        return {
            user: '',
            selectedTopic: "informacoes", // Variável para controlar o tópico selecionado
        };
    },
    methods: {
        selectTopic(topic) {
            this.selectedTopic = topic;
        },
    },
};
</script>

<style scoped>
header {
    padding: 10px;
    text-align: center;
    height: 80px;
}

.sidebar {
    font-family: 'Montserrat', sans-serif;
    background-color: #ffffff;
    margin-left: 80px;
    padding: 20px;
    height: 30%;
    /* Ajuste a altura conforme necessário */
    width: 25%;
    border-radius: 25px;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.613);
}

.list-group-item {
    list-style-type: none;
    padding: 4px;
    margin-bottom: 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    text-align: left;
    font-weight: bold;
    transition: background-color 0.9s ease;
    color: #73bf8e;
}

.list-group-item i {
    margin-right: 10px;
}

.list-group-item:hover,
.list-group-item.active-link {
    background-color: #e8e7e7;
    border-radius: 5px;
    color: #459c63;
    text-decoration: none;
}

.topic-name {
    margin-left: 5px;
    font-weight: 700;
}
</style>
